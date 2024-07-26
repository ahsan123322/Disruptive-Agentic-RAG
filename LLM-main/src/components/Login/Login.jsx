import React from 'react'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <>
        <section className='login grid grid-cols-1 lg:grid-cols-2 p-5'>
            <div className="loginImg flex flex-row items-start text-5xl space-x-3 p-5 ">
                      <img src="/assets/Group 72.png" className="w-15 h-15 " />
                      <span className="font-bold text-white m-2">Synthesia.Ai</span>
            </div>
            <div>
                <LoginForm/>
            </div>
        </section> 
    </>
  )
}

export default Login
