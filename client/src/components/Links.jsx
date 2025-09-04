import React from 'react'
import { RiLoginBoxLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Links = () => {
  return (
    <div className='flex items-center'>
      <Link 
        to="/login" 
        className='flex items-center gap-2 bg-white rounded-lg shadow-md px-4 py-2 border border-gray-100 hover:shadow-lg hover:bg-gray-50 transition-all duration-200'
      >
        <RiLoginBoxLine className='text-lg text-green-600'/>
        <span className='text-sm font-medium text-green-600'>Giriş Yap</span>
      </Link>
    </div>
  )
}

export default Links