import { useQuery, useMutation } from "@tanstack/react-query"
import { api } from "../api"

export const gigService = {
    gelAll : (params) => api.get("/gigs", {params}),
    getOne : (id) => api.get(`/gigs/${id}`),
    create : (data, token) => api.post("/gigs", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
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
// create service and save in memory
const useCreateGig = () => useMutation({
    mutationKey : ["createGig"],
    mutationFn : ({data, token}) => gigService.create(data, token),
    select: (res) => res.data
}) 

export { useGetAllGigs, useGetOneGig, useCreateGig }