import axiosApi from "../../../services/axiosApi";

export const getCurUserProfile = async () =>{
     try{
        const res = await axiosApi.get('/user/myprofile');
        return res.data.data;
    }catch(err){
        throw err;
    }
}

export const getSearchSuggestionApi = async (q,limit)=>{
    try{
        const res = await axiosApi.get(`/search/suggestion?q=${q}&limit=${limit}`);
        return res.data.data;
    }catch(err){
        throw err;
    }
}

export const logoutUserApi = async ()=>{
    try{
        const res = await axiosApi.post('/auth/logout');
        return res;
    }catch(err){
        throw err;
    }
}