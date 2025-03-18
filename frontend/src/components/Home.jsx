import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import account from 'D:/Notes app/frontend/src/assets/person_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import add from 'D:/Notes app/frontend/src/assets/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import close from 'D:/Notes app/frontend/src/assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
// import { useRoute } from 'react'

function Home() {
 
  const route = useLocation();
  const navigate = useNavigate();
  // console.log(route.state)
  // console.log(route.state.res.user.name)

  useEffect(() => {
  if (route.state && route.state.res && route.state.res.user) {
    localStorage.setItem('token', route.state.res.user._id);
    console.log('Token value set');
  } else {
    console.log('Token value not available yet');
  }
  }, [route.state]);
  
   const token = localStorage.getItem('token')
  

  console.log(token)

const [notes , setNotes] = useState(null)
  async function getNotesList(userId) {
    console.log(userId)
    const response = await fetch("http://localhost:3000/getNotesList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userId })
      

    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setNotes(data)
    }
    // console.log(response);
  }

  
  useEffect(() => {
    getNotesList(token)
    
  }, []);

  

  return (
    <div className='w-[100%] h-[100%] gap-[3rem] flex flex-col items-center justify-between  bg-black'>
      <div className='flex flex-row items-center justify-around gap-[12rem] w-[100%] h-[3.5rem] bg-black/20  fixed top-0 rounded-b-[10px] shadow-[0px_0px_20px_3px_rgba(2,_141,_247,_0.5)]'>
        <h1 className='font-notes font-[600] text-amber-50 text-[1.5rem]'>Notes</h1>
        <button className='border-3 border-white h-[2rem] w-[2rem] rounded-[50%]' onClick={()=>{
          localStorage.removeItem('token')
          navigate('/login')
        }}><img src={account} alt="" className='h-[100%] w-[100%]' /></button>

      </div>
      <div className='flex flex-col items-center justify-center gap-[1.5rem] w-[90%]   mt-[5rem]'>
      
        {notes && notes.map((note, index) => (
          <NoteCard key={index} note={note}  />
        ))}
      
        {/* <NoteCard /> */}
        {/* <NoteCard /> */}
      </div>
      <div className='fixed top-[80%] left-[80%]'><AddNote /></div>
    </div>
  )
}

export default Home

function NoteCard({ key, note }) {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const route = useLocation();

  // console.log(route.state)
  // console.log(route.state.res.user.name)
  // const res = route.params;

  const [name, setName] = useState(null)
  async function getCredentials() {
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: route.state.res.user.name, password: route.state.res.user.password })

    });
    if (response.ok) {
      const data = await response.json();
      // console.log(data)
      setName(data.user.name)
    }
    // console.log(response);
  }

  useEffect(() => {
    getCredentials();
    
  }, []);


  
  // const [click, setClick] = useState(false)

  // useEffect(() => {
  //   click ? console.log('clicked') : console.log('not clicked')
    
  // }, [click]);

  function handleClick(note) {
   
    // useEffect(() => {
    //   // Call navigate() here to avoid running it during rendering
      navigate('/readNote1', { state: { res: note.content, id: note._id } });
    // }, [navigate]);
    console.log(note._id)
    
  }



  
 

  return (
    <div className='w-[100%] min-h-[5rem] flex flex-col items-center justify-center bg-black-50/20  rounded-[15px] shadow-[inset_0px_0px_20px_0px_rgba(204,_16,_154,_0.9)]' onClick={() => handleClick(note)} >
      <h1 className='text-amber-50'>{note.title}</h1>
    </div>
  )
}




function AddNote() {
  const [render, setRender] = useState(false)
  
  return (
    <>
      <div className='w-[3rem] h-[3rem] rounded-[50%] border-3 border-white flex items-center justify-center'>
        <button onClick={() => { setRender(true) }}><img src={add} alt="" className='h-[100%] w-[100%]' /></button>

      </div>
      <div className=' '>{render ? <AddTitle 
      render={render}
      setRender={setRender}
      /> : null}</div>
    </>
  )
}






function AddTitle({render, setRender}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [title, setTitle] = useState(null)
  console.log(title)
  const token = localStorage.getItem('token')
  

  console.log(token)

  const route = useLocation();

  return (
    <div className='w-[15rem] h-[15rem] rounded-[10px] fixed top-[30%] left-[20%]  flex flex-col items-center justify-between bg-black shadow-[0px_0px_10px_2px_rgba(0,_255,_255,_0.7)]'>
     <div className='flex flex-col items-end w-[100%]'> <div className='w-[1.5rem] h-[1.5rem] rounded-[50%] border-2 border-amber-50 mt-1 mr-1' onClick={()=>{setRender(!render)}}><img src={close} alt="" /></div></div>
      <div><h1 className='text-amber-50 font-title text-[1.3rem]'>Add Title</h1></div>
      
      <form onSubmit={handleSubmit((data) => {
        setTitle(JSON.stringify(data))

        console.log(route.state)
        navigate('/readNote', { state: { res: data, user: token } });

      })}
      
      className='w-[100%] h-[45%] flex flex-col items-center justify-between gap-[1.5rem] mb-5'
      >
        <div className='flex flex-col items-center justify-between w-[100%] h-[100%] '>

          <div className='border-b-2 border-b-white text-white'><input {...register("title")} placeholder="Enter title"
          // onChange={(e) => setName(e.target.value)}
          className='text-white/40'
          /></div>

<div className='flex justify-center items-center w-[50%] h-[2rem] rounded-[20px]  text-black bg-amber-50 font-[500]'><input type="submit" /></div>

         
        </div>
        
      </form>
    </div>
  )
}
