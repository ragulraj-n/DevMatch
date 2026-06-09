import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        connections: [],
        pendingRequests: [],
    },
    reducers: {
        addConnection: (state, action) => {
            state.connections = action.payload
        },
        addPendingRequest: (state, action) => {
            state.pendingRequests = action.payload
        },
        removeAllConnection: (state) => {
            state.connections = []
        },
        removeAllPendingRequest: (state) => {
            state.pendingRequests = []
        },
    }
});

export const {
    addConnection,
    addPendingRequest,
    removeAllConnection,
    removeAllPendingRequest
} = connectionSlice.actions;

export default connectionSlice.reducer;