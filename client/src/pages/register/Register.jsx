import React from 'react'
import Input from '../../components/Input'
import Switch from './Switch'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext.jsx'


const Register = () => {
  const [isSeller, setIsSeller] = useState(false)
  const {register} = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    data.isSeller = isSeller
    // console.log(data)
    await register(data)
  }
  return (
    <div className='max-w-[900px] mx-auto'>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 md:pt-24'>
        {/* left area */}
          <div>
          <h1 className='text-2xl text-gray-500 font-bold mb-5'>Create an account</h1>
          <Input label="Username" type="text" name="username" placeholder="Enter your username" required/>
          <Input label="Email" type="email" name="email" placeholder="Enter your email" required/>
          <Input label="Country" type="text" name="country" placeholder="Enter your country" required/>
          <Input label="Photo" type="file" name="photo" placeholder="Enter your photo" required/>
          <Input label="Password" type="password" name="password" placeholder="Enter your password" required/>
          </div>
          {/* right area */}
          <div>
            <h1 className='text-2xl text-gray-500 font-bold mb-5'>Become a Seller</h1>
            <Switch isSeller={isSeller} setIsSeller={setIsSeller} />
            <Input label="Phone" type="number" name="phone" placeholder="Enter your phone" disabled={!isSeller}/>
            <Input label="Description" type="text" name="description" placeholder="Enter your description" disabled={!isSeller}/>
            <CustomButton>Register</CustomButton>
          </div>

      </form>
    </div>
  )
}

export default Register