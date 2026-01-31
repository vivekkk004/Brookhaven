import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../app/features/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    XMarkIcon,
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon,
    EyeIcon,
    EyeSlashIcon,
    BookOpenIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Button from './Button';
import { showToast } from '../../app/features/slice/uiSlice';
import Modal from './Modal';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [mode, setMode] = useState(initialMode); // 'login' or 'register'
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (mode === 'register') {
            if (!formData.name) newErrors.name = 'Name is required';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            // For now, only replacing login action since register is not yet refactored in slice
            // If register is needed, we should add registerUserThunk to slice or handle it.
            // Assuming for now user only hits login based on context or we use loginUserThunk generic.

            if (mode === 'register') {
                dispatch(showToast({ message: "Registration not fully implemented in this refactor yet.", type: "warning" }));
                return;
            }

            const result = await dispatch(loginUserThunk({
                email: formData.email,
                password: formData.password
            })).unwrap();

            dispatch(showToast({
                message: 'Login successful!',
                type: 'success'
            }));

            onClose(); // Close modal

            // Redirect based on role
            const role = result?.role || result?.user?.role;
            if (role === 'customer') {
                navigate('/customer/dashboard');
            } else if (role === 'user' || role === 'seller') {
                navigate('/user/dashboard');
            } else {
                navigate('/customer/dashboard');
            }
        } catch (err) {
            dispatch(showToast({
                message: err || 'Login failed',
                type: 'error'
            }));
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'customer',
        });
        setErrors({});
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <div className="relative p-2">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-1 -right-1 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        key={mode}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-kindle-500 to-kindle-600 rounded-2xl mb-4 shadow-lg shadow-kindle-500/20 text-white"
                    >
                        {mode === 'login' ? <ShieldCheckIcon className="w-8 h-8" /> : <BookOpenIcon className="w-8 h-8" />}
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        {mode === 'login'
                            ? 'Sign in to access your library'
                            : 'Join our community of book lovers'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence mode="wait">
                        {mode === 'register' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <UserIcon className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-kindle-500 focus:border-transparent transition-all outline-none ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                    />
                                </div>
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <EnvelopeIcon className="h-5 w-5" />
                            </div>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="your@email.com"
                                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-kindle-500 focus:border-transparent transition-all outline-none ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1.5">
                            <label className="text-sm font-semibold text-gray-700">Password</label>
                            {mode === 'login' && (
                                <button type="button" className="text-xs font-medium text-kindle-600 hover:text-kindle-700 transition-colors">
                                    Forgot password?
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <LockClosedIcon className="h-5 w-5" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-kindle-500 focus:border-transparent transition-all outline-none ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                    </div>

                    <AnimatePresence mode="wait">
                        {mode === 'register' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <LockClosedIcon className="h-5 w-5" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            placeholder="••••••••"
                                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-kindle-500 focus:border-transparent transition-all outline-none ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                                </div>

                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2.5 text-center">I want to...</label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: 'customer' })}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${formData.role === 'customer' ? 'bg-white border-kindle-500 shadow-sm text-kindle-600' : 'bg-transparent border-gray-200 text-gray-500 hover:bg-white/50'}`}
                                        >
                                            Buy Books
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: 'user' })}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${formData.role === 'user' ? 'bg-white border-kindle-500 shadow-sm text-kindle-600' : 'bg-transparent border-gray-200 text-gray-500 hover:bg-white/50'}`}
                                        >
                                            Sell Books
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium flex gap-2">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-3 bg-gradient-to-r from-kindle-500 to-kindle-600 shadow-md shadow-kindle-500/20 text-base font-bold"
                        loading={loading}
                    >
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>
                </form>

                {/* Demo Credentials */}
                {mode === 'login' && (
                    <div className="mt-4 p-3 bg-kindle-50 rounded-xl border border-kindle-100">
                        <p className="text-[10px] font-bold text-kindle-700 uppercase tracking-wider mb-2 text-center">Quick Demo Access</p>
                        <div className="grid grid-cols-1 gap-1.5">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, email: 'customer@example.com', password: 'password' })}
                                className="text-[11px] text-kindle-800 bg-white/60 hover:bg-white py-1.5 px-3 rounded-lg border border-kindle-200 transition-colors text-left flex justify-between items-center group"
                            >
                                <span>Customer account</span>
                                <span className="text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Click to fill</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, email: 'seller@example.com', password: 'password' })}
                                className="text-[11px] text-kindle-800 bg-white/60 hover:bg-white py-1.5 px-3 rounded-lg border border-kindle-200 transition-colors text-left flex justify-between items-center group"
                            >
                                <span>Seller account</span>
                                <span className="text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Click to fill</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Link */}
                <div className="mt-6 text-center pt-4 border-t border-gray-100">
                    <p className="text-gray-600 text-sm">
                        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button
                            type="button"
                            onClick={switchMode}
                            className="font-bold text-kindle-600 hover:text-kindle-700 underline-offset-4 hover:underline"
                        >
                            {mode === 'login' ? 'Create one now' : 'Sign in instead'}
                        </button>
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default AuthModal;
