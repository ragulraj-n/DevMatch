import axiosApi from '../../../services/axiosApi'

export const uploadImage = async (data) =>{
    try{
        const res = await axiosApi.post("/upload/image",data,{
            withCredentials: true
        });
        return res;
    }
    catch(err){
        console.log(err);
    }
} 
