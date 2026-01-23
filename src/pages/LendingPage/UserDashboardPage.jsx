import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyListings } from '../../app/features/slice/userSlice';
import { fetchOrders } from '../../app/features/slice/ordersSlice';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import { Link } from 'react-router-dom';

const UserDashboardPage = () => {
    const dispatch = useDispatch();
    const { myListings, loading: listingsLoading } = useSelector((state) => state.user);
    const { orders, stats } = useSelector((state) => state.orders);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchMyListings());
        dispatch(fetchOrders());
    }, [dispatch]);

    const dashboardStats = [
        { label: 'Total Listings', value: myListings.length, icon: '📚', color: 'bg-blue-100 text-blue-600', link: '/user/listings' },
        { label: 'Pending Orders', value: stats.pending, icon: '⏳', color: 'bg-yellow-100 text-yellow-600', link: '/user/orders' },
        { label: 'Completed', value: stats.completed, icon: '✅', color: 'bg-green-100 text-green-600', link: '/user/orders' },
        { label: 'Total Earnings', value: '$8,450', icon: '💰', color: 'bg-primary-100 text-primary-600', link: '/user/earnings' },
    ];

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
                <p className="text-gray-600">Manage your book listings and orders</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardStats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link to={stat.link}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
            >
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/user/add-book">
                        <Card className="hover:border-primary-500 border-2 border-transparent transition-all cursor-pointer">
                            <div className="text-center py-6">
                                <div className="text-5xl mb-3">➕</div>
                                <h3 className="font-semibold text-gray-900 mb-1">Add New Book</h3>
                                <p className="text-sm text-gray-600">List a new book for sale</p>
                            </div>
                        </Card>
                    </Link>

                    <Link to="/user/orders">
                        <Card className="hover:border-primary-500 border-2 border-transparent transition-all cursor-pointer">
                            <div className="text-center py-6">
                                <div className="text-5xl mb-3">📦</div>
                                <h3 className="font-semibold text-gray-900 mb-1">Manage Orders</h3>
                                <p className="text-sm text-gray-600">View and process orders</p>
                            </div>
                        </Card>
                    </Link>

                    <Link to="/user/chat">
                        <Card className="hover:border-primary-500 border-2 border-transparent transition-all cursor-pointer">
                            <div className="text-center py-6">
                                <div className="text-5xl mb-3">💬</div>
                                <h3 className="font-semibold text-gray-900 mb-1">Messages</h3>
                                <p className="text-sm text-gray-600">Chat with customers</p>
                            </div>
                        </Card>
                    </Link>
                </div>
            </motion.div>

            {/* Recent Listings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Recent Listings</h2>
                    <Link to="/user/listings" className="text-primary-600 hover:text-primary-700 font-medium">
                        View All →
                    </Link>
                </div>

                {listingsLoading ? (
                    <Loader />
                ) : myListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {myListings.slice(0, 3).map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card>
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <h3 className="font-serif font-bold text-gray-900 mb-2">{book.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-primary-600">${book.price}</span>
                                        <span className="text-sm text-gray-500">{book.stock} in stock</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <div className="text-center py-12">
                            <p className="text-gray-600 mb-4">You haven't added any books yet</p>
                            <Link to="/user/add-book" className="btn-primary">
                                Add Your First Book
                            </Link>
                        </div>
                    </Card>
                )}
            </motion.div>
        </div>
    );
};

export default UserDashboardPage;
