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
        navigate('/dashboard');
      }).catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  };
 

  return (
    <>
      <div className="loginForm flex h-screen flex-col justify-center items-center p-10">
        <form className="p-8 rounded-md">
          <h1 className="formHead text-5xl text-white font-bold mb-4 text-center">Log In</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-medium">Email or Phone Number</label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-2 border text-white bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-2 border text-white bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btnForm w-full text-white py-2 rounded-md hover:bg-black focus:outline-none focus:ring focus:border-blue-300 hover:text-white"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <br />
        <p>or</p>
        <br />
        <div className="formImg flex flex-row content-center justify-between items-center">
            <img onClick={signInWithGoogle} className='h-14 w-14 me-4' src="/assets/Google logo.png" alt="" />
            <img className='h-14 w-14 me-4' src="/assets/Microsoft logo.png" alt="" />
        </div>
        <br />
        <p><a href="#">Forgot Password</a></p>
        <br />
        <br />
        <b>Don't have an account? <NavLink to="/signup" >SIGN UP</NavLink></b>
      </div>

    </>
  );
};

export default LoginForm;
