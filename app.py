from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, AIMessage
from langchain_text_splitters import RecursiveCharacterTextSplitter 
from langchain_community.document_loaders import PDFPlumberLoader, TextLoader, CSVLoader, PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain.prompts import PromptTemplate
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.history_aware_retriever import create_history_aware_retriever
from langchain.chains import create_retrieval_chain

from flask import Flask, request, jsonify
from config import Config
import asyncio
from playwright.async_api import async_playwright
import json
import fnmatch
from config import Config
import main
import tempfile 
import pandas as pd

app = Flask(__name__)

# Load environment variables
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")
user_agent = os.getenv("USER_AGENT")
if groq_api_key is None:
    raise ValueError("Groq API key not found. Please set the GROQ_API_KEY environment variable in your .env file.")

# Initialize components
folder_path = "db"
chat_history = []
cached_llm = ChatGroq(model_name="llama3-8b-8192")
embedding = HuggingFaceBgeEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

raw_prompt = PromptTemplate(
    input_variables=["input", "context"],
    template="""
    You are a helpful assistant that provides information based on the given context. 
    If the information is not in the context, politely say that you don't have that information.
    
    Context: {context}
    
    Human: {input}
    Assistant: """
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1024, chunk_overlap=80, length_function=len, is_separator_regex=False
)

class DataLoader:
    def __init__(self, filepath_or_url, user_agent=None):
        self.filepath_or_url = filepath_or_url
        self.user_agent = user_agent
    
    def load_document(self):
        file_extension = os.path.splitext(self.filepath_or_url)[1].lower()
        headers = {"USER_AGENT": self.user_agent}
        
        if file_extension == '.pdf':
            loader = PDFPlumberLoader(self.filepath_or_url)
            
        elif file_extension in ['.txt', '.md', '.html','.json']:
            loader = TextLoader(self.filepath_or_url, encoding='utf-8')
        elif file_extension == '.csv':

            loader = CSVLoader(
                file_path=self.filepath_or_url,
                csv_args={
                    'delimiter': ',',
                    'quotechar': '"'
                }
            )
        elif file_extension == '.xlsx':
           
            df = pd.read_excel(self.filepath_or_url)
            
            # Generate output filename
            base_name = os.path.basename(self.filepath_or_url)
            file_name_without_ext = os.path.splitext(base_name)[0]
            output_dir = os.path.dirname(self.filepath_or_url)
            output_path = os.path.join(output_dir, f"{file_name_without_ext}.csv")
            
            df.to_csv(output_path, index=False)
            print(f"CSV file saved at: {output_path}")
            
            loader = CSVLoader(
                    file_path=output_path,
                    csv_args={
                    'delimiter': ',',
                    'quotechar': '"'
                }
            )

        elif self.filepath_or_url.startswith(('http://', 'https://')):
                    
            config = Config(
                url=self.filepath_or_url,
                match=f"{self.filepath_or_url}/**",
                selector="body",  
                max_pages_to_crawl=10, 
                output_file_name="temp_output.json"
            )
            results = asyncio.run(main.crawl(config))
            return [{'page_content': item['html'], 'metadata': {'source': item['url']}} for item in results]
        else:
            raise ValueError(f"Unsupported file type: {file_extension}")
        
        documents = loader.load()
        return documents

    def chunk_document(self, document, chunk_size=1024, chunk_overlap=80): 
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
        )
        return text_splitter.split_documents(document)

    def process_document(self, chunk_size=1024, chunk_overlap=80):
        document = self.load_document()
        chunks = self.chunk_document(document, chunk_size, chunk_overlap)
        print(f"Number of chunks: {len(chunks)}")
        print(chunks[0])
        return chunks

@app.route("/chat", methods=["POST"])
def aiPost():
    try:
        json_content = request.json 
        query = json_content.get("query")
        print(f"query: {query}")
        response = cached_llm.invoke([HumanMessage(content=query)])
        response_answer = "Answer: " + response.content
        return jsonify({"answer": response_answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/ask_from_doc", methods=["POST"])
def askDocPost():
    try:
        json_content = request.json
        query = json_content.get("query")
        print(f"query: {query}")

        print("Loading vector store")
        vector_store = Chroma(persist_directory=folder_path, embedding_function=embedding)

        print("Creating chain")
        retriever = vector_store.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={"k": 20, "score_threshold": 0.1},
        )

        retriever_prompt = ChatPromptTemplate.from_messages(
            [
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", "{input}"),
                ("human", "Given the above conversation, generate a search query to lookup in order to get information relevant to the conversation"),
            ]
        )

        history_aware_retriever = create_history_aware_retriever(
            llm=cached_llm, retriever=retriever, prompt=retriever_prompt
        )

        document_chain = create_stuff_documents_chain(cached_llm, raw_prompt)
        
        retrieval_chain = create_retrieval_chain(
            history_aware_retriever, document_chain,
        )

        result = retrieval_chain.invoke({"input": query})
        print(result["answer"])

        chat_history.append(HumanMessage(content=query))
        chat_history.append(AIMessage(content=result["answer"]))

        sources = [{"source": doc.metadata["source"], "page_content": doc.page_content} for doc in result["context"]]

        response_answer = {"answer": result["answer"], "sources": sources}
        return jsonify(response_answer)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/add_document", methods=["POST"])
def addDocument():
    try:
        file = request.files["file"]
        file_name = file.filename  
        save_file = "document_storage/" + file_name
        file.save(save_file)
        print(f"filename: {file_name}")

        data_loader = DataLoader(save_file, user_agent)
        chunks = data_loader.process_document(chunk_size=1024, chunk_overlap=80)
        print(f"chunks len= {len(chunks)}")

        vector_store = Chroma.from_documents(documents=chunks, embedding=embedding, persist_directory=folder_path)
        vector_store.persist()

        response = {"Status": "Successfully uploaded", "filename": file_name, "chunks": len(chunks)}
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/add_url", methods=["POST"])
def addUrl():
    try:
        print("called")
        json_content = request.json
        url = json_content.get("url")
        
        if not url:
            return jsonify({"error": "No URL provided"}), 400

        print(f"Processing URL: {url}")

        data_loader = DataLoader(url, user_agent)
        chunks = data_loader.process_document(chunk_size=1024, chunk_overlap=80)
        print(f"Number of chunks: {len(chunks)}")

        vector_store = Chroma(persist_directory=folder_path, embedding_function=embedding)
        vector_store.add_documents(chunks)
        vector_store.persist()

        response_data = {
            "status": "Successfully processed",
            "url": url,
            "chunks": len(chunks)
        }
        return jsonify(response_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def start_app():
    app.run(host="0.0.0.0", port=8080, debug=True)

if __name__ == "__main__":
    start_app()