interface User {
    userId: string;
    userType: string;
    newAccessToken:string;
    newRefreshToken: string;
    // other properties
}

export function getUser(): User | null {
    const userString = localStorage.getItem('user');
    if (userString) {
        try {
            const user: User = JSON.parse(userString);
            return user;
        } catch (error) {
            console.error('Error parsing user:', error);
        }
    }
    return null;
}
