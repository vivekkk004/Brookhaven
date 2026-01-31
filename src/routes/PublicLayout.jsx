import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children, restricted = false }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (isAuthenticated && restricted) {
        const redirectPath = user?.role === 'customer' ? '/customer/dashboard' : '/user/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default PublicRoute;
