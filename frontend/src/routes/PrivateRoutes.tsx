import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    allowedRoles:string[]
}

const PrivateRoutes = ({allowedRoles}:Props) => {

    const {user} = useAuth()

    if(!user){
        return <Navigate to="/login" />
    }

    // if (user.role) {
    if (allowedRoles.includes(user.role)) {
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }

}

export default PrivateRoutes