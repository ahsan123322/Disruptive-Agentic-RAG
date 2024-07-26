import React from 'react'
import SignupForm from './SignupForm'

const Signup = () => {
  return (
    <>
        <section className='login grid grid-cols-2 p-5'>
            <div className="loginImg flex flex-row items-start text-5xl space-x-3 p-5 ">
                      <img src="/assets/Group 72.png" className="w-15 h-15 " />
                      <span className="font-bold text-white m-2">Synthesia.Ai</span>
            </div>
            <div>
                <SignupForm/>
            </div>
        </section> 
    </>
  )
}

export default Signup
