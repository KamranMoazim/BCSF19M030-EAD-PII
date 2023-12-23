import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../state-management/auth/authStore'

interface Props {
    allowedRoles:string[]
}

const PrivateRoutes = ({allowedRoles}:Props) => {

    const {user} = useAuthStore()

    if(!user){
        return <Navigate to="/login" />
    }

    if (allowedRoles.includes(user.user.role)) {
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }

}

export default PrivateRoutes