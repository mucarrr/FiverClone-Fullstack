import React from 'react'
import Input from '../../components/Input'
import CustomButton from '../../components/CustomButton'
import { inputs, categories } from '../../utils/constants'
import Select from '../../components/Select'
import { useCreateGig } from '../../services/gig'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const Create = () => {
  const navigate = useNavigate()
  const {token} = useContext(AuthContext)
  const {mutate} = useCreateGig()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    // console.log(formData)
    mutate({data: formData, token}, {
      onSuccess: (response) => {
        toast.success("Gig created successfully")
        navigate(`/gig/${response.data.gig._id}`)
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong"
        toast.error(errorMessage)
      }
    })

  }
  return (
    <div>
      <h1 className='text-2xl text-gray-500 font-bold mb-5 mx-8'>Create a new service</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-8 md:gap-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-8'>
              {inputs.map((input)=>(
                <Input key={input.name} {...input} placeholder={input.placeholder} className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 text-dark" required={input.required} type={input.type} name={input.name} disabled={input.disabled}/>
              ))}
              <Select label="Category" name="category" options={categories} required={true} type="select" placeholder="Select category" className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 text-dark"/>
            </div>
            <CustomButton>Create</CustomButton>
      </form>
    </div>
  )
}

export default Create