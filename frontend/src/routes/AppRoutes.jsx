import React from 'react'
import { Navigate, Route, Routes  } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../features/auth/pages/Login'
import Signup from '../features/auth/pages/Signup'
import Profile from '../features/profile/page/profile'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index  path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
