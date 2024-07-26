import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <form className="w-full max-w-md mx-auto bg-transparent text-white p-8 rounded-md text-center">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block  text-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block  text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block   text-sm font-medium">Phone</label>
        <input
          type="text"
          id="phone"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block   text-sm font-medium">Password</label>
        <input
          type="password"
          id="password"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block   text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleSignup}
      >
        Sign Up
      </button>
        <br />
        <br />
        <b>Already have an account? <NavLink to="/login" >Log-In</NavLink></b>
    </form>
    
  );
};

export default SignupForm;
