import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reviewsService from '../../../services/reviewsService';

// Async thunks
export const fetchBookReviews = createAsyncThunk(
    'reviews/fetchBookReviews',
    async (bookId, { rejectWithValue }) => {
        try {
            const response = await reviewsService.getBookReviews(bookId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addReview = createAsyncThunk(
    'reviews/addReview',
    async ({ bookId, reviewData }, { rejectWithValue }) => {
        try {
            const response = await reviewsService.addReview(bookId, reviewData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async ({ reviewId, reviewData }, { rejectWithValue }) => {
        try {
            const response = await reviewsService.updateReview(reviewId, reviewData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (reviewId, { rejectWithValue }) => {
        try {
            await reviewsService.deleteReview(reviewId);
            return reviewId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    reviews: [],
    loading: false,
    error: null,
    reviewAdded: false,
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        clearReviewAdded: (state) => {
            state.reviewAdded = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Book Reviews
            .addCase(fetchBookReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchBookReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Review
            .addCase(addReview.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.reviewAdded = false;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviewAdded = true;
                state.reviews.unshift(action.payload);
            })
            .addCase(addReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.reviewAdded = false;
            })

            // Update Review
            .addCase(updateReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.reviews.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Review
            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = state.reviews.filter(r => r.id !== action.payload);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearReviewAdded, clearError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
