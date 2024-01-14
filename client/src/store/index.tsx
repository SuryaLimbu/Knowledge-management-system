import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../store/authSlice';
const store = configureStore({
    reducer: {
        user: userReducer
    }
}

);
export default store; 