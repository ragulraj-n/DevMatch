import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Login from '../features/auth/pages/Login'
import Signup from '../features/auth/pages/Signup'
import Profile from '../features/profile/page/profile'
import SetUpProfile from '../features/profile/page/SetUpProfile'
import FeedPage from '../features/Home/pages/FeedPage'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import ConnectionsPage from '../features/connection/page/ConnectionsPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage'
import SearchPage from '../features/search/pages/SearchPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Navigate to="/feed" replace />} />
        
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        <Route path="/u/:userName" element={<Profile />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="feed" element={<FeedPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setup-profile" element={<SetUpProfile />} />
          <Route path="connections" element={<ConnectionsPage />} />
           <Route path="search" element={<SearchPage />} />
        </Route>
        
      </Route>
    </Routes>
  )
}

export default AppRoutes