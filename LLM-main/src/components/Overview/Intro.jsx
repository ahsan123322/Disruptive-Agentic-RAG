import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import './Intro.css'

const Intro = () => {
  return (
    <>

       <section className="  grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
   
    <div className="textIntro text-white flex flex-col items-start justify-around p-5 mx-5 lg:mx-10 leading-7 lg:leading-8">
        <b className='text-xl lg:text-2xl font-normal'>Introducing</b>
        <h1 className="text-4xl lg:text-6xl font-bold">Synthesia AI</h1>
        <p className="text-base lg:text-lg  leading-relaxed">
            "Welcome to our advanced Chatbot – Your all-in-<br />
            one solution! Seamlessly processing images, text,<br />
            and documents, it transforms your inputs into <br />
            intelligent responses. Experience efficiency and <br />
            accuracy like never before with our versatile <br />
            Chatbot, simplifying your interactions and <br />
            enhancing productivity."
        </p>
        <button className='btnIntro text-base lg:text-lg mt-5 px-4 py-2' type="button">
            Try Synthesia AI <FontAwesomeIcon className='icon rotate-45 ml-2' icon={faArrowUp} />
        </button>
    </div>
   
    <div className="intoImg flex items-center justify-center">
        <img src="/assets/Group 87.png" alt="Synthesia AI" className="object-cover max-w-full h-auto" />
    </div>
</section>


    </>
  );
}

export default Intro
