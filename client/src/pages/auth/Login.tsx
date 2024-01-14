

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../../components/form/Input';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useAuth } from '../../services/authService';

function Login() {
    // const dispatch = useDispatch();

    // const navigate = useNavigate();
    const { handleLogin } = useAuth();



    // const apiUrl = process.env.REACT_APP_API_URL;
    // console.log("api: ", apiUrl);\
    // console.log("open loagin page");


    const [user, setUser] = useState({
        accessToken: '',
        refreshToken: '',
    });
    // const [userId, setUserId] = useState();
    // const [password, setPassword] = useState();
    //define state variables for login form
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
    });
    // Update state when form fields change
    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleLogin(e, formData);
        } catch (error) {

        }
    };








    return (
        <>
            <div className='flex sm:flex-row flex-col h-screen justify-center items-center'>
                {/* left side */}
                <div className='w-1/2 flex justify-center h-screen '>
                    <img src={logo} alt="Logo" className='w-1/2 h-full' />
                </div>
                {/* right side */}
                <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-white h-screen'>
                    <h1 className='text-2xl font-semibold mb-4'>Login Page</h1>
                    <form action="" method="post">
                        <div className='mb-4'>
                            <Input type={'text'} placeholder={'User Id'} required={true} name={'userId'} id={'userId'} value={formData.userId} onChange={(name, value) => handleInputChange(name, value)} />
                        </div>


                        <div className='mb-4'>
                            <Input type={'password'} placeholder={'Password'} required={true} name={'password'} id={'password'} value={formData.password} onChange={(name, value) => handleInputChange(name, value)} />
                        </div>

                        <div className="mb-4">
                            <Link to={''} className='hover:text-violet-600'>Forgot Password?</Link>
                        </div>

                        <button type="button" onClick={onSubmit} className='btn btn-primary  w-full'>Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Login;