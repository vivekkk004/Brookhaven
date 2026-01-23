import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // { bookId, book, quantity }
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { book, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item.bookId === book.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    bookId: book.id,
                    book,
                    quantity,
                });
            }

            // Calculate total
            state.total = state.items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
        },

        removeFromCart: (state, action) => {
            const bookId = action.payload;
            state.items = state.items.filter(item => item.bookId !== bookId);
            state.total = state.items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
        },

        updateQuantity: (state, action) => {
            const { bookId, quantity } = action.payload;
            const item = state.items.find(item => item.bookId === bookId);

            if (item && quantity > 0) {
                item.quantity = quantity;
                state.total = state.items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
