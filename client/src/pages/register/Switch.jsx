import React from 'react'

const Switch = ({isSeller, setIsSeller}) => {

  return (
    <div className='flex gap-5 items-center mb-5'>
        <p>Activate your seller account</p>
        

        <label className="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" checked={isSeller} onChange={() => setIsSeller(!isSeller)} />
  <div className="relative w-11 h-6 bg-red-400 rounded-full peer peer-checked:bg-green-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600  dark:peer-checked:bg-green-600"></div>
  </label>



    </div>
  )
}

export default Switch