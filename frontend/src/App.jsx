import React from 'react'
import {Toaster} from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import appStore from './app/appStore'

const App = () => {
  return (
    <div>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Provider store={appStore}>
          <BrowserRouter>
              <AppRoutes />
          </BrowserRouter>
        </Provider>
    </div>
  )
}

export default App
