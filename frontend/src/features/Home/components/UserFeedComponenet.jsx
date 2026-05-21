import React, { useEffect, useState } from 'react'
import FeedCardComponent from './FeedCardComponent'
import { getUserFeedApi } from '../services/feedApi';
import SearchSuggestion from '../../Navbar/Components/SearchSuggestion';

const UserFeedComponenet = () => {
  const [userFeed,setUserFeed] = useState([]);
  const [page,setPage] = useState(1);
  const [limit,setLimit] = useState(2);
  const [index,setIndex] = useState(0);
  const fetchFeed = async () =>{
            const data = await getUserFeedApi(page,limit);
            const tempFeed = [...userFeed,...data?.data?.data];
            setUserFeed(tempFeed);
  }

  useEffect(()=>{
        fetchFeed();
    },[page])

  useEffect(()=>{
    if(userFeed.length>0 && userFeed.length-1===index){
      setPage(prev => prev+1);
    }
  },[index])

  return (
      <div className='flex h-screen justify-center items-center'>
          <FeedCardComponent user={userFeed[index]} setIndex={setIndex}/>
      </div>
  )
}

export default UserFeedComponenet
