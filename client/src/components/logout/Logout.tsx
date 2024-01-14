// rc\components\logout\Logout.tsx
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getUser } from '../../utility/userUtils';

export function logoutUser(navigate: NavigateFunction) {
    
    const user = getUser();

    if (user) {
        const userData = {
            userId: user.userId,
            refreshToken: user.newRefreshToken
        };

        try {
            axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, JSON.stringify(userData), {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (response.status === 200) {
                        localStorage.removeItem('user');
                        navigate('/');
                        window.location.reload();
                    } else {
                        console.error('Logout failed with status code:', response.status);
                    }
                })
                .catch(error => {
                    console.error('Error during logout:', error);
                });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
}

