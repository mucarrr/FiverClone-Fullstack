import React from 'react'

const Input = ({label, name, placeholder, type, disabled}) => {
  return (
    <div className='mb-5'>
        <label className='mb-2 text-sm font-medium block'>{label}</label>
        <input name={name} placeholder={placeholder} type={type} className={`bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 text-dark ${disabled ? "bg-gray-200" : ""}`} disabled={disabled}/>
    </div>
  )
}

export default Input