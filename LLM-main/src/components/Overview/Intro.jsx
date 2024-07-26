import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const Intro = () => {
  return (
    <>
        <section className="intro grid grid-cols-1 lg:grid-cols-2  p-5">
            <div className="textIntro text-white flex flex-col items-start content-start justify-around p-5 leading-8 mx-10">
                <b className='text-2xl'>Introducing</b>
                <h1 className="text-6xl font-bold">Synthesia AI</h1>
                <p className="text-baseline text-wrap">
                    "Welcome to our advanced Chatbot – Your all-in-<br />one solution!
                    Seamlessly processing images, text,<br /> and documents, it transforms
                    your inputs into <br /> intelligent responses. Experience efficiency and <br />
                    accuracy like never before with our versatile <br /> Chatbot, simplifying
                    your interactions and <br />enhancing productivity."
                </p>
                <button className='btnIntro text-lg' type="button ">Try Synthesia AI <FontAwesomeIcon className='icon rotate-45' icon={faArrowUp} /></button>
            </div>
            <div className="intoImg">
                <img src="/assets/Group 87.png" alt="" className="object-cover" />
            </div>
        </section>
    </>
  );
}

export default Intro
