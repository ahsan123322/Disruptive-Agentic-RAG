import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
// import Signup from './Signup';
import app from './config';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Home from '../Home/home';
const LoginForm = () => {

const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);
const provider = new GoogleAuthProvider();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);

  };
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigate('/chat');
      }).catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  };
 

  return (
    <>
        <div className="loginForm flex md:h-[96vh]  h-[65vh] flex-col justify-center items-center p-4 sm:p-6 lg:p-10">
  <form className=" flex flex-col  gap-1 w-[77vw] md:w-[28vw]  justify-center">
    <h1 className="formHead text-3xl sm:text-4xl lg:text-5xl text-white font-bold mb-4 text-center">Log in</h1>

    <label htmlFor="email" className="text-white text-sm font-medium">Email or Phone Number</label>
    <input
      type="email"
      id="email"
      className="mt-1 p-3 border text-white bg-transparent border-gray-300 focus:outline-none focus:border-blue-500   rounded-3xl   text-lg"
     
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <label htmlFor="password" className="mt-4 text-white text-sm font-medium">Password</label>
    <input
      type="password"
      id="password"
      className="mt-1 p-3 border text-white bg-transparent border-gray-300 focus:outline-none focus:border-blue-500   rounded-3xl  text-lg"
     
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
 <br />
        
    <button
      type="submit"
      className="bg-[#D4EA5E]  text-black    text-2xl font-normal py-3 rounded-3xl   "
      onClick={handleLogin}
    >
      Log in
    </button>
    <h4  className=' text-center mt-2'>or</h4>
    <div className="formImg mt-2 mb-1.5 flex flex-row   justify-center items-center">
            <img onClick={signInWithGoogle} className='h-14 w-14 me-4' src="/assets/Google logo.png" alt="" />
            <img className='h-14 w-14 me-4 ' src="/assets/Microsoft logo.png" alt="" />
        </div>
        
        <p className=' text-center  underline hh'><a href="#">Forgot Password</a></p>
  </form>
 
  
</div>

    </>
  );
};

export default LoginForm;
