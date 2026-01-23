import { Link, Outlet } from 'react-router-dom';
import Toast from '../components/ui/Toast';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Simple Auth Header */}
            <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <svg className="w-8 h-8 text-kindle-500 group-hover:text-kindle-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18.5c-4.28-1.04-7.5-5.23-7.5-9.5V8.3l7.5-3.75 7.5 3.75v2.7c0 4.27-3.22 8.46-7.5 9.5zm-1-6.5h2v2h-2zm0-8h2v6h-2z" />
                        </svg>
                        <span className="text-xl font-bold tracking-tight">
                            <span className="text-gray-900 group-hover:text-kindle-600 transition-colors">Book</span>
                            <span className="text-kindle-500 group-hover:text-kindle-600 transition-colors">Haven</span>
                        </span>
                    </Link>
                    <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <Outlet />
            </main>

            {/* Toast for notifications */}
            <Toast />
        </div>
    );
};

export default AuthLayout;
