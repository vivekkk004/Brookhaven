import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import AppSidebar from '../components/ui/AppSidebar';
import Toast from '../components/ui/Toast';
import { Bars3Icon } from '@heroicons/react/24/outline';

const CustomerLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="flex-1 flex max-w-[1920px] mx-auto w-full relative">
                {/* Reusable AppSidebar for Customer Role */}
                <AppSidebar
                    role="customer"
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Mobile Sidebar Toggle Button (Sticky) */}
                <div className="lg:hidden sticky top-[60px] z-30 bg-white border-b border-gray-200 px-4 py-2 flex items-center shadow-sm w-full">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                    <span className="ml-2 font-semibold text-gray-700">Menu</span>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0 p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>

            <Toast />
        </div>
    );
};

export default CustomerLayout;
