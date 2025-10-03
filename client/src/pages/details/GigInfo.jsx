import React from 'react'
import Rating from './Rating'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { notFound } from '../../utils/constants'
import { Link } from 'react-router-dom';
import { useDeleteGig } from '../../services/gig';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
const GigInfo = ({ gig }) => {
    const {token} = useContext(AuthContext)
    const {mutate} = useDeleteGig()
    const navigate = useNavigate()
    const handleDelete = () => {
        mutate({id: gig._id, token}, {
            onSuccess: () => {
                toast.success("Gig deleted successfully")
                navigate("/")
            },
            onError: (error) => {
                toast.error(error.message)
                navigate("/")
            }
        })
    }
    return (
        <div>
            <div className="h-[50vh] overflow-hidden">
                <img
                    src={gig.coverImage}
                    className='mx-auto h-full object-cover rounded-md shadow-lg'
                    alt={gig.title}
                />
            </div>

            <h1 className='text-3xl font-semibold mt-10 pt-4 border-t border-zinc-300'>{gig.title}</h1>

            <div className="flex justify-between items-center">
            <Rating rating={gig.starCount} reviews={gig.reviewCount} />
                <div className='flex items-center gap-3 bg-white rounded-lg shadow-md px-4 py-2 border border-gray-100'>
                    <Link to={`/gig/${gig._id}/edit`} className='flex items-center gap-1 text-green-600 hover:text-green-700'>
                        <IoCreateOutline className='text-lg' />
                        <span>Edit</span>
                    </Link>
                    <div className='w-px h-6 bg-gray-200'></div>
                    <Link onClick={handleDelete} className='flex items-center gap-1 text-red-600 hover:text-red-700'>
                        <IoTrashOutline className='text-lg' />
                        <span>Delete</span>
                    </Link>
                </div>
            </div>
            <div className='flex gap-2 items-center mt-4 text-gray-500'>
                <img src={gig?.user?.photo} alt="user photo" className='size-8 rounded-full' />
                <p>Created by <span className='font-semibold'>{gig?.user?.username}</span></p>
            </div>
            <div className='my-16'>
                {gig.images.length > 0 &&
                    (<Splide aria-label="Gig images" options={{
                        perPage: 2,
                        arrows: true,
                        pagination: true,
                        gap: '1rem',
                    }}>
                        {gig.images.map((image, key) => (
                            <SplideSlide key={key}>
                                <img src={image} onError={(e) => e.currentTarget.src = notFound} />
                            </SplideSlide>
                        ))}
                    </Splide>)}
            </div>
            <div>
                <h1 className='text-xl font-bold mb-2 mt-5'>Information about the gig</h1>
                <p className='text-gray-600'>{gig.description}</p>
            </div>
        </div>
    )
}

export default GigInfo