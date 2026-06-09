import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/user/userSlice'
import connectionSlice from '../features/connection/connectionSlice'

const appStore = configureStore({
    reducer:{
        user: userSlice,
        connection: connectionSlice,
    },
})

export default appStore;