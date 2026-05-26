import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCheck, FaUserPlus, FaClock, FaComment, FaTrash, FaUserMinus } from "react-icons/fa6"
import { MdMessage } from "react-icons/md"
import { TbUserCircle } from "react-icons/tb"
import toast from 'react-hot-toast'
import { getConnection, getPendingRequest } from '../services/userConnectionApi'
import { Link } from 'react-router-dom'

const ConnectionComponent = () => {
    const currUser = useSelector(state => state.user.currentUser)
    const [activeTab, setActiveTab] = useState('pending')
    const [pendingRequests, setPendingRequests] = useState([])
    const [connections, setConnections] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)

    useEffect(() => {
        fetchConnectionsData()
    }, [])

    const fetchConnectionsData = async () => {
        try {
            setLoading(true)
            const pendingRes = await getPendingRequest();
            const connectionRes = await getConnection();
            setPendingRequests(pendingRes)
            setConnections(connectionRes)
            
        } catch (error) {
            console.log(error)
            toast.error("Failed to load connections")
        } finally {
            setLoading(false)
        }
    }

    const handleAcceptRequest = async (requestId) => {
        try {
            setActionLoading(true)
            // You will implement API call here
            // await acceptConnectionRequestApi(requestId)
            toast.success("Connection request accepted")
            fetchConnectionsData()
        } catch (error) {
            toast.error("Failed to accept request")
        } finally {
            setActionLoading(false)
        }
    }

    const handleRejectRequest = async (requestId) => {
        try {
            setActionLoading(true)
            // You will implement API call here
            // await rejectConnectionRequestApi(requestId)
            toast.success("Connection request rejected")
            fetchConnectionsData()
        } catch (error) {
            toast.error("Failed to reject request")
        } finally {
            setActionLoading(false)
        }
    }

    const handleRemoveConnection = async (connectionId) => {
        try {
            setActionLoading(true)
            // You will implement API call here
            // await removeConnectionApi(connectionId)
            toast.success("Connection removed")
            fetchConnectionsData()
        } catch (error) {
            toast.error("Failed to remove connection")
        } finally {
            setActionLoading(false)
        }
    }

    const handleSendMessage = (userId) => {
        // You will implement message functionality
        console.log("Send message to:", userId)
    }

    const handleViewProfile = (userName) => {
        // Navigate to profile
        console.log("View profile:", userName)
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
                <div className='container mx-auto px-4 py-8'>
                    <div className='w-4/5 mx-auto'>
                        <div className='bg-white rounded-2xl shadow-xl p-8'>
                            <div className='flex justify-center items-center h-64'>
                                <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
            <div className='container mx-auto px-4 py-8'>
                <div className='w-4/5 mx-auto'>
                    <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5'>
                            <h1 className='text-2xl font-bold text-white'>Connections</h1>
                            <p className='text-blue-100 text-sm mt-1'>Manage your network and connection requests</p>
                        </div>

                        <div className='border-b border-gray-200'>
                            <div className='flex'>
                                
                                <button
                                    className={`px-6 py-3 font-semibold transition-all duration-200 relative ${
                                        activeTab === 'connections'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('connections')}
                                >
                                    My Connections
                                    {connections.length > 0 && (
                                        <span className='ml-2 px-2 py-0.5 text-xs bg-gray-400 text-white rounded-full'>
                                            {connections.length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    className={`px-6 py-3 font-semibold transition-all duration-200 relative ${
                                        activeTab === 'pending'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('pending')}
                                >
                                    Pending Requests
                                    {pendingRequests.length > 0 && (
                                        <span className='ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full'>
                                            {pendingRequests.length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className='p-6'>
                            {activeTab === 'pending' && (
                                <>
                                    {pendingRequests.length === 0 ? (
                                        <div className='text-center py-12'>
                                            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4'>
                                                <FaUserPlus className='text-3xl text-gray-400' />
                                            </div>
                                            <h3 className='text-lg font-semibold text-gray-700 mb-2'>No pending requests</h3>
                                            <p className='text-gray-500'>When someone sends you a connection request, it will appear here</p>
                                        </div>
                                    ) : (
                                        <div className='space-y-4'>
                                            {pendingRequests.map((request) => (
                                                <div key={request._id} className='border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200'>
                                                    <div className='flex flex-col md:flex-row gap-4'>
                                                        <div className='flex-shrink-0'>
                                                            <img
                                                                src={request.fromUserId?.profileImage?.imageUrl}
                                                                className='w-16 h-16 rounded-full object-cover'
                                                                alt={request.firstName}
                                                            />
                                                        </div>
                                                        
                                                        <div className='flex-1'>
                                                            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
                                                                <Link to={`/u/${request.fromUserId.userName}`}>
                                                                    <div>
                                                                        <h3 
                                                                            className='font-bold text-lg text-gray-800 hover:text-blue-600 cursor-pointer transition-colors'
                                                                            onClick={() => handleViewProfile(request.userName)}
                                                                        >
                                                                            {request.fromUserId.firstName} {request.fromUserId.lastName}
                                                                        </h3>
                                                                        <p className='text-sm text-gray-500'>@{request.fromUserId.userName}</p>
                                                                    </div>
                                                                </Link>
                                                                
                                                                <div className='flex gap-2'>
                                                                    <button
                                                                        className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50'
                                                                        onClick={() => handleAcceptRequest(request._id)}
                                                                        disabled={actionLoading}
                                                                    >
                                                                        <FaUserCheck size={16} />
                                                                        Accept
                                                                    </button>
                                                                    <button
                                                                        className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50'
                                                                        onClick={() => handleRejectRequest(request._id)}
                                                                        disabled={actionLoading}
                                                                    >
                                                                        <FaUserMinus size={16} />
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

                            {activeTab === 'connections' && (
                                <>
                                    {connections.length === 0 ? (
                                        <div className='text-center py-12'>
                                            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4'>
                                                <FaUserCheck className='text-3xl text-gray-400' />
                                            </div>
                                            <h3 className='text-lg font-semibold text-gray-700 mb-2'>No connections yet</h3>
                                            <p className='text-gray-500'>Connect with developers to grow your network</p>
                                        </div>
                                    ) : (
                                        <div className='space-y-4'>
                                            {connections.map((connection) => (
                                                <div key={connection._id} className='border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200'>
                                                    <div className='flex flex-col md:flex-row gap-4'>
                                                        <div className='flex-shrink-0'>
                                                            <img
                                                                src={connection.profileImage?.imageUrl || "https://i.ibb.co/NnCS39LF/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission.jpg"}
                                                                className='w-16 h-16 rounded-full object-cover'
                                                                alt={connection.firstName}
                                                            />
                                                        </div>
                                                        
                                                        <div className='flex-1'>
                                                            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3'>
                                                                <div>
                                                                    <h3 
                                                                        className='font-bold text-lg text-gray-800 hover:text-blue-600 cursor-pointer transition-colors'
                                                                        onClick={() => handleViewProfile(connection.userName)}
                                                                    >
                                                                        {connection.firstName} {connection.lastName}
                                                                    </h3>
                                                                    <p className='text-sm text-gray-500'>@{connection.userName}</p>
                                                                    {connection.bio && (
                                                                        <p className='text-sm text-gray-600 mt-1 line-clamp-2'>{connection.bio}</p>
                                                                    )}
                                                                    {connection.connectedSince && (
                                                                        <p className='text-xs text-gray-400 mt-2'>
                                                                            Connected since {new Date(connection.connectedSince).toLocaleDateString()}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                
                                                                <div className='flex gap-2'>
                                                                    <button
                                                                        className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2'
                                                                        onClick={() => handleSendMessage(connection._id)}
                                                                    >
                                                                        <MdMessage size={18} />
                                                                        Message
                                                                    </button>
                                                                    <button
                                                                        className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2'
                                                                        onClick={() => handleRemoveConnection(connection._id)}
                                                                    >
                                                                        <FaTrash size={14} />
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            
                                                            {connection.skills && connection.skills.length > 0 && (
                                                                <div className='flex flex-wrap gap-2 mt-3'>
                                                                    {connection.skills.slice(0, 4).map((skill, idx) => (
                                                                        <span key={idx} className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full'>
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                    {connection.skills.length > 4 && (
                                                                        <span className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full'>
                                                                            +{connection.skills.length - 4}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectionComponent