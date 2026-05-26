import React, { useEffect, useState, useCallback } from 'react'
import FeedCardComponent from './FeedCardComponent'
import { getUserFeedApi } from '../services/feedApi';
import toast from 'react-hot-toast';

const UserFeedComponenet = () => {
  const [userFeed, setUserFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [fetching, setFetching] = useState(false);

  const fetchFeed = useCallback(async () => {
    if(fetching) return;
    if(!hasMore && page > 1) return;
    
    try{
      setFetching(true);
      if(page === 1) setLoading(true);
      
      const data = await getUserFeedApi(page, limit);
      const newUsers = data?.data?.data || [];
      
      if(newUsers.length === 0 || newUsers.length < limit){
        setHasMore(false);
      }
      
      if(page === 1){
        setUserFeed(newUsers);
      } else {
        setUserFeed(prev => [...prev, ...newUsers]);
      }
    }catch(err){
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to load feed");
      setHasMore(false);
    }finally{
      setLoading(false);
      setFetching(false);
    }
  }, [page, limit, hasMore, fetching]);

  useEffect(() => {
    fetchFeed();
  }, [page]);

  useEffect(() => {
    if(userFeed.length > 0 && index === userFeed.length - 1 && hasMore && !fetching){
      setPage(prev => prev + 1);
    }
  }, [index, userFeed.length, hasMore, fetching]);

  const handleReset = () => {
    setPage(1);
    setIndex(0);
    setUserFeed([]);
    setHasMore(true);
    setFetching(false);
  };

  if(loading && userFeed.length === 0){
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='flex flex-col justify-center items-center h-screen'>
          <div className='relative'>
            <div className='animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='h-8 w-8 bg-blue-600 rounded-full animate-pulse'></div>
            </div>
          </div>
          <p className='mt-6 text-gray-700 font-semibold text-lg'>Finding amazing developers...</p>
          <p className='text-gray-500 text-sm mt-2'>Please wait while we load your feed</p>
        </div>
      </div>
    )
  }

  if(!loading && userFeed.length === 0){
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='flex flex-col justify-center items-center h-screen px-4'>
          <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md text-center transform transition-all'>
            <div className='inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 mb-6'>
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>No profiles found</h2>
            <p className='text-gray-600 mb-6'>We couldn't find any developers to show right now.</p>
            <button 
              onClick={handleReset}
              className='px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md'
            >
              Refresh Feed
            </button>
          </div>
        </div>
      </div>
    )
  }

  if(!userFeed[index]){
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='flex flex-col justify-center items-center h-screen px-4'>
          <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md text-center'>
            <div className='inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 mb-6'>
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>All caught up! 🎉</h2>
            <p className='text-gray-600 mb-6'>You've viewed all available profiles. Check back later for more developers!</p>
            <button 
              onClick={handleReset}
              className='px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200'
            >
              Load Feed Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8'>
      <div className='container mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent'>
            Discover Developers
          </h1>
          <p className='text-gray-600 mt-2'>Connect with talented developers who match your interests</p>
        </div>
        
        <FeedCardComponent 
          user={userFeed[index]} 
          setIndex={setIndex} 
          userFeedLength={userFeed.length}
        />
        
        {fetching && page > 1 && (
          <div className='flex justify-center mt-8'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md'>
              <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600'></div>
              <span className='text-sm text-gray-600'>Loading more profiles...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserFeedComponenet