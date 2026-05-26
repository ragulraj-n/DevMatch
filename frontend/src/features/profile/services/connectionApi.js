import axiosApi from "../../../services/axiosApi";

export const sendConnectionRequest = async (userId)=>{
    try{
        const res = await axiosApi.post(`/connections/requested/${userId}`);
        return res;
    }catch(err){
        throw err;
    }
}