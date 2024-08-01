import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Overview from './Overview/Overview';
import Login from './Login/Login';
import Signup from './Login/Signup';

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <header className='navHeader'>
        <nav className= "Navbar p-6">
          <div className="container bg-transparent mx-auto flex flex-row content-end justify-end items-center">
            {/* logo */}
           

            {/* Navigation Links */}
            <div className="Navlinks hidden md:flex font-bold text-lg">
              <NavLink to="/" className="p-5 hover:text-gray-300">Overview</NavLink>
              <NavLink to="/chat" className="p-5 hover:text-gray-300">Method</NavLink>
              <NavLink to="/api" className="p-5 hover:text-gray-300">API</NavLink>
              <NavLink to="/" className="p-5 hover:text-gray-300">Company</NavLink>
              <NavLink to="/login" className="p-5 hover:text-gray-300">Login</NavLink>
            </div>

            {/* Responsive Toggle Button */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="   w-6 z-50   fixed top-6 right-7 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              )}
            </button>

            {/* Responsive Navigation Links */}
            {navbarOpen && (
              <div className="md:hidden w-screen z-10   right-0 fixed  top-0  left-0 bottom-0  h-screen flex flex-col mt-4 items-center justify-center text-2xl  space-y-5 bg-gray-800">
                <NavLink to="/" className="p-5 hover:text-gray-300">Overview</NavLink>
                <NavLink to="/chat" className="p-5 hover:text-gray-300">Method</NavLink>
                <NavLink to="/api" className="p-5 hover:text-gray-300">API</NavLink>
                <NavLink to="/" className="p-5 hover:text-gray-300">Company</NavLink>
                <NavLink to="/login" className="p-5 hover:text-gray-300">Login</NavLink>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
