import { getConnectionsApi, getPendingRequestsApi } from './services/userConnectionApi'
import { addConnection, addPendingRequest } from './connectionSlice'

export const fetchAllConnections = () => async (dispatch) => {
    try {
        const connectionsRes = await getConnectionsApi()
        dispatch(addConnection(connectionsRes || []))
    } catch (error) {
        console.log("Failed to fetch connections:", error)
        dispatch(addConnection([]))
    }
}

export const fetchAllPendingRequests = () => async (dispatch) => {
    try {
        const pendingRes = await getPendingRequestsApi()
        dispatch(addPendingRequest(pendingRes || []))
    } catch (error) {
        console.log("Failed to fetch pending requests:", error)
        dispatch(addPendingRequest([]))
    }
}

export const fetchAllConnectionData = () => async (dispatch) => {
    await Promise.all([
        dispatch(fetchAllConnections()),
        dispatch(fetchAllPendingRequests())
    ])
}