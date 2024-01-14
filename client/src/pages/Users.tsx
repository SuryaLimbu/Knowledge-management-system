import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import Input from '../components/form/Input';
import { getUser } from '../utility/userUtils';
import { getUserFromApi } from '../utility/user/getUsersUtils';
import avatar from '../icons/blank-profile-picture.png'

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
 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(getUser());
    const [userData, setUserData] = useState<UserDetails[] | null>(null);


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




    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Update state when form fields change
    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSaveModal = (e: React.FormEvent) => {
        // Access the form data from the current state
        e.preventDefault();
        console.log('Form data:', formData);
    }
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
                        <button onClick={handleOpenModal} className="btn btn-primary">
                            Add User
                        </button>
                        <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
                            {/* Modal Content */}
                            <div className="p-4">
                                <h2 className="title">Create New User</h2>
                                <div>
                                    <form action="">
                                        <div className='grid grid-cols-2 gap-2'>

                                            <Input type={'text'} placeholder={'Firstname'} id={'firstName'} name={'firstName'} required={true} value={formData.firstName} onChange={(name, value) => handleInputChange(name, value)} />

                                            <Input type={'text'} placeholder={'Lastname'} id={'lastName'} name={'lastName'} required={true} value={formData.lastName} onChange={(name, value) => handleInputChange(name, value)} />
                                        </div>

                                        <Input type={'text'} placeholder={'Email'} id={'email'} name={'email'} required={true} value={formData.email} onChange={(name, value) => handleInputChange(name, value)} />
                                        <div className='grid grid-cols-2 gap-2'>
                                            <Input type={'text'} placeholder={'Phone Number'} id={'contact'} name={'contact'} required={true} value={formData.contact} onChange={(name, value) => handleInputChange(name, value)} />
                                            <Input type={'date'} placeholder={'Date Of Birth'} id={'dateOfBirth'} name={'dateOfBirth'} required={true} value={formData.dateOfBirth} onChange={(name, value) => handleInputChange(name, value)} />
                                        </div>

                                        <Input type={'text'} placeholder={'User Address'} id={'address'} name={'address'} required={true} value={formData.address} onChange={(name, value) => handleInputChange(name, value)} />
                                        <Input type={'text'} placeholder={'PostCode'} id={'postcode'} name={'postcode'} required={true} value={formData.postcode} onChange={(name, value) => handleInputChange(name, value)} />
                                        <Input type={'file'} placeholder={'Choose Image'} id={'image'} name={'image'} required={false} value={formData.file} onChange={(name, value) => handleInputChange(name, value)} />


                                        <div className='flex gap-4 mt-4 '>
                                            <button onClick={handleSaveModal} className="btn btn-primary w-full">
                                                Create
                                            </button>
                                            <button onClick={handleCloseModal} className="btn btn-danger">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Modal>

                    </div>
                </div>
                <div className="flex flex-col gap-4 ">

                    <div className="flex gap-4 justify-center">
                        <input type="search" name="search" id="search" className="search" placeholder="Search user" />
                        <button className="btn-primary btn">Sort By</button>
                    </div>

                    <div className="overflow-x-auto">
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
                                    <th>First Name</th>
                                    <th>Last Name</th>
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
                                                <td>
                                                    {user.firstname}
                                                </td>
                                                <td> {user.lastname}</td>
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
                                                    <div className='flex'>
                                                        <button className='btn btn-square btn-info'>Edit</button>
                                                        <button className='btn btn-square btn-error'>Delete</button>
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