import axiosApi from "../../../services/axiosApi";

export const sendConnectionRequest = async (userId)=>{
    try{
        const res = await axiosApi.post(`/connections/requested/${userId}`);
        return res;
    }catch(err){
        throw err;
    }
}

export const handleConnectionRequestApi = async (status,requestId) =>{
    try{
        const res = await axiosApi.patch(`/connections/${requestId}/${status}`);
        return res;
    }catch(err){
        throw err;
    }
}

export const removeConnectionApi = async (connectionId) =>{
    try{
        const res = await axiosApi.delete(`connections/${connectionId}`);
        return res;
    }catch(err){
        throw err;
    }
}