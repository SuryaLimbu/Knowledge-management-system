import React, { useState } from 'react';
import Modal from '../components/Modal';
import Input from '../components/form/Input';

const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className="flex flex-col w-full h-full gap-4 ">
                <div className="flex sm:flex-row flex-col items-center sm:justify-between justify-normal shadow p-4 rounded-md">
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
                        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                            {/* Modal Content */}
                            <div className="p-4">
                                <h2 className="title">Create New User</h2>
                                <div>
                                    <form action="">
                                        <div className='grid grid-cols-2 gap-2'>

                                            <Input type={'text'} placeholder={'Firstname'} id={'firstName'} name={'firstName'} required={true} value={formData.firstName} onChange={(name, value) => handleInputChange(name, value)} />

                                            <Input type={'text'} placeholder={'Lastname'} id={'lastName'} name={'lastName'} required={true}  value={formData.lastName} onChange={(name, value) => handleInputChange(name, value)}/>
                                        </div>

                                        <Input type={'text'} placeholder={'Email'} id={'email'} name={'email'} required={true} value={formData.email} onChange={(name, value) => handleInputChange(name, value)}/>
                                        <div className='grid grid-cols-2 gap-2'>
                                            <Input type={'text'} placeholder={'Phone Number'} id={'contact'} name={'contact'} required={true} value={formData.contact} onChange={(name, value) => handleInputChange(name, value)}/>
                                            <Input type={'date'} placeholder={'Date Of Birth'} id={'dateOfBirth'} name={'dateOfBirth'} required={true} value={formData.dateOfBirth} onChange={(name, value) => handleInputChange(name, value)}/>
                                        </div>

                                        <Input type={'text'} placeholder={'User Address'} id={'address'} name={'address'} required={true} value={formData.address} onChange={(name, value) => handleInputChange(name, value)}/>
                                        <Input type={'text'} placeholder={'PostCode'} id={'postcode'} name={'postcode'} required={true} value={formData.postcode} onChange={(name, value) => handleInputChange(name, value)}/>
                                        <Input type={'file'} placeholder={'Choose Image'} id={'image'} name={'image'} required={false} value={formData.file} onChange={(name, value) => handleInputChange(name, value)}/>


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

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                <td>Malcolm Lockyer</td>
                                <td>1961</td>
                            </tr>
                            <tr>
                                <td>Witchy Woman</td>
                                <td>The Eagles</td>
                                <td>1972</td>
                            </tr>
                            <tr>
                                <td>Shining Star</td>
                                <td>Earth, Wind, and Fire</td>
                                <td>1975</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>

        </>
    )

}
export default Users;