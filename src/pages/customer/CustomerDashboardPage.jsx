import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerOrders } from '../../app/features/slice/customerSlice';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';

const CustomerDashboardPage = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.customer);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchCustomerOrders());
    }, [dispatch]);

    const stats = [
        { label: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-blue-100 text-blue-600' },
        { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: '⏳', color: 'bg-yellow-100 text-yellow-600' },
        { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, icon: '✅', color: 'bg-green-100 text-green-600' },
    ];

    const getStatusVariant = (status) => {
        const variants = {
            pending: 'warning',
            accepted: 'primary',
            completed: 'success',
            rejected: 'error',
        };
        return variants[status] || 'default';
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600">Here's what's happening with your orders</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card hover={false}>
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center text-2xl`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Recent Orders */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Recent Orders</h2>

                {loading ? (
                    <Loader />
                ) : orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.slice(0, 5).map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card>
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={order.bookImage}
                                            alt={order.bookTitle}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">
                                                {order.bookTitle}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Order #{order.id} • {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-primary-600 mb-2">
                                                ${order.price}
                                            </p>
                                            <Badge variant={getStatusVariant(order.status)}>
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        }
                        title="No orders yet"
                        description="Start shopping to see your orders here"
                        action={() => window.location.href = '/books'}
                        actionLabel="Browse Books"
                    />
                )}
            </motion.div>
        </div>
    );
};

export default CustomerDashboardPage;
