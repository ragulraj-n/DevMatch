import axiosApi from '../../../services/axiosApi'

export const loginApi = async (data) =>{
    try{
        const res = await axiosApi.post("/auth/login",data);
        return res;
    }catch(err){
        throw err;
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

export const forgetPasswordApi = async (data)=>{
    try{
        const res = await axiosApi.post("/auth/forgot-password",data);
        return res;
    }catch(err){
        throw err;
    }
}


export const validateResetTokenApi = async (token) => {
    try{
        const res = await axiosApi.post("/auth/reset-password/validate", { token });
        console.log(res);
        return res;
    }catch(err){
        throw err;
    }
}

export const resetPasswordApi = async (token, password) => {
    try{
        const res = await axiosApi.post("/auth/reset-password", { token, password });
        return res;
    }catch(err){
        throw err;
    }
}