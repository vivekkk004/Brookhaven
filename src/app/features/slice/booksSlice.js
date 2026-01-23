import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as booksService from '../../../services/booksService';

// Async thunks
export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const response = await booksService.getBooks(filters);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await booksService.getBookById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchBooks = createAsyncThunk(
    'books/searchBooks',
    async (query, { rejectWithValue }) => {
        try {
            const response = await booksService.searchBooks(query);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const filterBooks = createAsyncThunk(
    'books/filterBooks',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await booksService.filterBooks(filters);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    books: [],
    currentBook: null,
    filteredBooks: [],
    loading: false,
    error: null,
    filters: {
        category: '',
        condition: '',
        priceRange: { min: 0, max: 10000 },
        sortBy: 'newest',
    },
    searchQuery: '',
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalBooks: 0,
        booksPerPage: 12,
    },
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearCurrentBook: (state) => {
            state.currentBook = null;
        },
        setPage: (state, action) => {
            state.pagination.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Books
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload.books;
                state.pagination = {
                    ...state.pagination,
                    ...action.payload.pagination,
                };
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Book By ID
            .addCase(fetchBookById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBook = action.payload;
            })
            .addCase(fetchBookById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Search Books
            .addCase(searchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredBooks = action.payload.books;
            })
            .addCase(searchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Filter Books
            .addCase(filterBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(filterBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload.books;
                state.pagination = {
                    ...state.pagination,
                    ...action.payload.pagination,
                };
            })
            .addCase(filterBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setFilters, setSearchQuery, clearCurrentBook, setPage } = booksSlice.actions;
export default booksSlice.reducer;
