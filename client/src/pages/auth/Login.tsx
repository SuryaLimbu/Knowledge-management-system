

import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../components/form/Input';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { config } from 'process';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { access } from 'fs/promises';


const Login = () => {
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;
    console.log("api: ", apiUrl);

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



    const refreshToken = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/refresh`, { token: user.refreshToken });
            setUser({
                ...user,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwtDecode(user.accessToken);
            if (decodedToken?.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["authorization"] = `Bearer ${data.accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )


    const handleLogin = async (e: React.FormEvent) => {


        const loginDetails = {
            userId: formData.userId,
            password: formData.password
        }
        e.preventDefault();
        console.log('form data', JSON.stringify(formData));
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, JSON.stringify(loginDetails), {
                headers: { 'Content-Type': 'application/json', }
            });
            // console.log("api respose:" + response);

            setUser(response.data);
            // console.log(user.accessToken);


            if (user) {
                // console.log(user);
                const accessToken = user.accessToken;
                console.log(accessToken);
                // console.log("accesstoken:" + `Bearer ${accessToken}`);
                // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                // Create Auth header with bearer token

                // const authorization = `Bearer ${accessToken}`;

                // console.log("authorization: " + authorization)

                // const verifyResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify`, {
                //     header: {
                //         Authorization: `Bearer ${accessToken}`
                //     }
                // });
                const verifyResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify`);


                console.log("response verified:", verifyResponse);
                if (verifyResponse.data.user) {
                    setUser(response.data.user);
                    navigate('/dashboard');
                }

            };


        }
        // console.log(data);

        catch (error) {
            console.log(error)
        }


    }

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

                        <button type="button" onClick={handleLogin} className='btn btn-primary  w-full'>Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Login;