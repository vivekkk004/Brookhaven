import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../app/features/slice/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import { showToast } from '../app/features/slice/uiSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await dispatch(login(formData)).unwrap();
            dispatch(showToast({ message: 'Login successful!', type: 'success' }));

            // Redirect based on role
            if (result.user.role === 'customer') {
                navigate('/customer/dashboard');
            } else if (result.user.role === 'user') {
                navigate('/user/dashboard');
            }
        } catch (err) {
            dispatch(showToast({ message: err || 'Login failed', type: 'error' }));
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
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-kindle-500 to-kindle-600 rounded-2xl mb-4 shadow-lg"
                    >
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4.28-1.04-7.5-5.23-7.5-9.5V8.3l7.5-3.75 7.5 3.75v2.7c0 4.27-3.22 8.46-7.5 9.5zm-1-6.5h2v2h-2zm0-8h2v6h-2z" />
                        </svg>
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                    <p className="text-gray-600">Sign in to continue your book journey</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="your@email.com"
                                required
                                className="w-full pl-10 pr-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kindle-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400 shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                                required
                                className="w-full pl-10 pr-12 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-kindle-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400 shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-kindle-600 border-gray-300 rounded focus:ring-kindle-500 border"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm font-medium text-kindle-600 hover:text-kindle-700">
                            Forgot password?
                        </a>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
                        >
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-3 text-base font-semibold bg-gradient-to-r from-kindle-500 to-kindle-600 hover:from-kindle-600 hover:to-kindle-700 shadow-lg shadow-kindle-500/30"
                        loading={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-center text-gray-900 text-sm font-semibold mb-3">
                        🎯 Demo Credentials
                    </p>
                    <div className="text-xs text-gray-700 space-y-2">
                        <div className="flex justify-between items-center p-2.5 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <span className="font-semibold text-gray-900">Customer:</span>
                            <span>customer@example.com / password</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <span className="font-semibold text-gray-900">Seller:</span>
                            <span>seller@example.com / password</span>
                        </div>
                    </div>
                </div>

                {/* Sign Up Link */}
                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-kindle-600 hover:text-kindle-700 underline-offset-4 hover:underline">
                            Create one now
                        </Link>
                    </p>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-gray-500 font-medium">
                <div className="flex items-center gap-1.5 grayscale opacity-70">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure Login
                </div>
                <div className="flex items-center gap-1.5 grayscale opacity-70">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Privacy Protected
                </div>
            </div>
        </motion.div>
    );
};

export default LoginPage;
