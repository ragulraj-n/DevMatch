import axiosApi from '../../../services/axiosApi'

export const loginApi = async (data) =>{
    try{
        const res = await axiosApi.post("/auth/login",data);
        return res;
    }catch(err){
        console.log(err);
    }
}

export const signupApi = async (data)=>{
    try{
        const res = await axiosApi.post("/auth/signup",data);
        return res;
    }catch(err){
        throw err;
    }
}