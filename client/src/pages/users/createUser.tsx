// components/CreateUser.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../utility/userUtils';
import ApiAxios from '../../utility/apiAxios';



interface UserDetails {
  userId: string,
  firstname: string,
  lastname: string,
  password: string,
  email: string,
  phone: string,
  gender: string,
  address: string,
  role: string,
  postcode: string,
  profession: string,
  file: string,
  status: boolean,
  createdDate: Date,
  updateDate: Date,
}
interface User {
  userId: string;
  userType: string;
  newAccessToken: string;
}

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(getUser());

  const [userData, setUserData] = useState<UserDetails>({
    userId: "",
    firstname: "",
    lastname: "",
    password: "root",
    email: "",
    phone: "",
    gender: "",
    address: "",
    role: "",
    postcode: "",
    profession: "",
    file: "",
    status: true, // Assuming status is a boolean
    createdDate: new Date(),
    updateDate: new Date(),
  });

  // Update state when form fields change
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };





  const handleSubmit = async (e: React.FormEvent) => {
    // alert(JSON.stringify(userData));

    e.preventDefault();
    try {
      const accessToken = user?.newAccessToken || '';

      const resonse = ApiAxios('users/create', userData, accessToken);
      // console.log(resonse);

      navigate('/users', { state: { success: true, message: 'User Created successfully!' } });


      window.location.reload();
      // console.log('user Created')
    } catch (error) {
      console.log(' error on user Create:', error)
    }

  };

  return (
    <div className='min-w-full  prose bg-white  '>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to={`dashboard`}>Dashboard</Link></li>
          <li><Link to={`users`}>Users</Link></li>
          <li>Add Users</li>
        </ul>
      </div>
      <div className='px-10'>


        <h1>Create user</h1>
        <form onSubmit={handleSubmit} className=' w-full  flex flex-col gap-4'>
          <div className=' w-full  flex gap-2'>
            <div className=' w-full  flex flex-col gap-1'>
              <label htmlFor="" >Firstname</label>
              <input className=' w-full  form-input px-4 py-3 rounded-md' type="text" name="firstname" id="firstname" value={userData.firstname} onChange={handleInputChange} required />
            </div>

            <div className=' w-full  flex flex-col gap-1'>
              <label htmlFor="">Lastname</label>
              <input className=' w-full  form-input px-4 py-3 rounded-md' type="text" name="lastname" id="lastname" value={userData.lastname} onChange={handleInputChange} required />
            </div>
          </div>
          <div className=' w-full  flex flex-col gap-1'>
            <label htmlFor="">Email</label>
            <input className=' w-full  form-input px-4 py-3 rounded-md' type="text" name="email" id="email" value={userData.email} onChange={handleInputChange} required />
          </div>

          <div className=' w-full  flex gap-2'>
            <div className=' w-full  flex flex-col gap-1'>
              <label htmlFor="">Phone Number</label>
              <input className=' w-full  form-input px-4 py-3 rounded-md' type="text" name="phone" id="phone" value={userData.phone} onChange={handleInputChange} required />
            </div>
            <div className=' w-full  flex flex-col gap-1'>
              <label htmlFor="">Gender</label>
              <select name="gender" id="gender" value={userData.gender} onChange={handleSelectChange} className=' w-full  form-select px-4 py-3 rounded-md'>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className=' w-full  flex gap-2'>
            <div className=' w-full  flex flex-col gap-1'>
              <label htmlFor="">Address</label>
              <input className=' w-full  form-input px-4 py-3 rounded-md' type="text" name="address" id="address" value={userData.address} onChange={handleInputChange} required />
            </div>
            <div className=' w-full  flex flex-col gap-1'>
              <label htmlFor="">Post Code</label>
              <input className=' w-full  form-input px-4 py-3 rounded-md' type="text" name="postcode" id="postcode" value={userData.postcode} onChange={handleInputChange} required />
            </div>
          </div>
          <div className=' w-full  flex gap-2'>
            <div className=' w-full  flex flex-col gap-1'>
              <label htmlFor="">Role</label>
              <select name="role" id="role" value={userData.role} onChange={handleSelectChange} className=' w-full  form-select px-4 py-3 rounded-md'>
                <option value="admin">Admin</option>
                <option value="branchManager">Branch Manager</option>
                <option value="staff">Admin</option>
                <option value="clientManager">Client Manager</option>
                <option value="clientStaff">client Staff</option>
              </select>
            </div>
            <div className=' w-full  flex flex-col gap-1 '>
              <label htmlFor="">Profession</label>
              <select name="profession" id="profession" value={userData.profession} onChange={handleSelectChange} className=' w-full  form-select px-4 py-3 rounded-md'>
                <option value="jurnalist">Jurnalist</option>
                <option value="graphicDesigner">Graphic Designer</option>
              </select>
            </div>

          </div>
          <div className=' w-full  flex flex-col gap-1'>
            <label htmlFor="">Choose profile image</label>
            <input className=' w-full  form-input px-4 py-3 rounded-md' type="file" name="file" id="file" value={userData.file} onChange={handleInputChange} required />
          </div>

          <div className='w-full  flex flex-row gap-4'>
            <button type="submit" className='btn btn-square btn-lg btn-primary text-white'>Create</button>
            <button type="submit" className='btn btn-square btn-lg btn-error text-white'>Cancel</button>
          </div>

        </form>
      </div >
    </div>
  );
};

export default CreateUser;

