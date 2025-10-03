import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const Protected = () => {
    const { user } = useContext(AuthContext)
    return (user?.isSeller ? <Outlet/> : <Navigate to="/" replace/>)
   
}

export default Protected