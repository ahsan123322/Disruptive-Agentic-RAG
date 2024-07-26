
import { faBrain, faServer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Hero = () => {
  return (
    <>
        <section className="OvrHero flex flex-col  justify-start content-start items-start p-10">
            <div className='ms-10' >
                <div className="flex items-center text-5xl space-x-3">
                        <img src="/assets/Group 72.png" className="w-15 h-15 " />
                        <span className="font-bold text-white">Synthesia.Ai</span>
                </div>
                <p className='text-lg text-left m-10 p-7'>“ - Your Instant AI Companion,<br /> Making Every Interaction <br /> Effortless”</p>
                <div className="content px-5 text-xl">
                    <div className="descrp px-3 text-center">
                        <FontAwesomeIcon icon={faServer} size='2x'/>
                        <p>Custom </p>
                        <p>APIs</p>
                    </div>
                    <div className="descrp px-3 text-center">
                        <FontAwesomeIcon icon={faBrain} size='2x'/>
                        <p>Fast </p>
                        <p>Retrieval</p>
                    </div>
                    <div className="descrp px-3 text-center">
                        <img src='/assets/iconAa.png' className='text-center ml-10' style={{height:"auto",width:"50px"}}/>
                        <p>Text Completion </p>
                        <p>APIs</p>
                    </div>
                </div>
            </div>
        </section> 
    </>
  )
}

export default Hero
