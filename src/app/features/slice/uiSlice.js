import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarOpen: false,
    modalOpen: false,
    modalContent: null,
    toastMessage: null,
    toastType: 'info', // 'success', 'error', 'warning', 'info'
    theme: 'light',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        openModal: (state, action) => {
            state.modalOpen = true;
            state.modalContent = action.payload;
        },
        closeModal: (state) => {
            state.modalOpen = false;
            state.modalContent = null;
        },
        showToast: (state, action) => {
            state.toastMessage = action.payload.message;
            state.toastType = action.payload.type || 'info';
        },
        hideToast: (state) => {
            state.toastMessage = null;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const {
    toggleSidebar,
    setSidebarOpen,
    openModal,
    closeModal,
    showToast,
    hideToast,
    setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
