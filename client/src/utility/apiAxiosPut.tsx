import { useState } from "react";
import { getUser } from "./userUtils";
import axios from "axios";

interface User {
    userId: string;
    userType: string;
    newAccessToken: string;
}

async function ApiAxiosPut(route: string, data: object, accessToken:string) {


    try {
        const response = await axios.put(
            `${process.env.REACT_APP_PUBLIC_API_URL}/${route}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 201) {
            console.log('User Updated');
            return response.data;
        } else {
            console.error('Error fetching user data:', response.status);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

export default ApiAxiosPut;
