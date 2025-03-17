import React from 'react'
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import close from 'D:/Notes app/frontend/src/assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import check from 'D:/Notes app/frontend/src/assets/check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'

function EditNote() {
    const route = useLocation();
    const navigate = useNavigate();
const [noteContent, setNoteContent] = useState(null)
    const noteContentId = route.state.res
    // console.log(noteContentId)

    async function getNoteContent(userId) {
        console.log(userId)
        const response = await fetch("http://localhost:3000/getNoteContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: userId })
          
    
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setNoteContent(data.user.content)
        }
        // console.log(response);
      }
    
      
      useEffect(() => {
        getNoteContent(noteContentId)
        
      }, []);

      useEffect(() => {
        getNoteContent(noteContentId)
        
      }, []);

      

const [value, setValue] = useState(''); // State to hold the input value
const [newContent, setNewContent] = useState(''); // State to hold the input value
useEffect(() => {
    if (noteContent !== null) {
        setValue(noteContent); // Update value when noteContent is fetched
    }
}, [noteContent]);

      const handleChange = (event) => {
        setValue(event.target.value); // Update state with the new value
      };


      async function updateNote(content, id) {
          console.log(content)
          const response = await fetch("http://localhost:3000/updateNote", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({  content, id })
            
      
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data)
          
          }
          // console.log(response);
        }
      
        
       
    
  return (
    <div>
      <div className='flex flex-row items-center justify-around gap-[12rem] w-[100%] h-[3.5rem] bg-black/20  relative  top-0 rounded-b-[10px] shadow-[0px_0px_20px_3px_rgba(2,_141,_247,_0.5)]'>
              <h1 className='font-notes font-[600] text-amber-50 text-[1.5rem]'>Notes</h1>
              <button className='border-3 border-white h-[2rem] w-[2rem] rounded-[50%]'><img src={close} alt="" className='h-[100%] w-[100%]' onClick={() => { navigate('/home') }} /></button>
      
            </div>

<div className='w-[100%] min-h-[80vh]  text-white mt-5'><textarea value={value} onChange={handleChange  }  name="" id="" className='w-[100%] min-h-[80vh] '></textarea></div>
<div className='fixed top-[80%] left-[85%] w-[3rem] h-[3rem] rounded-[50%] border-3 border-white flex items-center justify-center text-white text-[0.8rem]' onClick={()=>{updateNote(value, noteContentId)
     navigate('/home')}}><img src={check} alt=""  /></div>
{/* <div className='w-[100%] min-h-[80vh] border-2 border-amber-200 text-white mt-5'><input type="text" value={noteContent}  className='w-[100%] h-[100%] border-2 border-amber-50' /></div> */}
    </div>
  )
}

export default EditNote
