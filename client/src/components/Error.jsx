import React from 'react'

const Error = ({ error, refetch, navigate}) => {
//   console.log("Error object:", error);
  return (
    <div className='flex flex-col gap-5 justify-center items-center bg-green-800 text-white w-50% mx-auto rounded-md p-5'>
            <p className='text-2xl font-bold'>Opps something went wrong!</p>
            <p>Details: </p>
            <p>{error?.response?.data?.message || "Something went wrong"}</p>
            <button onClick={() => refetch()} className='bg-white text-green-800 px-4 py-2 rounded-md hover:bg-green-800 hover:text-white transition cursor-pointer'>Try again</button>
            <button onClick={() => navigate("/")} className='bg-white text-green-800 px-4 py-2 rounded-md hover:bg-green-800 hover:text-white transition cursor-pointer'>Go to home</button>
          </div>
  )
}

export default Error