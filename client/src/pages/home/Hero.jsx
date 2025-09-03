import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const Hero = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        
        
    }
  return (
    <div className=" bg-[#0a4226] text-white h-[40vh] px-6 py-5 flex flex-col justify-center items-center md:rounded-md">
      <div className='max-w-[600px]'>
        <h1 className='text-4xl md:text-5xl font-light md:text-center'>
          Scale your professional workforce with <span>freelancers</span>.
        </h1>

        <form onSubmit={handleSubmit}
        className='bg-white rounded-md w-full flex gap-5 mt-10'>
          <input 
          type="text" 
          placeholder='Search for services...' 
          className='text-black flex-1 p-2 rounded-md outline-none'
          />
          <button className='bg-[#0a4226] m-1 p-2 rounded-md hover:opacity-75 transition cursor-pointer'>
            <IoSearchOutline />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Hero