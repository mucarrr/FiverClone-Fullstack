import React from 'react'

const Select = ({label, name, options, required, type, placeholder, className}) => {
  return (
    <div className='mb-5'>
        <label className='mb-2 text-sm font-medium block'>{label}</label>
        <select name={name} className={`bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 text-dark ${className}`} required={required} type={type} placeholder={placeholder}>
            {options.map((option)=>(
                <option key={option.name} value={option.name}>{option.name}</option>
            ))}
        </select>
    </div>
  )
}

export default Select