import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '../app/features/slice/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import { showToast } from '../app/features/slice/uiSlice';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
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

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const result = await dispatch(registerUserThunk(formData)).unwrap();
            dispatch(showToast({ message: 'Registration successful!', type: 'success' }));

            // Redirect based on role
            if (result.user.role === 'customer') {
                navigate('/customer/dashboard');
            } else if (result.user.role === 'user') {
                navigate('/user/dashboard');
            }
        } catch (err) {
            dispatch(showToast({ message: err || 'Registration failed', type: 'error' }));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
        >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-kindle-500 to-kindle-600 rounded-2xl mb-4 shadow-lg text-white"
                    >
                        <BookOpenIcon className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join our community of book lovers</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
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
                    </div>

                    {/* Email */}
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
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
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

                    {/* Confirm Password */}
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

                    {/* Role Selection */}
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <label className="block text-sm font-semibold text-gray-700 mb-2.5 text-center">I want to...</label>
                        <div className="flex gap-3">
                            <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${formData.role === 'customer' ? 'bg-white border-kindle-500 shadow-sm text-kindle-600' : 'bg-transparent border-gray-200 text-gray-500 hover:bg-white/50'}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="customer"
                                    checked={formData.role === 'customer'}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="hidden"
                                />
                                <span className="text-sm font-bold">Buy Books</span>
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${formData.role === 'user' ? 'bg-white border-kindle-500 shadow-sm text-kindle-600' : 'bg-transparent border-gray-200 text-gray-500 hover:bg-white/50'}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={formData.role === 'user'}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="hidden"
                                />
                                <span className="text-sm font-bold">Sell Books</span>
                            </label>
                        </div>
                    </div>

                    {/* Error from Thunk */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium flex gap-2">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <Button type="submit" variant="primary" className="w-full py-3 bg-gradient-to-r from-kindle-500 to-kindle-600 shadow-md shadow-kindle-500/20" loading={loading}>
                        Create Account
                    </Button>
                </form>

                <div className="mt-8 text-center pt-6 border-t border-gray-100">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-kindle-600 hover:text-kindle-700 underline-offset-4 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default RegisterPage;
