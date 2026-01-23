import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Button from '../../components/ui/Button';

// Mock Data (Replace with Redux/API later)
const mockOrders = [
    {
        id: 'ORD-12345-6789',
        date: '2024-01-20',
        total: 45.99,
        status: 'Shipped',
        items: [
            { title: 'The Great Gatsby', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800' },
            { title: '1984', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800' }
        ]
    },
    {
        id: 'ORD-98765-4321',
        date: '2024-01-15',
        total: 12.50,
        status: 'Delivered',
        items: [
            { title: 'To Kill a Mockingbird', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800' }
        ]
    },
    {
        id: 'ORD-54321-9876',
        date: '2024-01-10',
        total: 89.99,
        status: 'Processing',
        items: [
            { title: 'Pride and Prejudice', image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800' },
            { title: 'Moby Dick', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800' },
            { title: 'War and Peace', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800' }
        ]
    }
];

const OrdersPage = () => {
    const [filter, setFilter] = useState('All');
    const tabs = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredOrders = filter === 'All'
        ? mockOrders
        : mockOrders.filter(order => order.status === filter);

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-500">Track and manage your recent purchases</p>
                </div>
            </header>

            {/* Filters */}
            <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === tab
                            ? 'bg-kindle-500 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Order ID</p>
                                        <p className="font-mono font-medium text-gray-900">{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Date Placed</p>
                                        <p className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Total Amount</p>
                                        <p className="font-medium text-gray-900">₹{order.total}</p>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex -space-x-3 overflow-hidden">
                                        {order.items.slice(0, 4).map((item, i) => (
                                            <img
                                                key={i}
                                                className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover"
                                                src={item.image}
                                                alt={item.title}
                                                title={item.title}
                                            />
                                        ))}
                                        {order.items.length > 4 && (
                                            <div className="h-12 w-12 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                +{order.items.length - 4}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <Link to={`/customer/orders/${order.id}`}>
                                            <Button variant="secondary" className="w-full sm:w-auto flex items-center justify-center gap-2">
                                                View Details
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBagIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                        <p className="text-gray-500 mb-6">Looks like you haven't placed any orders in this category.</p>
                        <Link to="/books">
                            <Button variant="primary">Start Shopping</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
