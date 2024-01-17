import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import Input from '../../components/form/Input';
import { getUser } from '../../utility/userUtils';
import { getUserFromApi } from '../../utility/user/getUsersUtils';
import avatar from '../../icons/blank-profile-picture.png'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ApiAxiosDelete from '../../utility/apiAxiosDelete';


interface User {
    userId: string,
    userType: string,
    newAccessToken: string
}

interface UserDetails {
    userId: String,
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    phone: String,
    gender: String,
    address: String,
    role: String,
    postcode: String,
    profession: String,
    file: String,
    status: Boolean,
    createdDate: Date,
    updateDate: Date,
}
const Users = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(getUser());
    const [userData, setUserData] = useState<UserDetails[] | null>(null);
    const [deleteId, setDeleteId] = useState<String | null>(null);



    useEffect(() => {
        const fetchuserData = async () => {
            if (user) {
                const userData = await getUserFromApi(user.newAccessToken);
                setUserData(userData);
                // console.log("user data from user page:", userData);
            }

        }
        fetchuserData();
    }, [user]);

    const handleDelete = async (deleteId: String) => {
        const accessToken = user?.newAccessToken || '';

        try {
            console.log("handle delete id:", deleteId);

            // Use PATCH or PUT method based on your API for updating user data
            const response = await ApiAxiosDelete(`users/${deleteId}`, accessToken);
            console.log(response);

            if (response && response.acknowledged === true) {
                setIsModalOpen(false);
                setDeleteId(null);
                navigate('/users', { state: { success: true, message: 'User Removed successfully!' } });
                window.location.reload();
            } else {
                console.error("Delete user:", response?.data || 'Unexpected error occurred.');
            }
        } catch (error) {
            console.log('Error updating user:', error);
        }
    };


    // useEffect(() => {
    //     if (deleteId) {
    //         handleDelete(deleteId);
    //         setDeleteId(null); // Reset deleteId after deletion
    //     }
    // }, [deleteId, user]);




    // Define state variables for form control
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        dateOfBirth: '',
        address: '',
        postcode: '',
        file: '',

    });

    const deletePanel = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
        if (modal) {
            modal.close();
            setIsModalOpen(false);
        }
    };


    // Update state when form fields change
    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOpenModal = (userId: String) => {
        // setDeleteId(userId);
        setIsModalOpen(true);
    };



    const handleCloseModal = () => {
        setDeleteId(null);
        setIsModalOpen(false);
    };

    const location = useLocation();
    const { state } = location;

    // const location = useLocation();
    // const { state } = location.state || false;
    // console.log("checking state: ",location);
    // console.log("checking state: ",location.state);

    return (
        <>
            <div className="bg-white flex flex-col w-full h-full gap-4 p-4 rounded">
                <div className=" flex sm:flex-row flex-col items-center sm:justify-between justify-normal p-4 rounded-md">
                    <div>
                        <h1 className="title">
                            Users
                        </h1>
                        <h1>A list of all the users in your account including their name, title, email and role.
                        </h1>
                    </div>
                    <div className="">
                        <Link to={`/createUser`} className="btn btn-primary">
                            Add User
                        </Link>


                    </div>
                </div>
                <div>
                    {state && state.success && (
                        <div role="alert" className="alert alert-success text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{state.message}</span>
                        </div>
                    )}

                </div>

                <div className="flex flex-col gap-4 ">

                    <div className="flex gap-4 justify-center">
                        <input type="search" name="search" id="search" className="search" placeholder="Search user" />
                        <button className="btn-primary btn">Sort By</button>
                    </div>


                    <div className="">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <th>User ID</th>
                                    {/* <th>First Name</th>
                                    <th>Last Name</th> */}
                                    <th>Role</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>Address</th>
                                    <th>Profession</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    userData && userData.length > 0 ? (
                                        userData.map((user) => (
                                            <tr>
                                                <th>
                                                    <label>
                                                        <input type="checkbox" className="checkbox" />
                                                    </label>
                                                </th>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={avatar} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{user.userId}</div>
                                                            <div className="text-sm opacity-50">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    {user.firstname}
                                                </td>
                                                <td> {user.lastname}</td> */}
                                                <th>{user.role}</th>
                                                <th>
                                                    {user.phone}
                                                </th>
                                                <th>
                                                    {user.gender}
                                                </th>
                                                <th>
                                                    {user.address}
                                                </th>
                                                <th>
                                                    {user.profession}
                                                </th>
                                                <th>
                                                    <div className='flex gap-1 '>
                                                        <Link to={`/updateUser/${user.userId}`} className='btn btn-square btn-info text-white'>Edit</Link>
                                                        <button className='btn btn-square btn-error text-white' onClick={() => handleOpenModal(user.userId)} >Delete</button>

                                                        <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
                                                            <div className="p-4">
                                                                <h3 className="font-bold text-lg">Delete User</h3>
                                                                <p className="py-4">Are you sure you want to delete this user?</p>
                                                                <div className="modal-action">
                                                                    <form method="dialog">
                                                                        <button className="btn" onClick={() => handleDelete(user.userId)}>
                                                                            Delete
                                                                        </button>
                                                                        <button className="btn" onClick={handleCloseModal}>
                                                                            Cancel
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            </div>

                                                        </Modal>

                                                    </div>

                                                </th>
                                            </tr>
                                        ))
                                    ) : (<p>No user data available</p>)
                                }

                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                    <th></th>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
                </div>


            </div>

        </>
    )

}
export default Users;