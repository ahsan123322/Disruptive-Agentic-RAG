import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const Intro = () => {
  return (
    <>

        <section className="intro grid grid-cols-1 lg:grid-cols-2  p-5">
            <div className="textIntro text-white flex flex-col items-start content-start justify-around p-5 leading-8 mx-10">
                <b className='text-2xl'>New LLM</b>
                <h1 className="text-6xl font-bold">Synthesia AI</h1>
                <p className="text-baseline text-wrap">
                "The introduction of a new LLM (Language Model) for the web-based system, Synthesia AI, marks a significant advancement in AI-driven solutions. Leveraging state-of-the-art technology, Synthesia AI offers unparalleled versatility and adaptability, capable of assisting users across a broad spectrum of tasks and domains. Whether it's crafting compelling narratives, generating code snippets, or even providing personalized recommendations, the LLM serves as a powerful ally in tackling diverse challenges. With its intuitive interface and robust backend infrastructure, Synthesia AI empowers users to harness the full potential of artificial intelligence, revolutionizing the way individuals and organizations interact with technology. As a pioneering solution in the realm of web-based systems, Synthesia AI sets a new standard for innovation and efficiency, promising boundless opportunities for collaboration, creativity, and productivity."
                </p>
                <button className='btnIntro text-lg' type="button ">Try Synthesia AI <FontAwesomeIcon className='icon rotate-45' icon={faArrowUp} /></button>
            </div>
            <div className="intoImg">
                <img src="/assets/describe.jpg" alt="" className="object-cover" />
            </div>
        </section>
    </>
  );
}

export default Intro
