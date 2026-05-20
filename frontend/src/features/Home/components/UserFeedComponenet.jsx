import React, { useEffect, useState } from 'react'
import FeedCardComponent from './FeedCardComponent'
import { getUserFeedApi } from '../services/feedApi';

const UserFeedComponenet = () => {
  const [userFeed,setUserFeed] = useState([]);
    
    useEffect(()=>{
        const fetchFeed = async () =>{
            const data = await getUserFeedApi();
            setUserFeed(data?.data?.data);
        }
        fetchFeed();
    },[])
    console.log(userFeed);
  return (
    <div className='flex h-screen justify-center items-center'>
        <FeedCardComponent user={userFeed[0]}/>
    </div>
  )
}

export default UserFeedComponenet
