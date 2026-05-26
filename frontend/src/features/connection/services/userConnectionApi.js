import axiosApi from "../../../services/axiosApi"


export const getPendingRequest = async () =>{
    try{
        const res = await axiosApi.get("/connections/requests");
        return res?.data?.data;
    }catch(err){
        throw err;
    }
}

export const getConnection = async ()=>{
    try{
        const res = await axiosApi.get("/connections");
        return res?.data?.data;
    }catch(err){
        throw err;
    }
}