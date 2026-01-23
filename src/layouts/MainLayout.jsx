import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Toast from '../components/ui/Toast';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-vintage-offWhite">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <Toast />
        </div>
    );
};

export default MainLayout;
