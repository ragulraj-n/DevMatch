import React, { useEffect, useState } from 'react'
import SearchUserCard from './SearchUserCard'
import { getSearchSuggestionApi } from '../services/navbarApi';

const SearchSuggestion = ({search,showSuggestion}) => {
    const [searchData,setSearchData] = useState([]);
    const limit = 5;
    
    useEffect(() => {
        if (search.length < 2) {
            setSearchData([]);
            return; 
        }

        const searchId = setTimeout(async () => {
            try {
                const data = await getSearchSuggestionApi(search, limit);
                setSearchData(data);
            } catch (error) {
                console.error("Search API failed:", error);
            }
        }, 300);

        return () => {
            clearTimeout(searchId);
        };
}, [search]);

  return (
    <div>{
        showSuggestion && searchData.length>0 && <div className='border-2 pb-2'>
            {
                searchData?.map((d)=>{
                    return <SearchUserCard user={d} key={d._id}/>
                })
            } 
        </div>
        }
    </div>
  )
}

export default SearchSuggestion
