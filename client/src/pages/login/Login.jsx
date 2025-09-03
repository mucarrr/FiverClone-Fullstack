import React from 'react'
import Input from '../../components/Input'
import CustomButton from '../../components/CustomButton'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext.jsx'
import { Link } from 'react-router-dom'

const Login = () => {
  const {login} = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    await login(data)
  }
  return (
    <div className='max-w-[400px] sm:max-w-[500px] mx-auto pt-24'>
      <h1 className='text-2xl text-gray-500 font-bold mb-5'>Login to your account</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-8 md:gap-10'>
        <div>
        <Input label="Username" type="text" name="username" placeholder="Enter your username" required/>
        <Input label="Password" type="password" name="password" placeholder="Enter your password" required/>
        <CustomButton>Login</CustomButton>
        </div>
        
      </form>
      <p className='text-sm text-gray-500 text-center mt-5'>Don't have an account? <Link to="/register" className='text-blue-500'>Register</Link></p>
    </div>
  )
}

export default Login