import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { searchUsersApi } from '../services/searchApi'
import { sendConnectionRequestApi } from '../../connection/services/userConnectionApi'
import { fetchAllConnectionData } from '../../connection/connectionActions'
import { FaSearch, FaUserPlus, FaSpinner, FaCheck, FaComment } from "react-icons/fa"
import { TbUserCircle } from "react-icons/tb"
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'

const SearchComponent = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [sendingRequest, setSendingRequest] = useState({})
    
    const currUser = useSelector(state => state.user.currentUser)
    const connections = useSelector(state => state.connection.connections)
    const pendingRequests = useSelector(state => state.connection.pendingRequests)

    useEffect(() => {
        if (query.trim()) {
            performSearch()
        }
    }, [query])

    const performSearch = async () => {
        if (!query.trim()) return
        
        try {
            setLoading(true)
            const response = await searchUsersApi(query, 5)
            setSearchResults(response.data || [])
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to search users")
            setSearchResults([])
        } finally {
            setLoading(false)
        }
    }

    const isConnected = (userId) => {
        return connections.some(conn => conn._id === userId)
    }

    const isRequestSent = (userId) => {
        return pendingRequests.some(req => req._id === userId)
    }

    const handleSendConnectionRequest = async (userId) => {
        if (!currUser) {
            toast.error("Please login to send connection requests")
            return
        }
        
        try {
            setSendingRequest(prev => ({ ...prev, [userId]: true }))
            await sendConnectionRequestApi("requested", userId)
            await dispatch(fetchAllConnectionData())
            toast.success("Connection request sent!")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to send request")
        } finally {
            setSendingRequest(prev => ({ ...prev, [userId]: false }))
        }
    }

    const handleSendMessage = (userId) => {
        console.log("Send message to:", userId)
        toast.success("Message feature coming soon!")
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const searchQuery = e.target.value.trim()
            if (searchQuery) {
                setSearchParams({ q: searchQuery })
            }
        }
    }

    const renderActionButton = (user) => {
        if (!currUser) return null
        
        if (currUser._id === user._id) return null
        
        if (isConnected(user._id)) {
            return (
                <button
                    className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2'
                    onClick={() => handleSendMessage(user._id)}
                >
                    <FaComment size={14} />
                    Message
                </button>
            )
        }
        
        if (isRequestSent(user._id)) {
            return (
                <button
                    className='px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold flex items-center gap-2 cursor-not-allowed'
                    disabled={true}
                >
                    <FaCheck size={14} />
                    Sent
                </button>
            )
        }
        
        return (
            <button
                className='px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50'
                onClick={() => handleSendConnectionRequest(user._id)}
                disabled={sendingRequest[user._id]}
            >
                {sendingRequest[user._id] ? (
                    <FaSpinner className='animate-spin' size={16} />
                ) : (
                    <FaUserPlus size={14} />
                )}
                Connect
            </button>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
            <div className='container mx-auto px-4 py-8'>
                <div className='w-4/5 mx-auto'>
                    <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5'>
                            <div className='flex items-center gap-3'>
                                <FaSearch className='text-2xl text-white' />
                                <h1 className='text-2xl font-bold text-white'>Search Developers</h1>
                            </div>
                            <p className='text-blue-100 text-sm mt-1'>Find and connect with developers</p>
                        </div>

                        <div className='p-6'>
                            <div className='relative mb-6'>
                                <FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                                <input
                                    type="text"
                                    className='w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-gray-50 transition-all duration-200'
                                    placeholder='Search by name, username, skills...'
                                    defaultValue={query}
                                    onKeyPress={handleSearch}
                                />
                            </div>

                            {loading ? (
                                <div className='flex justify-center items-center py-16'>
                                    <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600'></div>
                                </div>
                            ) : searchResults.length === 0 && query ? (
                                <div className='text-center py-16'>
                                    <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4'>
                                        <FaSearch className='text-3xl text-gray-400' />
                                    </div>
                                    <h3 className='text-lg font-semibold text-gray-700 mb-2'>No users found</h3>
                                    <p className='text-gray-500'>Try searching with different keywords</p>
                                </div>
                            ) : searchResults.length === 0 && !query ? (
                                <div className='text-center py-16'>
                                    <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4'>
                                        <FaSearch className='text-3xl text-gray-400' />
                                    </div>
                                    <h3 className='text-lg font-semibold text-gray-700 mb-2'>Search for developers</h3>
                                    <p className='text-gray-500'>Enter a name or username to find developers</p>
                                </div>
                            ) : (
                                <div className='space-y-4'>
                                    {searchResults.map((user) => (
                                        <div key={user._id} className='border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200'>
                                            <div className='flex flex-col md:flex-row gap-4'>
                                                <div className='flex-shrink-0'>
                                                    <img
                                                        src={user.profileImage?.imageUrl || "https://i.ibb.co/NnCS39LF/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission.jpg"}
                                                        className='w-16 h-16 rounded-full object-cover'
                                                        alt={user.firstName}
                                                    />
                                                </div>
                                                
                                                <div className='flex-1'>
                                                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
                                                        <div>
                                                            <Link to={`/u/${user.userName}`}>
                                                                <h3 className='font-bold text-lg text-gray-800 hover:text-blue-600 cursor-pointer transition-colors'>
                                                                    {user.firstName} {user.lastName}
                                                                </h3>
                                                            </Link>
                                                            <p className='text-sm text-gray-500'>@{user.userName}</p>
                                                            {user.bio && (
                                                                <p className='text-sm text-gray-600 mt-1 line-clamp-2'>{user.bio}</p>
                                                            )}
                                                        </div>
                                                        
                                                        <div className='flex gap-2'>
                                                            <Link to={`/u/${user.userName}`}>
                                                                <button className='px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2'>
                                                                    <TbUserCircle size={18} />
                                                                    View Profile
                                                                </button>
                                                            </Link>
                                                            
                                                            {renderActionButton(user)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchComponent