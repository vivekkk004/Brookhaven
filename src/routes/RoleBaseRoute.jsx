import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleBaseRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user?.role)) {
        // Redirect to legitimate dashboard if role doesn't match
        const redirectPath = user?.role === 'customer' ? '/customer/dashboard' : '/user/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default RoleBaseRoute;
