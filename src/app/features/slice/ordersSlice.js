import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ordersService from '../../../services/ordersService';

// Async thunks
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ordersService.getOrders();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchOrderById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await ordersService.getOrderById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const acceptOrder = createAsyncThunk(
    'orders/acceptOrder',
    async (id, { rejectWithValue }) => {
        try {
            const response = await ordersService.acceptOrder(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const rejectOrder = createAsyncThunk(
    'orders/rejectOrder',
    async ({ id, reason }, { rejectWithValue }) => {
        try {
            const response = await ordersService.rejectOrder(id, reason);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await ordersService.updateOrderStatus(id, status);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    stats: {
        pending: 0,
        accepted: 0,
        rejected: 0,
        completed: 0,
    },
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        updateStats: (state) => {
            state.stats = {
                pending: state.orders.filter(o => o.status === 'pending').length,
                accepted: state.orders.filter(o => o.status === 'accepted').length,
                rejected: state.orders.filter(o => o.status === 'rejected').length,
                completed: state.orders.filter(o => o.status === 'completed').length,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Orders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                // Update stats
                state.stats = {
                    pending: action.payload.filter(o => o.status === 'pending').length,
                    accepted: action.payload.filter(o => o.status === 'accepted').length,
                    rejected: action.payload.filter(o => o.status === 'rejected').length,
                    completed: action.payload.filter(o => o.status === 'completed').length,
                };
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Order By ID
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Accept Order
            .addCase(acceptOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(acceptOrder.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(acceptOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Reject Order
            .addCase(rejectOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejectOrder.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(rejectOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Order Status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.orders.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentOrder, clearError, updateStats } = ordersSlice.actions;
export default ordersSlice.reducer;
