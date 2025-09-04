import React from 'react'
import GigInfo from './GigInfo'
import { useParams } from 'react-router-dom'
import { useGetOneGig } from '../../services/gig'
import Breadcrumbs from './Breadcrumbs'
import UserInfo from './UserInfo'


const Details = () => {
  const {id} = useParams()
  const {isLoading, data, isError, refetch} = useGetOneGig(id)

  console.log('Details - Data:', data)
  console.log('Details - User:', data?.user)
  
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>opps something went wrong</div>
  if(!data) return <div>No data available</div>
  return (
    <div className="md:px-10 xl:px-15">
      <div className="">
        <div className="">
          <Breadcrumbs category={data.category} />
          <GigInfo gig={data} refetch={refetch} />
          <UserInfo user={data.user} />
        </div>
      </div>
    </div>);
}


export default Details