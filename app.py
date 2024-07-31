from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, AIMessage
from langchain_text_splitters import RecursiveCharacterTextSplitter 
from langchain_community.document_loaders import PDFPlumberLoader, TextLoader, CSVLoader, PyPDFLoader, Docx2txtLoader, UnstructuredWordDocumentLoader   
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain.prompts import PromptTemplate
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.history_aware_retriever import create_history_aware_retriever
from langchain.chains import create_retrieval_chain
from langchain.schema import Document as LangChainDocument



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
import pandas as pd
import docx2txt

# LlamaIndex imports
from llama_index.core import Settings, SimpleDirectoryReader, SummaryIndex, VectorStoreIndex
from llama_index.llms.groq import Groq
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.tools import QueryEngineTool
from llama_index.core.query_engine.router_query_engine import RouterQueryEngine
from llama_index.core.selectors import LLMSingleSelector
from llama_index.core import Document as LlamaDocument

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

# LlamaIndex settings
Settings.llm = Groq(api_key=groq_api_key, model="llama3-8b-8192")
Settings.embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")

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
        
        
        if file_extension == '.pdf':
            loader = PDFPlumberLoader(self.filepath_or_url)
            documents = loader.load()
        elif file_extension == '.txt':
            with open(self.filepath_or_url, 'r', encoding='utf-8') as file:
                text = file.read()
            documents = [LangChainDocument(page_content=text, metadata={"source": self.filepath_or_url})]
        elif file_extension in ['.docx', '.doc']:
            text = docx2txt.process(self.filepath_or_url)
            documents = [LangChainDocument(page_content=text, metadata={"source": self.filepath_or_url})]
        elif file_extension in ['.xlsx', '.xls']:
            df = pd.read_excel(self.filepath_or_url)
            documents = [LangChainDocument(page_content=df.to_string(), metadata={"source": self.filepath_or_url})]
            
        elif self.filepath_or_url.startswith(('http://', 'https://')):
            config = Config(
                url=self.filepath_or_url,
                match=f"{self.filepath_or_url}/**",
                selector="body",  
                max_pages_to_crawl=10, 
                output_file_name="temp_output.json"
            )
            results = asyncio.run(main.crawl(config))
            return [LangChainDocument(page_content=item['html'], metadata={'source': item['url']}) for item in results]
   
        else:
            raise ValueError(f"Unsupported file type: {file_extension}")

        return documents

    def chunk_document(self, documents, chunk_size=1024, chunk_overlap=80):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
        )
        return text_splitter.split_documents(documents)

    def process_document(self, chunk_size=1024, chunk_overlap=80):
        documents = self.load_document()
        if len(documents) == 1 and (self.filepath_or_url.endswith(('.xlsx', '.xls', '.docx', '.doc', '.txt')) or self.filepath_or_url.startswith(('http://', 'https://'))):
            chunks = documents  # For Excel, Word, text files, and URLs, we're using the entire content as one document
        else:
            chunks = self.chunk_document(documents, chunk_size, chunk_overlap)
        print(f"Number of chunks: {len(chunks)}")
        print(chunks[0])
        return chunks
    
def convert_to_llama_documents(data):
    llama_documents = []
    if isinstance(data, dict) and 'documents' in data:  # Chroma data
        for i, doc_text in enumerate(data['documents']):
            metadata = data['metadatas'][i] if i < len(data['metadatas']) else {}
            llama_doc = LlamaDocument(
                text=doc_text,
                metadata=metadata
            )
            llama_documents.append(llama_doc)
    elif isinstance(data, list):
        for doc in data:
            if isinstance(doc, LangChainDocument):
                llama_doc = LlamaDocument(
                    text=doc.page_content,
                    metadata=doc.metadata
                )
            elif isinstance(doc, LlamaDocument):
                llama_doc = doc
            else:
                raise ValueError(f"Unsupported document type: {type(doc)}")
            llama_documents.append(llama_doc)
    else:
        raise ValueError("Unsupported data format")
    return llama_documents

def create_query_router(documents):
    splitter = SentenceSplitter(chunk_size=1024)
    nodes = splitter.get_nodes_from_documents(documents)

    summary_index = SummaryIndex(nodes)
    vector_index = VectorStoreIndex(nodes)

    summary_query_engine = summary_index.as_query_engine(
        response_mode="tree_summarize",
        use_async=True,
    )
    vector_query_engine = vector_index.as_query_engine()

    summary_tool = QueryEngineTool.from_defaults(
        query_engine=summary_query_engine,
        description="Useful for summarization questions"
    )
    vector_tool = QueryEngineTool.from_defaults(
        query_engine=vector_query_engine,
        description="Useful for retrieving specific context"
    )

    query_engine = RouterQueryEngine(
        selector=LLMSingleSelector.from_defaults(),
        query_engine_tools=[
            summary_tool,
            vector_tool,
        ],
        verbose=True
    )

    return query_engine

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

        vector_store = Chroma(persist_directory=folder_path, embedding_function=embedding)
        documents = vector_store.get()
       
        # Create LlamaIndex query router
        llama_documents = convert_to_llama_documents(documents)
        
        query_engine = create_query_router(llama_documents)
        # Use the query router to get the response
        response = query_engine.query(query)

        chat_history.append(HumanMessage(content=query))
        chat_history.append(AIMessage(content=str(response)))

        # Extract sources (this might need adjustment based on LlamaIndex's response structure)
        sources = [{"source": node.metadata.get("source", "Unknown"), "page_content": node.text} 
                   for node in response.source_nodes] if hasattr(response, 'source_nodes') else []

        response_answer = {"answer": str(response), "sources": sources}
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