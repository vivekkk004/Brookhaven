import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as customerService from '../../../services/customerService';

// Async thunks
export const fetchCustomerOrders = createAsyncThunk(
    'customer/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await customerService.getCustomerOrders();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCustomerProfile = createAsyncThunk(
    'customer/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await customerService.getCustomerProfile();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCustomerProfile = createAsyncThunk(
    'customer/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await customerService.updateCustomerProfile(profileData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const placeOrder = createAsyncThunk(
    'customer/placeOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await customerService.placeOrder(orderData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    profile: null,
    orders: [],
    loading: false,
    error: null,
    orderPlaced: false,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        clearOrderPlaced: (state) => {
            state.orderPlaced = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Customer Orders
            .addCase(fetchCustomerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchCustomerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Customer Profile
            .addCase(fetchCustomerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchCustomerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Customer Profile
            .addCase(updateCustomerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCustomerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(updateCustomerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Place Order
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderPlaced = false;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderPlaced = true;
                state.orders.unshift(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.orderPlaced = false;
            });
    },
});

export const { clearOrderPlaced, clearError } = customerSlice.actions;
export default customerSlice.reducer;
