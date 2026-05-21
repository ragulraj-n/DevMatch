import React, { useEffect, useState } from 'react'
import UserFeedComponenet from '../components/UserFeedComponenet'
import SearchSuggestion from '../../Navbar/Components/SearchSuggestion'

const FeedPage = () => {
    
  return (
    <div className='relative min-h-screen'>

      <div className='absolute -top-4 left-44 w-[383px] z-50 bg-gray-50'>
        <SearchSuggestion />
      </div>
        <UserFeedComponenet />
    </div>
  )
}

export default FeedPage
