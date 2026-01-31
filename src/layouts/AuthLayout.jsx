import { Outlet } from 'react-router-dom';
import Toast from '../components/ui/Toast';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Content Area */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 pt-8">
                <Outlet />
            </main>

            <Footer />

            {/* Toast for notifications */}
            <Toast />
        </div>
    );
};

export default AuthLayout;
