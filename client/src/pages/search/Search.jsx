import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetAllGigs } from '../../services/gig'
import Title from './Title'
import Card from '../details/Card'

const Search = () => {
  const [params] = useSearchParams()
  const search = params.get("query")
  const category = params.get("category")

  const apiParams = {
    search,
    category,
  }
  const {isLoading, data, isError, refetch} = useGetAllGigs(apiParams)
  return (
    <div>
      <div className="mb-4">
        <Title search={search} category={category} />
      </div>

      {
        isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>opps something went wrong</div>
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