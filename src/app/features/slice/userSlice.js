import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../../services/userService';

// Async thunks
export const fetchSellerProfile = createAsyncThunk(
    'user/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userService.getSellerProfile();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateSellerProfile = createAsyncThunk(
    'user/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await userService.updateSellerProfile(profileData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addBook = createAsyncThunk(
    'user/addBook',
    async (bookData, { rejectWithValue }) => {
        try {
            const response = await userService.addBook(bookData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMyListings = createAsyncThunk(
    'user/fetchMyListings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userService.getMyListings();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBook = createAsyncThunk(
    'user/updateBook',
    async ({ id, bookData }, { rejectWithValue }) => {
        try {
            const response = await userService.updateBook(id, bookData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBook = createAsyncThunk(
    'user/deleteBook',
    async (id, { rejectWithValue }) => {
        try {
            await userService.deleteBook(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchEarnings = createAsyncThunk(
    'user/fetchEarnings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userService.getEarnings();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    profile: null,
    myListings: [],
    earnings: null,
    loading: false,
    error: null,
    bookAdded: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearBookAdded: (state) => {
            state.bookAdded = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Seller Profile
            .addCase(fetchSellerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSellerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchSellerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Seller Profile
            .addCase(updateSellerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSellerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(updateSellerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Book
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.bookAdded = false;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.bookAdded = true;
                state.myListings.unshift(action.payload);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.bookAdded = false;
            })

            // Fetch My Listings
            .addCase(fetchMyListings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyListings.fulfilled, (state, action) => {
                state.loading = false;
                state.myListings = action.payload;
            })
            .addCase(fetchMyListings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Book
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.myListings.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.myListings[index] = action.payload;
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Book
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.myListings = state.myListings.filter(book => book.id !== action.payload);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Earnings
            .addCase(fetchEarnings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEarnings.fulfilled, (state, action) => {
                state.loading = false;
                state.earnings = action.payload;
            })
            .addCase(fetchEarnings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearBookAdded, clearError } = userSlice.actions;
export default userSlice.reducer;
