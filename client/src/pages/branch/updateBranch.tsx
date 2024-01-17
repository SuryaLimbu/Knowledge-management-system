import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiAxios from "../../utility/apiAxios";
import { getUser } from "../../utility/userUtils";
import ApiAxiosPut from "../../utility/apiAxiosPut";
import ApiAxiosGet from "../../utility/apiAxiosGet";
import { title } from "process";
interface User {
    userId: string;
    userType: string;
    newAccessToken: string;
}
interface BranchProps {
    title: string,
    address: string,
    country: string,
    employees: any[],
    client: any[]
}
const UpdateBranch: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(getUser());

    const [branchData, setBranchData] = useState<BranchProps>({
        title: "",
        address: "",
        country: "",
        employees: [],
        client: []
    });
    const { title } = useParams();
    // console.log(_id);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const accessToken = user?.newAccessToken || '';
                const response = await ApiAxiosGet(`branch/${title}`, accessToken);
                console.log('API Response:', response);
                setBranchData((prevData) => ({
                    ...prevData,
                    ...response,
                }));
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                // setIsLoading(false);
            }
        };

        fetchUserDetails();
    }, [title]);



    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setBranchData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleSubmit = async (e: React.FormEvent) => {
        // alert(JSON.stringify(userData))
        e.preventDefault();
        try {
            const accessToken = user?.newAccessToken || '';

            // Use PATCH or PUT method based on your API for updating user data
            const response = await ApiAxiosPut(`branch/${title}`, branchData, accessToken);
            // console.log(response);

            if (response.acknowledged === true) {
                navigate('/branch', { state: { success: true, message: 'Branch updated successfully!' } });

            } else {
                console.error("update branch:", response.data);
            }

            // window.location.reload();
            // console.log('User Updated');

        } catch (error) {
            console.log('Error updating user:', error);
        }
    };

    return (
        <div className='min-w-full  prose bg-white  '>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link to={`dashboard`}>Dashboard</Link></li>
                    <li><Link to={`branch`}>Branch</Link></li>
                    <li>Add Branch</li>
                </ul>
            </div>
            <div className='px-10'>


                <h1>Create Branch</h1>
                <form onSubmit={handleSubmit} className=' w-full  flex flex-col gap-4'>
                    <div className=' w-full  flex gap-2'>
                        <div className=' w-full  flex flex-col gap-1'>
                            <label htmlFor="" >Title</label>
                            <input className=' w-full  form-input px-4 py-3 rounded-md' type="text" name="title" id="title" value={branchData.title} onChange={handleInputChange} required />
                        </div>

                        <div className=' w-full  flex flex-col gap-1'>
                            <label htmlFor="">Address</label>
                            <input className=' w-full  form-input px-4 py-3 rounded-md' type="text" name="address" id="address" value={branchData.address} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className=' w-full  flex flex-col gap-1'>
                        <label htmlFor="">Country</label>
                        <input className=' w-full  form-input px-4 py-3 rounded-md' type="text" name="country" id="country" value={branchData.country} onChange={handleInputChange} required />
                    </div>
                    <div className='w-full  flex flex-row gap-4'>
                        <button type="submit" className='btn btn-square btn-lg btn-primary text-white'>Create</button>
                        <button type="submit" className='btn btn-square btn-lg btn-error text-white'>Cancel</button>
                    </div>


                </form>
            </div >
        </div>
    )
}
export default UpdateBranch;