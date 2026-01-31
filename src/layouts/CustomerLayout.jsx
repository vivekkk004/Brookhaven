import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from '../components/ui/AppSidebar';
import DashboardHeader from './DashboardHeader'; // We need to create this or use a placeholder

const CustomerLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AppSidebar
                role="customer"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 lg:ml-0 transition-all duration-300">
                <DashboardHeader
                    title="Customer Dashboard"
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CustomerLayout;
