import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
    },
    reducers:{
        addUser: (state,action) => {
            state.currentUser = action.payload
        },
        removeUser: () => {
        return {
            currentUser: null
        };
},
    }

});

export const {
    addUser,
    removeUser
} = userSlice.actions;

export default userSlice.reducer;