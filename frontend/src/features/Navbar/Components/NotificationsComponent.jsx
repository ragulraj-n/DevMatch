import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io"
import { Link } from 'react-router-dom'

const NotificationComponent = ({ setShowNotifications }) => {
    const notifications = []

    if (notifications.length === 0) {
        return (
            <div className='absolute top-14 -right-2 w-96 bg-white rounded-xl shadow-2xl overflow-hidden z-[100] border border-gray-100'>
                <div className='absolute -top-1 right-3 w-2.5 h-2.5 bg-white transform rotate-45 border-l border-t border-gray-100'></div>
                
                <div className='px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600'>
                    <div className='flex items-center gap-2'>
                        <IoMdNotificationsOutline className='text-white text-base' />
                        <h3 className='text-white font-semibold text-sm'>Notifications</h3>
                    </div>
                </div>
                
                <div className='p-6 text-center'>
                    <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3'>
                        <IoMdNotificationsOutline className='text-xl text-gray-400' />
                    </div>
                    
                    <h4 className='font-semibold text-gray-700 text-sm mb-1'>
                        All caught up!
                    </h4>
                    
                    <p className='text-xs text-gray-500 mb-3'>
                        No new notifications
                    </p>
                    
                    <div className='text-[11px] text-gray-400 space-y-0.5'>
                        <p>• Connection requests</p>
                        <p>• Profile interactions</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='absolute top-10 -right-2 w-80 bg-white rounded-xl shadow-2xl overflow-hidden z-[100] border border-gray-100'>
            <div className='absolute -top-1 right-3 w-2.5 h-2.5 bg-white transform rotate-45 border-l border-t border-gray-100'></div>
            
            <div className='px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <IoMdNotificationsOutline className='text-white text-base' />
                        <h3 className='text-white font-semibold text-sm'>Notifications</h3>
                    </div>
                    <span className='text-[10px] text-white/80'>New</span>
                </div>
            </div>
            
            <div className='max-h-80 overflow-y-auto'>
                {notifications.map((notification) => (
                    <div key={notification.id} className='p-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0'>
                        <div className='flex gap-2'>
                            <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0'>
                                {notification.icon}
                            </div>
                            <div className='flex-1 min-w-0'>
                                <p className='text-sm text-gray-700 line-clamp-2'>{notification.message}</p>
                                <p className='text-xs text-gray-400 mt-1'>{notification.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <Link to="/notifications">
                <div className='border-t border-gray-100 px-4 py-2 text-center hover:bg-gray-50 transition-colors cursor-pointer'>
                    <span className='text-xs text-blue-600 font-medium'>View all notifications</span>
                </div>
            </Link>
        </div>
    )
}

export default NotificationComponent