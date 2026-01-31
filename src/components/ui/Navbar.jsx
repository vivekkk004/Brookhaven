import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserThunk } from '../../app/features/slice/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import AuthModal from './AuthModal';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    const { items: cartItems } = useSelector((state) => state.cart);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
    const userMenuRef = useRef(null);

    const openLoginModal = () => {
        setAuthMode('login');
        setIsAuthModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const openSignupModal = () => {
        setAuthMode('register');
        setIsAuthModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = async () => {
        await dispatch(logoutUserThunk()).unwrap();
        navigate('/');
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
    };

    const getDashboardLink = () => {
        if (user?.role === 'customer') return '/customer/dashboard';
        if (user?.role === 'user') return '/user/dashboard';
        return '/';
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/books?search=${searchQuery}`);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <svg className="w-9 h-9 text-kindle-500 group-hover:text-kindle-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4.28-1.04-7.5-5.23-7.5-9.5V8.3l7.5-3.75 7.5 3.75v2.7c0 4.27-3.22 8.46-7.5 9.5zm-1-6.5h2v2h-2zm0-8h2v6h-2z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">
                            <span className="text-gray-900 group-hover:text-kindle-600 transition-colors">Book</span>
                            <span className="text-kindle-500 group-hover:text-kindle-600 transition-colors">Haven</span>
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <form onSubmit={handleSearch} className="w-full relative">
                            <input
                                type="text"
                                placeholder="Search for books, authors, or genres..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-5 py-2.5 pl-12 bg-gray-50 text-gray-900 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-kindle-500 focus:border-transparent focus:bg-white transition-all placeholder:text-gray-400"
                            />
                            <svg
                                className="absolute left-4 top-3 w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/books"
                            className="text-sm font-medium text-gray-700 hover:text-kindle-600 transition-colors relative group"
                        >
                            Browse
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-kindle-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>

                        {isAuthenticated && (
                            <>
                                <Link
                                    to={getDashboardLink()}
                                    className="text-sm font-medium text-gray-700 hover:text-kindle-600 transition-colors relative group"
                                >
                                    Library
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-kindle-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                {user?.role === 'customer' && (
                                    <Link
                                        to="/customer/wishlist"
                                        className="relative text-sm font-medium text-gray-700 hover:text-kindle-600 transition-colors group"
                                    >
                                        Wishlist
                                        {wishlistItems.length > 0 && (
                                            <span className="absolute -top-2 -right-4 bg-kindle-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                                {wishlistItems.length}
                                            </span>
                                        )}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-kindle-600 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* User Section */}
                    <div className="hidden md:flex items-center gap-3 ml-6">
                        {/* Cart Icon */}
                        <Link to="/cart" className="relative p-2 text-gray-700 hover:text-kindle-600 hover:bg-kindle-50 rounded-full transition-all">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-kindle-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-full transition-all border border-gray-200 hover:border-kindle-300"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-kindle-500 to-kindle-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium">{user?.name}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                            </div>
                                            <div className="py-1">
                                                <Link
                                                    to={getDashboardLink()}
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-kindle-50 hover:text-kindle-600 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                    </svg>
                                                    Dashboard
                                                </Link>
                                                {user?.role === 'customer' && (
                                                    <Link
                                                        to="/customer/wishlist"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-kindle-50 hover:text-kindle-600 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                        Wishlist
                                                    </Link>
                                                )}
                                            </div>
                                            <div className="border-t border-gray-100">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={openLoginModal}
                                    className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-kindle-600 transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={openSignupModal}
                                    className="px-5 py-2 bg-gradient-to-r from-kindle-500 to-kindle-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-kindle-500/30 transition-all text-center"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Cart Icon */}
                    <Link to="/cart" className="md:hidden relative p-2 mr-1 hover:bg-dark-800 rounded-full transition-colors text-gray-300">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartItems.length > 0 && (
                            <span className="absolute top-0 right-0 bg-kindle-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search books..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 pl-10 bg-white text-gray-900 rounded-md focus:outline-none"
                                />
                                <svg
                                    className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </form>

                            <Link
                                to="/books"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Browse Books
                            </Link>

                            <Link
                                to="/cart"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex justify-between items-center"
                            >
                                <span>Cart</span>
                                {cartItems.length > 0 && (
                                    <span className="bg-kindle-500 text-white text-xs rounded-full px-2 py-0.5">
                                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                    </span>
                                )}
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <div className="px-3 py-2 border-t border-gray-100 pt-3">
                                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Account</p>
                                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                    </div>

                                    <Link
                                        to={getDashboardLink()}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Library
                                    </Link>

                                    {user?.role === 'customer' && (
                                        <Link
                                            to="/customer/wishlist"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between"
                                        >
                                            <span>Wishlist</span>
                                            {wishlistItems.length > 0 && (
                                                <span className="bg-kindle-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                    {wishlistItems.length}
                                                </span>
                                            )}
                                        </Link>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                                    <button
                                        onClick={openLoginModal}
                                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={openSignupModal}
                                        className="px-3 py-2 bg-kindle-500 text-white rounded-md text-sm font-medium hover:bg-kindle-600 transition-colors"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Authentication Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialMode={authMode}
            />
        </nav>
    );
};

export default Navbar;
