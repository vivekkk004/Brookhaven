import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CurrencyDollarIcon,
    ShoppingBagIcon,
    BookOpenIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import Button from '../../components/ui/Button';
import AddBookModal from '../../components/user/AddBookModal';

const UserDashboardPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Mock User Data
    const userName = 'Vivek Store';
    const stats = [
        { label: 'Total Sales', value: '₹5,890', icon: <CurrencyDollarIcon className="w-6 h-6 text-green-600" />, change: '+12%', color: 'bg-green-100' },
        { label: 'Orders', value: '1,245', icon: <ShoppingBagIcon className="w-6 h-6 text-blue-600" />, change: '+5%', color: 'bg-blue-100' },
        { label: 'Books Listed', value: '342', icon: <BookOpenIcon className="w-6 h-6 text-purple-600" />, change: '+2', color: 'bg-purple-100' },
        { label: 'Conversion', value: '3.2%', icon: <ChartBarIcon className="w-6 h-6 text-yellow-600" />, change: '-0.1%', color: 'bg-yellow-100' },
    ];

    const recentOrders = [
        { id: '#IMG-2029', book: 'The Great Gatsby', price: '₹240.00', status: 'Pending' },
        { id: '#IMG-2028', book: 'Brief History of Time', price: '₹185.00', status: 'Shipped' },
        { id: '#IMG-2027', book: '1984', price: '₹120.00', status: 'Delivered' },
        { id: '#IMG-2026', book: 'Game of Thrones', price: '₹450.00', status: 'Delivered' },
    ];

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, {userName}! Here's what's happening today.</p>
                </div>
                <Button
                    variant="primary"
                    className="shadow-lg shadow-kindle-100"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Add New Book
                </Button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <span className={`flex items-center text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Revenue Analytics</h2>
                        <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1 outline-none">
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    {/* Mock Chart Area */}
                    <div className="h-64 flex items-end justify-between gap-2 px-4">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="w-full bg-kindle-50 rounded-t-lg relative group">
                                <div
                                    className="absolute bottom-0 w-full bg-kindle-500 rounded-t-lg transition-all duration-500 hover:bg-kindle-600"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${h * 10}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-400">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                        <Link to="/user/orders" className="text-sm text-kindle-600 font-medium hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.map((order, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-400">
                                        BK
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{order.book}</p>
                                        <p className="text-xs text-gray-500">{order.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900">{order.price}</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AddBookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default UserDashboardPage;
