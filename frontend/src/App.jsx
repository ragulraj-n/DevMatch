import React from 'react'
import {Toaster} from 'react-hot-toast'
import AppRoutes from './routes/appRoutes'
import {BrowserRouter} from 'react-router-dom'
const App = () => {
  return (
    <div>
        <Toaster position="bottom-right" reverseOrder={false} />
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </div>
  )
}

export default App
