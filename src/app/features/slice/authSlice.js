import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser, fetchCurrentUser, registerUser } from '../../../services/authService';
import Cookies from 'js-cookie';

// Async Thunks
export const loginUserThunk = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await loginUser(email, password);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUserThunk = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerUser(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUserThunk = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await logoutUser();
            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCurrentUserThunk = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetchCurrentUser(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    accessToken: Cookies.get('accessToken') || null,
    isAuthenticated: !!Cookies.get('accessToken'),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        // To verify auth on app load if needed
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        performLogout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            Cookies.remove('role');
            Cookies.remove('userid');
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Contains role, email, etc.
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register
            .addCase(registerUserThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true; // Assuming auto-login
                state.user = action.payload;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
            });
    },
});

export const { clearError, setCredentials, performLogout } = authSlice.actions;
export default authSlice.reducer;