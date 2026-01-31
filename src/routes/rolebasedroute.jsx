import React from 'react';
import { Navigate } from 'react-router-dom';

// Public Pages
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

// User (Seller) Pages
import UserDashboardPage from '../pages/user/UserDashboardPage';
import AddBookPage from '../pages/user/AddBookPage';
import MyListingsPage from '../pages/user/MyListingsPage';
import SellerOrdersPage from '../pages/user/SellerOrdersPage';
import EarningsPage from '../pages/user/EarningsPage';
import SellerChatPage from '../pages/user/SellerChatPage';
import SellerProfilePage from '../pages/user/SellerProfilePage';

export const authRoutes = [
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
];

export const publicRoutes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/books',
        element: <BooksPage />
    },
    {
        path: '/books/:id',
        element: <BookDetailsPage />
    },
    {
        path: '/cart',
        element: <CartPage />
    },
    {
        path: '/checkout',
        element: <CheckoutPage />
    }
];

export const customerRoutes = [
    {
        path: 'dashboard', // Relative path
        element: <CustomerDashboardPage />
    },
    {
        path: 'orders',
        element: <OrdersPage />
    },
    {
        path: 'orders/:id',
        element: <OrderDetailsPage />
    },
    {
        path: 'wishlist',
        element: <WishlistPage />
    },
    {
        path: 'profile',
        element: <ProfilePage />
    },
    {
        path: 'chat',
        element: <ChatPage />
    },
    {
        index: true, // Use index route
        element: <Navigate to="/customer/dashboard" replace />
    }
];

export const sellerRoutes = [
    {
        path: 'dashboard',
        element: <UserDashboardPage />
    },
    {
        path: 'add-book',
        element: <AddBookPage />
    },
    {
        path: 'listings',
        element: <MyListingsPage />
    },
    {
        path: 'orders',
        element: <SellerOrdersPage />
    },
    {
        path: 'earnings',
        element: <EarningsPage />
    },
    {
        path: 'chat',
        element: <SellerChatPage />
    },
    {
        path: 'profile',
        element: <SellerProfilePage />
    },
    {
        index: true,
        element: <Navigate to="/user/dashboard" replace />
    }
];
