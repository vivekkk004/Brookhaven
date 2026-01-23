import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, CheckCircleIcon, XCircleIcon, TruckIcon } from '@heroicons/react/24/outline';
import Button from '../../components/ui/Button';

// Mock Orders Data
const mockOrders = [
    {
        id: 'ORD-8855',
        customer: 'Alice Johnson',
        date: '2024-01-21',
        total: 24.99,
        status: 'Pending',
        items: [{ title: 'The Great Gatsby', quantity: 1, price: 15.99 }]
    },
    {
        id: 'ORD-8854',
        customer: 'Bob Smith',
        date: '2024-01-20',
        total: 12.50,
        status: 'Processing',
        items: [{ title: '1984', quantity: 1, price: 12.50 }]
    },
    {
        id: 'ORD-8853',
        customer: 'Charlie Brown',
        date: '2024-01-19',
        total: 45.00,
        status: 'Shipped',
        items: [
            { title: 'The Hobbit', quantity: 1, price: 25.00 },
            { title: 'Harry Potter', quantity: 1, price: 20.00 }
        ]
    },
];

const SellerOrdersPage = () => {
    const [orders, setOrders] = useState(mockOrders);
    const [filter, setFilter] = useState('All');

    const handleAction = (id, newStatus) => {
        setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    };

    const StatusBadge = ({ status }) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Processing': 'bg-blue-100 text-blue-700 border-blue-200',
            'Shipped': 'bg-purple-100 text-purple-700 border-purple-200',
            'Relivered': 'bg-green-100 text-green-700 border-green-200',
            'Cancelled': 'bg-red-100 text-red-700 border-red-200',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    };

    const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-500">Manage and fulfill your customer orders</p>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Pending', count: orders.filter(o => o.status === 'Pending').length, color: 'text-yellow-600 bg-yellow-50' },
                    { label: 'To Ship', count: orders.filter(o => o.status === 'Processing').length, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Completed', count: orders.filter(o => o.status === 'Relivered').length, color: 'text-green-600 bg-green-50' },
                    { label: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length, color: 'text-red-600 bg-red-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{stat.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${stat.color.split(' ')[0]}`}>{stat.count}</p>
                    </div>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-100 p-2 rounded-lg text-gray-500 font-mono text-sm">
                                        #{order.id}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.customer}</p>
                                        <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">₹{order.total.toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">{order.items.length} item(s)</p>
                                    </div>
                                    <StatusBadge status={order.status} />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1 space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span className="text-gray-700">{item.quantity}x {item.title}</span>
                                            <span className="text-gray-900 font-medium">₹{item.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-2 md:w-auto md:flex-col md:items-end md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                    {order.status === 'Pending' && (
                                        <>
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700 text-white w-full md:w-32 flex justify-center items-center gap-2"
                                                onClick={() => handleAction(order.id, 'Processing')}
                                            >
                                                <CheckCircleIcon className="w-4 h-4" /> Accept
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full md:w-32 flex justify-center items-center gap-2"
                                                onClick={() => handleAction(order.id, 'Cancelled')}
                                            >
                                                <XCircleIcon className="w-4 h-4" /> Reject
                                            </Button>
                                        </>
                                    )}
                                    {order.status === 'Processing' && (
                                        <Button
                                            size="sm"
                                            className="bg-kindle-500 hover:bg-kindle-600 text-white w-full md:w-32 flex justify-center items-center gap-2"
                                            onClick={() => handleAction(order.id, 'Shipped')}
                                        >
                                            <TruckIcon className="w-4 h-4" /> Ship Order
                                        </Button>
                                    )}
                                    {(order.status === 'Shipped' || order.status === 'Cancelled') && (
                                        <span className="text-sm text-gray-500 italic">No actions available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellerOrdersPage;
