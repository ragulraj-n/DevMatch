import React, { useEffect, useState } from 'react'
import FeedCardComponent from './FeedCardComponent'
import { getUserFeedApi } from '../services/feedApi';

const UserFeedComponenet = () => {
  const [userFeed,setUserFeed] = useState([]);
  const [page,setPage] = useState(1);
  const [limit,setLimit] = useState(1);
  const [index,setIndex] = useState(0);
  const fetchFeed = async () =>{
            const data = await getUserFeedApi();
            setUserFeed(data?.data?.data);
  }

  useEffect(()=>{
        fetchFeed();
    },[page])

    console.log(userFeed);
  return (
    <div className='flex h-screen justify-center items-center'>
        <FeedCardComponent user={userFeed[0]}/>
    </div>
  )
}

export default UserFeedComponenet
