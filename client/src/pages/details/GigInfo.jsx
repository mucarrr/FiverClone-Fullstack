import React from 'react'
import Rating from './Rating'
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { notFound } from '../../utils/constants'
const GigInfo = ({ gig }) => {
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

            <Rating rating={gig.starCount} reviews={gig.reviewCount} />
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