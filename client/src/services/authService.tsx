// authService.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

export const axiosJWT = axios.create();

interface User {
    userId: string,
    userType: string,
    accessToken: string,
    refreshToken: string
}

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState<User | null>();

    const refreshToken = async () => {
        console.log('Refreshing token...');
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/refresh`, { token: user?.refreshToken });
            setUser({
                ...user,
                accessToken: response.data.newAccessToken,
                refreshToken: response.data.newRefreshToken,
                userId: response.data.userId,
                userType: response.data.userType, // 
            });
            return response.data;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error; // Re-throw the error to be caught in the interceptor
        }
    };

    // Assuming axiosJWT is your configured Axios instance with the token interceptor
    axiosJWT.interceptors.response.use(
        (response) => {
            console.log('Response received:', response);
            return response
        },
        async (error) => {
            // console.log("welcome to axiosJwt");
            console.log('Error received:', error);
            const originalRequest = error.config;

            // Check if the error is due to token expiration and if there's no retry token already set
            if (error.response.status === 403 && !originalRequest._retry) {
                console.log('401 received, refreshing token and retrying request...');
                originalRequest._retry = true;

                try {
                    // Refresh the token
                    const data = await refreshToken();
                    // console.log("data from axiosJwt:", data);
                    console.log('Token refreshed:', data);

                    // Update the original request with the new token
                    originalRequest.headers['Authorization'] = `Bearer ${data.newAccessToken}`;

                    // Retry the original request
                    return axiosJWT(originalRequest);
                } catch (refreshError) {
                    // Handle refresh error or redirect to login
                    console.error('Error refreshing token:', refreshError);
                    navigate('/login'); // Redirect to login page
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    const handleLogin = async (e: React.FormEvent, formData: { userId: any; password: any; }) => {
        e.preventDefault();

        const loginDetails = {
            userId: formData.userId,
            password: formData.password
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, JSON.stringify(loginDetails), {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('login data:', response.data)
            setUser(response.data);

            if (response.data) {
                const refreshToken = response.data.refreshToken;
                const refreshTokenDetails = {
                    token: refreshToken
                };

                const verifyResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/refresh`, JSON.stringify(refreshTokenDetails), {
                    headers: { 'Content-Type': 'application/json' }
                });

                console.log("login data to store in localstorage: ", verifyResponse);

                if (verifyResponse.data) {
                    localStorage.setItem('user', JSON.stringify(verifyResponse.data));
                    const userString = localStorage.getItem('user');
                    console.log("local data stored view:", userString);
                    setUser(verifyResponse.data);

                    console.log("login data to store in localstorage brfore: ", verifyResponse.data);

                    const loginData = {
                        userId: response.data.userId,
                        userType: response.data.userType,
                        accessToken: response.data.newAccessToken,
                        refreshToken: response.data.newRefreshToken,
                    };
                    dispatch(login(loginData));
                    navigate('dashboard');
                    window.location.reload();
                
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        // ... (your logout logic)
    };

    return { handleLogin, handleLogout };
};
