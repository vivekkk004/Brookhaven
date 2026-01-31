import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import UserLayout from '../layouts/UserLayout';
import AuthLayout from '../layouts/AuthLayout';

// Route Protection
import RoleBaseRoute from './RoleRoute';
import PublicRoute from './PublicLayout';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import BooksPage from '../pages/BooksPage';
import BookDetailsPage from '../pages/BookDetailsPage';
import CartPage from '../pages/Cart/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

// Customer Pages
import CustomerDashboardPage from '../pages/customer/CustomerDashboardPage';
import OrdersPage from '../pages/customer/OrdersPage';
import OrderDetailsPage from '../pages/customer/OrderDetailsPage';
import WishlistPage from '../pages/customer/WishlistPage';
import ProfilePage from '../pages/customer/ProfilePage';
import ChatPage from '../pages/customer/ChatPage';

// Seller Pages
import UserDashboardPage from '../pages/user/UserDashboardPage';
import AddBookPage from '../pages/user/AddBookPage';
import MyListingsPage from '../pages/user/MyListingsPage';
import SellerOrdersPage from '../pages/user/SellerOrdersPage';
import EarningsPage from '../pages/user/EarningsPage';
import SellerChatPage from '../pages/user/SellerChatPage';
import SellerProfilePage from '../pages/user/SellerProfilePage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Explicit Auth Routes -  Top Level Priority */}
            <Route path="/login" element={
                <PublicRoute restricted={true}>
                    <AuthLayout />
                </PublicRoute>
            }>
                <Route index element={<LoginPage />} />
            </Route>

            <Route path="/register" element={
                <PublicRoute restricted={true}>
                    <AuthLayout />
                </PublicRoute>
            }>
                <Route index element={<RegisterPage />} />
            </Route>

            {/* Public Routes */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/:id" element={<BookDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

            {/* Customer Routes */}
            <Route path="/customer" element={
                <RoleBaseRoute allowedRoles={['customer']}>
                    <CustomerLayout />
                </RoleBaseRoute>
            }>
                <Route path="dashboard" element={<CustomerDashboardPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="orders/:id" element={<OrderDetailsPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route index element={<Navigate to="/customer/dashboard" replace />} />
            </Route>

            {/* Seller Routes */}
            <Route path="/user" element={
                <RoleBaseRoute allowedRoles={['user']}>
                    <UserLayout />
                </RoleBaseRoute>
            }>
                <Route path="dashboard" element={<UserDashboardPage />} />
                <Route path="add-book" element={<AddBookPage />} />
                <Route path="listings" element={<MyListingsPage />} />
                <Route path="orders" element={<SellerOrdersPage />} />
                <Route path="earnings" element={<EarningsPage />} />
                <Route path="chat" element={<SellerChatPage />} />
                <Route path="profile" element={<SellerProfilePage />} />
                <Route index element={<Navigate to="/user/dashboard" replace />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
