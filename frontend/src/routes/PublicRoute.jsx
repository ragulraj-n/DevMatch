import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = () => {
    const currUser = useSelector(state => state.user.currentUser)
    const isAuthenticated = !!currUser

    if (isAuthenticated) {
        return <Navigate to="/feed" replace />
    }

    return <Outlet />
}

export default PublicRoute