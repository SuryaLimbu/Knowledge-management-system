import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiAxiosDelete from "../../utility/apiAxiosDelete";
import { getUser } from "../../utility/userUtils";

interface User {
    userId: string;
    userType: string;
    newAccessToken: string;
}

const DeleteUser: React.FC = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(getUser());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const deleteUser = async () => {
            try {
                setLoading(true);

                const accessToken = user?.newAccessToken || "";

                // Use PATCH or PUT method based on your API for updating user data
                const response = await ApiAxiosDelete(`users/${userId}`, accessToken);

                if (response.acknowledged === true) {
                    navigate("/users", {
                        state: { success: true, message: "User Removed successfully!" },
                    });
                } else {
                    console.error("Delete user:", response.data);
                }

                setLoading(false);

                // Optionally, you can reload the window after deletion
                // window.location.reload();
            } catch (error) {
                console.log("Error deleting user:", error);
                setLoading(false);
            }
        };

        deleteUser();
    }, [userId, user, navigate]);

    // You can render a loading indicator if needed
    if (loading) {
        return <p>Loading...</p>;
    }

    return null; // You can render some content here if needed
};

export default DeleteUser;
