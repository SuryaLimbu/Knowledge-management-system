import { useState } from "react";
import { getUser } from "./userUtils";
import axios from "axios";

interface User {
    userId: string;
    userType: string;
    newAccessToken: string;
}

async function ApiAxiosGet(route: string, accessToken: string) {


    try {
        const response = await axios.get(
            `${process.env.REACT_APP_PUBLIC_API_URL}/${route}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 201) {
            console.log('User Created', response);
            return response.data;
        } else {
            console.error('Error fetching user data:', response.status);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

export default ApiAxiosGet;
