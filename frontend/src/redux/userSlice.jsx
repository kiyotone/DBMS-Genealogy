import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,          // User information (could be an object or null)
  isAuthenticated: false,  // Authentication status
  loading: false,         // Loading state for async actions (optional)
  error: null,            // Error state for async actions (optional)
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Exporting actions to use in components
export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

// Exporting reducer to be used in the store
export default userSlice.reducer;
