import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    userId: number | null;
    userType: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}



const initialState: AuthState = {
    userId: null,
    userType: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    // other relevant fields
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthState, action: PayloadAction<{ userId: number; userType: string; accessToken: string; refreshToken: string }>) => {
            state.userId = action.payload.userId;
            state.userType = action.payload.userType;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
        },
        logout: (state: AuthState) => {
            state.userId = null;
            state.userType = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },
        // other reducers and actions
    },
});

export const { login, logout } = authSlice.actions;

export const selectUserId = (state: { auth: AuthState }) => state.auth.userId;
export const selectUserType = (state: { auth: AuthState }) => state.auth.userType;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

export default authSlice.reducer;
