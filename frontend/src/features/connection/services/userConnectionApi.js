import axiosApi from "../../../services/axiosApi";

export const sendConnectionRequestApi = async (status, userId) => {
    try{
        const res = await axiosApi.post(`/connections/${status}/${userId}`);
        return res;
    }catch(err){
        throw err;
    }
}

export const handleConnectionRequestApi = async (status, requestId) => {
    try{
        const res = await axiosApi.patch(`/connections/${requestId}/${status}`);
        return res;
    }catch(err){
        throw err;
    }
}

export const removeConnectionApi = async (connectionId) => {
    try{
        const res = await axiosApi.delete(`/connections/${connectionId}`);
        return res;
    }catch(err){
        throw err;
    }
}

export const getPendingRequestsApi = async () => {
    try{
        const res = await axiosApi.get("/connections/requests");
        return res?.data?.data;
    }catch(err){
        throw err;
    }
}

export const getConnectionsApi = async () => {
    try{
        const res = await axiosApi.get("/connections");
        return res?.data?.data;
    }catch(err){
        throw err;
    }
}