import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [name, setName] = useState(null)
  // const [email, setEmail] = useState(null)
  // const [password, setPassword] = useState(null)

  const [data, setData] = useState(null)

  const navigate = useNavigate();

  async function postData(data) {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      navigate('/home', { state: { res: data } });
    }
    console.log(response);
  }



  console.log(data)
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-b from-fuchsia-900 to-slate-900'>
      <form onSubmit={handleSubmit((data) => {
        setData(JSON.stringify(data))

        postData(data)
      })}

        className='h-[50%] w-[60%] flex flex-col items-center justify-around'
      >

        <div className='flex flex-col items-center justify-around w-[100%] h-[100%] shadow-[0px_0px_10px_2px_rgba(0,_255,_255,_0.7)] rounded-[10px] bg-black/20 '>
          <div className='font-login text-[1.5rem] text-amber-50'><h1>Login</h1></div>
          <div className='flex flex-col items-center justify-center w-[100%] h-[40%] gap-[3rem]'>
            <div className='border-b-2 border-b-white '><input {...register("name")} placeholder="Your name"
            // onChange={(e) => setName(e.target.value)}
            /></div>

            <div className='border-b-[2px] border-b-white'><input {...register("password")} placeholder="Password"
            // onChange={(e) => setPassword(e.target.value)}
            /></div>
          </div>
          <div className='flex flex-col items-center justify-around w-[60%] h-[10%]  rounded-[20px] bg-white text-black'><input type="submit" /></div>
          <div className='text-[0.8rem] flex flex-row'><p className='flex flex-row text-white'>New here? <div className='text-blue-600 text-[0.8rem]'><NavLink to='/signUp'> Sign Up!</NavLink> </div></p></div>
        </div>

      </form>


    </div>
  )
}

export default Login
