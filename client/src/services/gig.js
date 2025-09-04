import { useQuery } from "@tanstack/react-query"
import { api } from "../api"

export const gigService = {
    gelAll : (params) => api.get("/gigs", {params}),
    getOne : (id) => api.get(`/gigs/${id}`)
}
// get all services and save in memory
const useGetAllGigs = (params) => useQuery({
    queryKey : ["gigs", params],
    queryFn : () => gigService.gelAll(params),
    select: (res) => res.data
}) 
// get single service and save in memory
const useGetOneGig = (id) => useQuery({
    queryKey : ["gig", id],
    queryFn : async () => await gigService.getOne(id),
    select: (res) => res.data.gig
}) 

export { useGetAllGigs, useGetOneGig }