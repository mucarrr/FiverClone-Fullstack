import React from 'react'
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
  const navigate = useNavigate()
  const apiParams = {
    search,
    category,
  }
  const {isLoading, data, error, refetch} = useGetAllGigs(apiParams)
  return (
    <div>
      <div className="mb-4">
        <Title search={search} category={category} />
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