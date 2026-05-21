import axiosApi from "../../../services/axiosApi";

export const getCurUserProfile = async () =>{
     try{
        const res = await axiosApi.get('/user/myprofile');
        return res.data.data;
    }catch(err){
        throw err;
    }
}