import React from 'react'

const CustomButton = ({children}) => {
  return (
    <button type="submit "className='bg-blue-700 hover:bg-blue-800 text-white text-sm rounded-lg w-fit max-sm:w-full cursor-pointer  px-4 py-2 '>{children}</button>
  )
}

export default CustomButton