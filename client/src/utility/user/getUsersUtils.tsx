import axios from "axios";
import { axiosJWT } from "../../services/authService";

export async function getUserFromApi(accessToken: string) {
    
    try {

        const response = await axiosJWT.get(`${process.env.REACT_APP_PUBLIC_API_URL}/users`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }
        );

      
        if (response.status === 201) {
            return response.data;
        } else {
            console.error('Error fetching user data: resonse', response.status);
        }
    } catch (error) {
        console.log('Error fetching user data:', error)
    }
    return null;
}