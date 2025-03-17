import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import GettingStarted from './components/GettingStarted';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import ReadNote from './components/ReadNote';
import ReadNote1 from './components/ReadNote1';
import EditNote from './components/EditNote';
function App() {


  return (
    <>
    <div className='h-[100vh]'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GettingStarted />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="home" element={<Home />} />
          <Route path="readNote" element={<ReadNote />} />
          <Route path="readNote1" element={<ReadNote1 />} />
          <Route path="editNote" element={<EditNote />} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
