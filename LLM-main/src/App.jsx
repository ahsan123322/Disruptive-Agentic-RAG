import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Overview/Hero'
import Intro from './components/Overview/Intro'
import Login from './components/Login/Login'
import Dashboard from './components/Home/home'
import Overview from './components/Overview/Overview'
import Blog from './components/blog/blog'
import { NavLink, Router, Routes,Route } from 'react-router-dom';
function App() {

  return (

    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/menu" element={<Overview />} />
      <Route path="/blog" element={<Blog />} />
      {/* Define other routes as needed */}
    </Routes>

  )
}

export default App
