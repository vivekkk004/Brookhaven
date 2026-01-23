import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/slice/authSlice';
import booksReducer from './features/slice/booksSlice';
import customerReducer from './features/slice/customerSlice';
import userReducer from './features/slice/userSlice';
import ordersReducer from './features/slice/ordersSlice';
import wishlistReducer from './features/slice/wishlistSlice';
import chatReducer from './features/slice/chatSlice';
import reviewsReducer from './features/slice/reviewsSlice';
import uiReducer from './features/slice/uiSlice';
import cartReducer from './features/slice/cartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer,
        customer: customerReducer,
        user: userReducer,
        orders: ordersReducer,
        wishlist: wishlistReducer,
        chat: chatReducer,
        reviews: reviewsReducer,
        ui: uiReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['your/action/type'],
            },
        }),
});

export default store;
