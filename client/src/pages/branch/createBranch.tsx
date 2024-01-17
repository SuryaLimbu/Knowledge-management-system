import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiAxios from "../../utility/apiAxios";
import { getUser } from "../../utility/userUtils";
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
const CreateBranch: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(getUser());
    const [branchData, setBranchData] = useState<BranchProps>({
        title: "",
        address: "",
        country: "",
        employees: [],
        client: []
    });
    // Update state when form fields change
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setBranchData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        // alert(JSON.stringify(branchData));

        e.preventDefault();
        try {
            const accessToken = user?.newAccessToken || '';

            const resonse = ApiAxios('branch/create', branchData, accessToken);
            // console.log(resonse);

            navigate('/branch', { state: { success: true, message: 'Branch Created successfully!' } });

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
export default CreateBranch;