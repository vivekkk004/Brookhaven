import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUserThunk } from '../app/features/slice/authSlice';

const DashboardHeader = ({ title, onMenuClick }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUserThunk());
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-1 -ml-1 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-xl font-semibold text-gray-800">{title || 'Dashboard'}</h1>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 hidden md:block">
                    Welcome, {user?.name}
                </span>
                <div className="w-8 h-8 rounded-full bg-kindle-100 flex items-center justify-center text-kindle-600 font-bold cursor-pointer">
                    {user?.name?.charAt(0) || 'U'}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;