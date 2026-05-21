import React from 'react'
import { Navigate, Route, Routes  } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Login from '../features/auth/pages/Login'
import Signup from '../features/auth/pages/Signup'
import Profile from '../features/profile/page/profile'
import SetUpProfile from '../features/profile/page/SetUpProfile'
import FeedPage from '../features/Home/pages/FeedPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index  path="/" element={<Navigate to="/feed" replace />} />
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/u/:userName" element={<Profile />} />
        <Route path="setup-profile" element={<SetUpProfile />} />
        <Route path="feed" element={<FeedPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
