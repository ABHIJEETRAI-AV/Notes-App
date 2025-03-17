import React from 'react'
import { NavLink } from 'react-router'
function GettingStarted() {
  return (
    <div className=' h-[100vh] bg-gradient-to-t from-slate-900 via-slate-900 to-fuchsia-900 flex flex-col justify-center items-center gap-[6rem]'>
      <h1 className='flex flex-row justify-center items-center w-[55%] border-4 border-amber-50  text-[4rem] font-[1000] font-fun bg-gradient-to-r from-blue-600 to-green-50  text-transparent bg-clip-text'>Zamari</h1>
      <button className='  rounded-[2rem] text-[1rem] font-[600] font-artist text-black bg-amber-50 shadow-[0px_0px_20px_rgba(8,_112,_184,_1.5)] border-2 border-white h-[3rem] w-[10rem]'><NavLink to='/login'>Get Started</NavLink> </button>
    </div>
  )
}

export default GettingStarted
