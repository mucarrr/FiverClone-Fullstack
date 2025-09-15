import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useGetAllGigs } from '../../services/gig'
import Title from './Title'
import Card from '../details/Card'
import Loader from '../../components/Loader'
import Error from '../../components/Error'

const Search = () => {
  const [params] = useSearchParams()
  const search = params.get("query")
  const category = params.get("category")

  const [sortBy, setSortBy] = useState("createdAt")
  const [order, setOrder] = useState("desc")
 
  const navigate = useNavigate()
  const apiParams = {
    search,
    category,
    sortBy,
    order,
  }
  const {isLoading, data, error, refetch} = useGetAllGigs(apiParams)
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Title search={search} category={category} />
        <div className='flex items-center gap-2'>
        <select name="sort" id="sort" className='bg-gray-50 border border-gray-300 text-sm rounded-lg w-40 p-2.5 text-dark' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="createdAt">Newest</option>
          <option value="packagePrice">Price</option>
          <option value="starCount">Rating</option>
          <option value="reviewCount">Reviews</option>
        </select>
        <select name="order" id="order" className='bg-gray-50 border border-gray-300 text-sm rounded-lg w-40 p-2.5 text-dark' value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="">Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        </div>
      </div>

      {
        isLoading ? (
          <div className='flex justify-center items-center h-full'><Loader /></div>
        ) : error ? (
          <Error error={error} refetch={refetch} navigate={navigate} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              data?.map((item, key) => (
                <Card item={item} key={key} />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Search