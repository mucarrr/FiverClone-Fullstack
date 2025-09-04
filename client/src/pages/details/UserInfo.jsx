import React from 'react'
import Rating from './Rating'
import { PiStar, PiStarFill } from 'react-icons/pi'
import { MdMessage } from 'react-icons/md'
import { IoPersonAdd } from 'react-icons/io5'
const UserInfo = ({user}) => {
  return (
    <div className='mt-20 border-t border-zinc-300'>
        <h1 className='font-bold text-xl mt-10 mb-3'>About the seller</h1>
        <div className='flex flex-col items-center gap-2'>
            <img src={user?.photo} alt="user" className='size-24 rounded-full object-cover' />
            <h4 className='font-semibold'>{user?.username}</h4>
            <p className='text-gray-500 font-[300] text-center'>{user?.description}</p>
            <div className="flex gap-5">
                <Rating rating={4.1} reviews={1023} />
            </div>
            <div className='flex items-center bg-orange-700/40 py-3 px-3 rounded-md text-yellow-200'>
                   <PiStarFill />
                   <PiStarFill />
                   <PiStarFill />
                   <PiStarFill />
                   <PiStar />
            </div>
            <div className="flex gap-8 mt-5 font-semibold">
                <button className="py-2 px-5 border rounded-md hover:text-yellow-200 flex items-center gap-2 "><IoPersonAdd/>Hire Me</button>
                <button className="py-2 px-5 border rounded-md hover:text-yellow-200 flex items-center gap-2 bg-green-500/40 hover:bg-green-600"><MdMessage className='text-xl'/>Message Me</button>
            </div>
            <div className="border border-zinc-300 my-10 p-5 grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                    <span className="text-gray-500">From</span>
                    <span className="text-zinc-700 font-semibold">{user?.country}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-gray-500">Member since</span>
                    <span className="text-zinc-700 font-semibold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-gray-500">Phone</span>
                    <span className="text-zinc-700 font-semibold">{user?.phone}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-gray-500">Email</span>
                    <span className="text-zinc-700 font-semibold">{user?.email}</span>
                </div>
            </div>

        </div>
    
    </div>
  )
}

export default UserInfo