import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const Intro = () => {
  return (
    <>
     
        <section className="intro grid grid-cols-1 lg:grid-cols-1  p-5">
            <div className="intoImg">
                <img  src="/assets/Home.png" alt="" className="demo" />
            </div>
        </section>
    </>
  );
}

export default Intro
