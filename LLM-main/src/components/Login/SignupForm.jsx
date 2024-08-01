import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from './config';

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        navigate('/dashboard');
      }).catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="loginForm flex md:h-[96vh]  h-[65vh] flex-col justify-center items-center p-4 sm:p-6 lg:p-10">
  <form className=" flex flex-col  gap-1 w-[77vw] md:w-[28vw]  justify-center">
    <h1 className="formHead text-3xl sm:text-4xl lg:text-5xl text-white font-bold mb-4 text-center">Sign Up</h1>

    <label htmlFor="email" className="text-white text-sm font-medium">Email or Phone Number</label>
    <input
      type="email"
      id="email"
      className="mt-1 p-3 border text-white bg-transparent border-gray-300 focus:outline-none focus:border-blue-500   rounded-3xl   text-lg"
      placeholder="Enter your email or phone number"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <label htmlFor="password" className="mt-4 text-white text-sm font-medium">Password</label>
    <input
      type="password"
      id="password"
      className="mt-1 p-3 border text-white bg-transparent border-gray-300 focus:outline-none focus:border-blue-500   rounded-3xl  text-lg"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="submit"
      className="btnForm w-32 mx-auto  mt-6   text-white py-2 rounded-md bg-black hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
      onClick={handleLogin}
    >
Sign Up    </button>
  </form>
  <div className="flex justify-center mt-4 w-full max-w-md text-white py-3 rounded-full focus:outline-none focus:ring transition duration-300">
  Already have an account? <NavLink to="/login"><span className=' text-[#D7FE63] '>Log In</span></NavLink>
  </div>
</div>


  );
};

export default SignupForm;
