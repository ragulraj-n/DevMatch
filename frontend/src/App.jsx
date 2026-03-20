import React from 'react'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Signup'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div>
        <Toaster position="bottom-right" reverseOrder={false} />
        {/* <Login /> */}
        <Register />
    </div>
  )
}

export default App
