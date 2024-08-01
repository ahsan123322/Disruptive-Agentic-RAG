
import { faBrain, faServer } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import icon from '/assets/Group 72.png'

const Hero = () => {
  return (
    <>
        <section className="OvrHero flex  flex-col  justify-start content-start items-start py-5  sm:p-10">
    <div className='ms-5 sm:ms-10'>
        <div className="flex items-center gap-3   sm:flex-row  sm:items-center text-3xl sm:text-5xl  sm:space-y-0 sm:space-x-3">
            <img src={icon} className="w-16 h-16 sm:w-15 sm:h-15 " />
            <span className="font-bold  text-white">Synthesia.Ai</span>
        </div>
        <p className='text-base text-center sm:text-lg  mt-10 sm:mt-10 mb-5 sm:mb-10 p-5 sm:p-7'>
            “ - Your Instant AI Companion,<br /> Making Every Interaction <br /> Effortless”
        </p>
        <div className="  md:items-center text-[#D4EA5E]  justify-center items-center px-24    flex  flex-col sm:flex-row  md:px-0 sm:px-5 text-base sm:text-xl space-y-3.5  sm:space-y-0 sm:space-x-5">
            <div className="descrp flex flex-col text-center  items-center px-3 ">
                <FontAwesomeIcon icon={faServer} size='lg' />
                <p className=' '>Custom </p>
                <p>APIs</p>
            </div>
            <div className="descrp flex flex-col   items-center px-3 text-center">
                <FontAwesomeIcon icon={faBrain} size='lg' />
                <p>Fast </p>
                <p>Retrieval</p>
            </div>
            <div className="descrp flex flex-col  items-center px-3 text-center">
                <img src='/assets/iconAa.png' className='text-center' style={{ height: "auto", width: "40px" }} />
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
