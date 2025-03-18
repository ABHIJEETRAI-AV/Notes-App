import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router';

function SignUp() {
 const {
         register,
         handleSubmit,
         formState: { errors },
     } = useForm();
 
 // const [name, setName] = useState(null)
 // const [email, setEmail] = useState(null)
 // const [password, setPassword] = useState(null)
 
 const [data, setData] = useState(null)
 
 async function postData( data ) {
 const response = await fetch("https://notes-app-ten-livid.vercel.app/SignUp", {
     method: "POST",
     // mode: "cors",
     // cache: "no-cache",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
     // ...
   });
   console.log(response)
 }
 const navigate = useNavigate();
 
 console.log(data)
     return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-b from-fuchsia-900 to-slate-900'>
             <form onSubmit={handleSubmit((data) => {setData(JSON.stringify(data))
 navigate('/login')
             postData(data)
             })}
             className='h-[50%] w-[60%] flex flex-col items-center justify-around'

             >
                 <div className='flex flex-col items-center justify-around w-[100%] h-[100%] shadow-[0px_0px_10px_2px_rgba(0,_255,_255,_0.7)] rounded-[10px] bg-black/20 '>
          <div className='font-login text-[1.5rem] text-amber-50'><h1>Sign Up</h1></div>
          <div className='flex flex-col items-center justify-center w-[100%] h-[40%] gap-[2rem]'>
 
                     <div className='border-b-2 border-b-white'><input {...register("name")} placeholder="Your name"
                     // onChange={(e) => setName(e.target.value)}
                     /></div>
                     <div className='border-b-2 border-b-white'><input {...register("email")} placeholder="Email" 
                     // onChange={(e) => setEmail(e.target.value)}
                     /></div>
                     <div className='border-b-2 border-b-white'><input {...register("password")} placeholder="Password" 
                     // onChange={(e) => setPassword(e.target.value)}
                     /></div>
                    </div>
 
                    <div className='flex flex-col items-center justify-around w-[60%] h-[10%]  rounded-[20px] bg-white text-black'><input type="submit" /></div>
                    <div className='text-[0.8rem] flex flex-row'><p className='flex flex-row text-white'>Alreday a member? <div className='text-blue-600 text-[0.8rem]'><NavLink to='/login'>Login </NavLink> </div></p></div>
                 </div>
             </form>
 
 
         </div>
     )
}

export default SignUp
