import React from 'react'
import Intro from './Intro'
import Hero from './Hero'
import Navbar from '../HomeNav'
import Past from './past'
import Describe from './describe'
const Overview = () => {
  return (
    <>
       <Navbar></Navbar>
        <Hero/>
        <Intro/> 
        <Past/>
        <Describe/>
        
    </>
  )
}

export default Overview
