import axiosApi from "../../../services/axiosApi"


export const getUserFeedApi = async () =>{
   try{
     const res = await axiosApi.get("/feed");
     return res;
   }catch(err){
    throw err;
   }
}
