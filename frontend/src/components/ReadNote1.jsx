import React from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import close from 'D:/Notes app/frontend/src/assets/close_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import recycle from 'D:/Notes app/frontend/src/assets/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
import edit from 'D:/Notes app/frontend/src/assets/edit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'
function ReadNote1() {
  const route = useLocation();
  const navigate = useNavigate();
  console.log(route.state)
  const recycleElementId = route.state.id



  return (
    <div>
      <div className='flex flex-row items-center justify-around gap-[12rem] w-[100%] h-[3.5rem] bg-black/20  relative  top-0 rounded-b-[10px] shadow-[0px_0px_20px_3px_rgba(2,_141,_247,_0.5)]'>
        <h1 className='font-notes font-[600] text-amber-50 text-[1.5rem]'>Notes</h1>
        <button className='border-3 border-white h-[2rem] w-[2rem] rounded-[50%]'><img src={close} alt="" className='h-[100%] w-[100%]' onClick={() => { navigate('/home') }} /></button>

      </div>
      <p className='text-white mt-7'>{route.state.res}</p>
      <div className='fixed top-[80%] left-[85%]'><DeleteNode
        id={recycleElementId}

      /></div>
      <div className='fixed top-[70%] left-[85%]'>
        <div className='w-[2.5rem] h-[2.5rem] rounded-[50%] border-3 border-white flex items-center justify-center' onClick={() => {navigate('/editNote', {state: {res: recycleElementId}})}}>
          <img src={edit} alt="" className='w-[100%] h-[100%]' />
        </div>
      </div>
    </div>
  )
}

export default ReadNote1


function DeleteNode({ id }) {

  const navigate = useNavigate();

  async function deleteElement(id) {
    // console.log(id)
    const response = await fetch("http://localhost:3000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id })


    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)

    }
    // console.log(response);
  }

  return (
    <div className='w-[2.5rem] h-[2.5rem] rounded-[50%] border-3 border-white flex items-center justify-center' onClick={() => {
      deleteElement(id)
      navigate('/home')

    }}>
      <img src={recycle} alt="" className='w-[100%] h-[100%]' />
    </div>
  )
}

