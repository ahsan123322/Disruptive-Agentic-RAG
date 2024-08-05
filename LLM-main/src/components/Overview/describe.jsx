import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Intro = () => {
  return (
    <section className="intro grid grid-cols-1 lg:grid-cols-2 gap-6 p-5">
      <div className="textIntro text-white flex flex-col items-start justify-center p-5 mx-5 lg:mx-10 leading-8">
        <b className='text-2xl'>New LLM</b>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Synthesia AI</h1>
        <p className="text-base md:text-lg lg:text-xl">
          "The introduction of a new LLM (Language Model) for the web-based system, Synthesia AI, marks a significant advancement in AI-driven solutions. Leveraging state-of-the-art technology, Synthesia AI offers unparalleled versatility and adaptability, capable of assisting users across a broad spectrum of tasks and domains. Whether it's crafting compelling narratives, generating code snippets, or even providing personalized recommendations, the LLM serves as a powerful ally in tackling diverse challenges. With its intuitive interface and robust backend infrastructure, Synthesia AI empowers users to harness the full potential of artificial intelligence, revolutionizing the way individuals and organizations interact with technology. As a pioneering solution in the realm of web-based systems, Synthesia AI sets a new standard for innovation and efficiency, promising boundless opportunities for collaboration, creativity, and productivity."
        </p>
        
      </div>
      <div className="intoImg flex justify-center items-center">
        <img src="/assets/describe.jpg" alt="Synthesia AI" className="object-cover w-full h-auto max-w-full rounded-lg shadow-lg" />
      </div>
    </section>
  );
};

export default Intro;
