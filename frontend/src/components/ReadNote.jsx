import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import close from 'D:/Notes app/frontend/src/assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import check from 'D:/Notes app/frontend/src/assets/check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
function ReadNote() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [content, setContent] = useState(null)
const navigate = useNavigate();
  const route = useLocation();
  console.log(route.state)
  console.log(route.state.res.title)
  const title = route.state.res.title
  const user = route.state
  const postData = {
    title: title,
    content: content,
    user: user.user.res.user._id
  }
  console.log(postData)

  // useEffect(() => {
  //   if (route.state && route.state.res && route.state.res.title) {
  //     localStorage.setItem('postDataToken', postData);
  //     console.log('Token value set');
  //   } else {
  //     console.log('Token value not available yet');
  //   }
  //   }, [route.state]);
    
  //    const token = localStorage.getItem('postDataToken')
    
  
  //   console.log(token)

  async function postContent(postData) {
    const response = await fetch("http://localhost:3000/title", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      const data = await response.json();
      //   navigate('/home', {state: {res: data}});
    }
    console.log(response);
  }

  function navigateHome() {
navigate('/home')

  }

  return (
    <div>

      <div className='flex flex-row items-center justify-around gap-[12rem] w-[100%] h-[3.5rem] bg-black/20  relative top-0 rounded-b-[10px] shadow-[0px_0px_20px_3px_rgba(2,_141,_247,_0.5)]'>
              <h1 className='font-notes font-[600] text-amber-50 text-[1.5rem]'>Notes</h1>
              <button className='border-3 border-white h-[2rem] w-[2rem] rounded-[50%]'><img src={close} alt="" className='h-[100%] w-[100%]' onClick={()=>{navigateHome()}}/></button>
      
            </div>
      <form onSubmit={handleSubmit((data) => {
        setContent(JSON.stringify(data.content))
        postContent(postData)

      })}>
        <div className='flex flex-col items-center justify-center w-[100%] h-[100%] mt-2'>

          {/* <div className='border-2 border-amber-400'><input {...register("title")} placeholder="First name"
        // onChange={(e) => setName(e.target.value)}
        /></div> */}

          <div className=' w-[100%] text-white mt-3 min-h-[80vh]'><input {...register("content")} placeholder="Type your note...."
          // onChange={(e) => setName(e.target.value)}
          /></div>


          <div className='fixed top-[80%] left-[85%] w-[3rem] h-[3rem] rounded-[50%] border-3 border-white flex items-center justify-center text-white text-[0.8rem]'><input type="submit" placeholder={check} className=''/></div>
        </div>
      </form>
    </div>
  )
}

export default ReadNote
