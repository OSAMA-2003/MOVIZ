import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/auth'
import {  useNavigate } from 'react-router-dom'

function Profile() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  const {user , logout} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    logout()
    navigate('/' )
  }
  return (
    <div className='pt-44 mb-20 max-h-[100vh]'>
   <h1 className='m-5 '>
    Welcome {user}
   </h1>
   <button onClick={handleLogout} className='m-5  btn px-5 py-2'>
    Logout 
   </button>
    </div>
  )
}
export default Profile