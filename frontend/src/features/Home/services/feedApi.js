import axiosApi from "../../../services/axiosApi"


export const getUserFeedApi = async (page,limit) =>{
   try{
     const res = await axiosApi.get(`/feed?page=${page}&limit=${limit}`);
     return res;
   }catch(err){
    throw err;
   }
}

export const sendConnectionRequest = async (status,userId)=>{
    try{
        const res = await axiosApi.post(`/connections/${status}/${userId}`);
        return res;
    }catch(err){
        throw err;
    }
}
