import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext.jsx'
import { IoLogOutOutline } from 'react-icons/io5'

const User = () => {
  const navigate = useNavigate()
  const {user, logout} = useContext(AuthContext)
  
  return (
    <div className='flex items-center gap-3 bg-white rounded-lg shadow-md px-4 py-2 border border-gray-100'>
      <div 
        className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md px-2 py-1 transition-colors'
        onClick={() => navigate("/profile")}
      >
        <img 
          src={user?.photo} 
          alt="user" 
          className='w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm'
        />
        <span className='text-sm font-medium text-gray-700 hidden sm:block'>
          {user?.username}
        </span>
      </div>
      
      <div className='w-px h-6 bg-gray-200'></div>
      
      <button 
        onClick={logout}
        className='flex items-center gap-1 px-3 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-all duration-200 font-medium'
        title="Çıkış Yap"
      >
        <IoLogOutOutline className='text-lg' />
        <span className='text-sm hidden sm:block'>Çıkış</span>
      </button>
    </div>
  )
}

export default User