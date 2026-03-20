import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../features/auth/pages/Login'
import Signup from '../features/auth/pages/Signup'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
