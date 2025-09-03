import React from 'react'
import { RiLoginBoxLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Links = () => {
  return (
    <div className='flex items-center'>
      <Link to="/login" className='flex items-center rounded border-2 border-green-700 px-4 py-[2px]'>
        <RiLoginBoxLine className='cursor-pointer text-3xl text-green-700 font-bold'/>
        <span className='text-md text-green-700 font-bold'>Login</span>
      </Link>
    </div>
  )
}

export default Links