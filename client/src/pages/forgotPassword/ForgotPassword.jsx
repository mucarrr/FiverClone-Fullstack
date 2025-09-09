import React from 'react'
import Input from '../../components/Input'
import CustomButton from '../../components/CustomButton'
import { Link } from 'react-router-dom'

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    
  }
  return (
    <div className='max-w-[400px] sm:max-w-[500px] mx-auto pt-24'>
      <h1 className='text-2xl text-gray-500 font-bold mb-5'>Reset password</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-8 md:gap-10'>
        <div>
        <Input label="Email" type="email" name="email" placeholder="Enter your email" required/>
        <CustomButton>Send reset link</CustomButton>
        </div>
        
      </form>
      <p className='text-sm text-gray-500 mt-5'>Don't have an account? <Link to="/register" className='text-blue-500'>Register</Link></p>
    </div>
  )
}

export default Login