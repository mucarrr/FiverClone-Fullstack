import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'
import { IoLogOutOutline } from 'react-icons/io5'

const User = () => {
  const {user, logout} = useContext(AuthContext)
  return (
    <div className='flex items-center justify-center' onClick={() => navigate("/profile")}>
      <img src={user?.photo} alt="user" className='w-8 h-8 rounded-full'/>
      <button className='cursor-pointer'><IoLogOutOutline className='text-3xl text-green-700 font-bold' onClick={logout}/></button>
    </div>
  )
}

export default User