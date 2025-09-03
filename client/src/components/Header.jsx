import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from 'react-icons/io5'
import User from './User'
import Links from './Links'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'
const Header = () => {
  const {user} = useContext(AuthContext)
  return (
    <header className='p-5 shadow'>
        <div className='max-w-[1440px] mx-auto justify-between items-center flex gap-4 md:gap-8'>
            <Link to="/">
                <img src="/fiverr.png" alt="logo" className='w-[100px]'/>
            </Link>
            <form className='flex flex-1 border border-gray-400 rounded overflow-hidden max-w-[600px]'>
                <input type="search" placeholder='Search for gigs...' className='w-full h-full outline-none px-3 py-2'/>
                <button type='submit' className='px-3 py-2 bg-black text-white text-xl max-md:hidden'>
                    <IoSearch />
                </button>
            </form>
            <div className='flex items-center'>
                {user ? <User /> : <Links />}
            </div>
        </div>
    </header>
  )
}

export default Header