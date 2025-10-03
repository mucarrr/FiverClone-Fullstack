import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import CustomButton from '../../components/CustomButton'
import { inputs, categories } from '../../utils/constants'
import Select from '../../components/Select'
import { useCreateGig, useUpdateGig, useGetOneGig } from '../../services/gig'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

const Create = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  const {token} = useContext(AuthContext)
  const {mutate: createMutate} = useCreateGig()
  const {mutate: updateMutate} = useUpdateGig()
  const {data: gigData} = useGetOneGig(id)
  
  const [formData, setFormData] = useState(() => {
    if (isEdit && gigData) {
      return {
        title: gigData.title || '',
        description: gigData.description || '',
        packageTitle: gigData.packageTitle || '',
        packageDescription: gigData.packageDescription || '',
        packagePrice: gigData.packagePrice || '',
        packageDuration: gigData.packageDuration || '',
        packageFeatures: gigData.packageFeatures?.join(', ') || '',
        packageRevision: gigData.packageRevision || '',
        category: gigData.category || ''
      }
    }
    return {}
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    // console.log(formData)
    
    const mutation = isEdit ? updateMutate : createMutate
    const mutationData = isEdit ? {id, data: formData, token} : {data: formData, token}
    
    mutation(mutationData, {
      onSuccess: (response) => {
        toast.success(isEdit ? "Gig updated successfully" : "Gig created successfully")
        navigate(`/gig/${isEdit ? id : response.data.gig._id}`)
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong"
        toast.error(errorMessage)
      }
    })

  }
  return (
    <div>
      <h1 className='text-2xl text-gray-500 font-bold mb-5 mx-8'>
        {isEdit ? 'Edit service' : 'Create a new service'}
      </h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-8 md:gap-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-8'>
              {inputs.map((input)=>(
                <Input 
                  key={input.name} 
                  {...input} 
                  placeholder={input.placeholder} 
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 text-dark" 
                  required={input.required} 
                  type={input.type} 
                  name={input.name} 
                  disabled={input.disabled}
                  defaultValue={formData[input.name] || ''}
                />
              ))}
              <Select 
                label="Category" 
                name="category" 
                options={categories} 
                required={true} 
                type="select" 
                placeholder="Select category" 
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 text-dark"
                defaultValue={formData.category || ''}
              />
            </div>
            <CustomButton>{isEdit ? 'Update' : 'Create'}</CustomButton>
      </form>
    </div>
  )
}

export default Create