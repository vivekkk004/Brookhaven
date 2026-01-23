import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as chatService from '../../../services/chatService';

// Async thunks
export const fetchConversations = createAsyncThunk(
    'chat/fetchConversations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await chatService.getConversations();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (conversationId, { rejectWithValue }) => {
        try {
            const response = await chatService.getMessages(conversationId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ conversationId, message }, { rejectWithValue }) => {
        try {
            const response = await chatService.sendMessage(conversationId, message);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createConversation = createAsyncThunk(
    'chat/createConversation',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await chatService.createConversation(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    conversations: [],
    currentConversation: null,
    messages: [],
    loading: false,
    error: null,
    sendingMessage: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        clearError: (state) => {
            state.error = null;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Conversations
            .addCase(fetchConversations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations = action.payload;
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Messages
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Send Message
            .addCase(sendMessage.pending, (state) => {
                state.sendingMessage = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sendingMessage = false;
                state.messages.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.sendingMessage = false;
                state.error = action.payload;
            })

            // Create Conversation
            .addCase(createConversation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createConversation.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations.unshift(action.payload);
                state.currentConversation = action.payload;
            })
            .addCase(createConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCurrentConversation, clearMessages, clearError, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
