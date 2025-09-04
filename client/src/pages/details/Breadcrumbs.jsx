import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
const Breadcrumbs = ({category}) => {
  return (
    <div className='my-4 border-b border-neutral-200 pb-3'>
        <p className='flex items-center gap-3 text-gray-500'>
            <Link to="/"><FaHome /></Link>
            <span>/</span>
            <Link to={`/search?category=${category}`} className="hover:underline">{category}</Link>
        </p>
    </div>
  )
}

export default Breadcrumbs