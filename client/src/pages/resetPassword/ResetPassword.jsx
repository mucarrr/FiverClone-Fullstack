import React, { useState } from 'react'
import Input from '../../components/Input'
import CustomButton from '../../components/CustomButton'
import { Link, useParams } from 'react-router-dom'
import { api } from '../../api'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [success, setSuccess] = useState(false)
  const {token} = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    await api.patch(`/auth/reset-password/${token}`, data).then((res) => {
      toast.success(res.data.message)
      setSuccess(true)
    }).catch((err) => {
      toast.error(err.response.data.message)
    })

  }
  if(success){
    return <div className='max-w-[400px] sm:max-w-[500px] mx-auto pt-24'>
      <h1 className='text-2xl text-gray-500 font-bold mb-5'>Password reset successfully</h1>
      <Link to="/login" className='text-blue-500'>Login</Link>
    </div>
  }
  return (
    <div className='max-w-[400px] sm:max-w-[500px] mx-auto pt-24'>
      <h1 className='text-2xl text-gray-500 font-bold mb-5'>Set new password</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-8 md:gap-10'>
        <div>
        <Input label="New Password" type="password" name="password" placeholder="Enter your new password" required/>
        <Input label="Confirm Password" type="password" name="passwordConfirm" placeholder="Enter your confirm password" required/>
        <CustomButton>Set new password</CustomButton>
        </div>
        
      </form>
      <p className='text-sm text-gray-500 mt-5'>Don't have an account? <Link to="/register" className='text-blue-500'>Register</Link></p>
    </div>
  )
}

export default ResetPassword