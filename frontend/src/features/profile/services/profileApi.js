import axiosApi from '../../../services/axiosApi'
import { useSelector } from 'react-redux';

export const uploadImage = async (data) =>{
    try{
        const res = await axiosApi.post("/upload/image",data,{
            withCredentials: true
        });
        return res;
    }
    catch(err){
        throw err;
    }
} 

export const setUpProfileApi = async (userName,data) =>{
    try{
        const res = await axiosApi.patch(`/user/${userName}`,data);
        return res;
    }catch(err){
        throw err;
    }
}

export const addProjectApi = async (data) =>{
    try{
        const res = await axiosApi.post('/user/project',data);
        return res;
    }catch(err){
        throw err;
    }
}

export const getUserProfileApi = async (userName) =>{
    try{
        const res = await axiosApi.get(`/user/${userName}`);
        return res.data.data;
    }catch(err){
        throw err;
    }
}
