import { useQuery, useMutation } from "@tanstack/react-query"
import { api } from "../api"

export const gigService = {
    getAll : (params) => api.get("/gigs", {params}),
    getOne : (id) => api.get(`/gigs/${id}`),
    create : (data, token) => api.post("/gigs", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),
    update : (id, data, token) => api.patch(`/gigs/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }),
    delete : (id, token) => api.delete(`/gigs/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
// get all services and save in memory
const useGetAllGigs = (params) => useQuery({
    queryKey : ["gigs", params],
    queryFn : () => gigService.getAll(params),
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

// update service and save in memory
const useUpdateGig = () => useMutation({
    mutationKey : ["updateGig"],
    mutationFn : ({id, data, token}) => gigService.update(id, data, token),
    select: (res) => res.data
}) 

// delete service and save in memory
const useDeleteGig = () => useMutation({
    mutationKey : ["deleteGig"],
    mutationFn : ({id, token}) => gigService.delete(id, token),
    select: (res) => res.data
}) 

export { useGetAllGigs, useGetOneGig, useCreateGig, useUpdateGig, useDeleteGig }