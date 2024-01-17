import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import { getUser } from "../../utility/userUtils";
import { getUserFromApi } from "../../utility/user/getUsersUtils";
import ApiAxiosGet from "../../utility/apiAxiosGet";
import ApiAxiosDelete from "../../utility/apiAxiosDelete";
interface BranchProps {
    _id: any;
    title: String,
    address: String,
    country: String,
    employees: any[],
    client: any[]
}

interface User {
    userId: string,
    userType: string,
    newAccessToken: string
}




const Branch = () => {
    const [user, setUser] = useState<User | null>(getUser());
    const [branchData, setBranchData] = useState<BranchProps[] | null>(null);
    const navigate = useNavigate();
    const [branchTitle, setBranchTitle] = useState<String | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchBranchData = async () => {
            if (user) {
                const branchData = await ApiAxiosGet('branch', user.newAccessToken);
                console.log(branchData);
                setBranchData(branchData);
                // console.log("user data from user page:", userData);
            }

        }
        fetchBranchData();
    }, [user]);

    const handleOpenModal = (userId: String) => {
        // setDeleteId(userId);
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {

        setIsModalOpen(false);
    };

    const handleDelete = async (deleteId: String) => {
        const accessToken = user?.newAccessToken || '';

        try {
            console.log("handle delete id:", deleteId);

            // Use PATCH or PUT method based on your API for updating user data
            const response = await ApiAxiosDelete(`users/${deleteId}`, accessToken);
            console.log(response);

            if (response && response.acknowledged === true) {
                setIsModalOpen(false);
                setBranchTitle(null);
                navigate('/users', { state: { success: true, message: 'branch Removed successfully!' } });
                window.location.reload();
            } else {
                console.error("Delete user:", response?.data || 'Unexpected error occurred.');
            }
        } catch (error) {
            console.log('Error updating user:', error);
        }
    };


    return (
        <div className="bg-white flex flex-col w-full h-full gap-4 p-4 rounded">
            <div className=" flex sm:flex-row flex-col items-center sm:justify-between justify-normal p-4 rounded-md">
                <div>
                    <h1 className="title">
                        Branch
                    </h1>
                    <h1>A list of all the users in your account including their name, title, email and role.
                    </h1>
                </div>
                <div className="">
                    <Link to={`/createBranch`} className="btn btn-primary">
                        Add Branch
                    </Link>


                </div>
            </div>
            <div>
                {/* {state && state.success && (
                    <div role="alert" className="alert alert-success text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{state.message}</span>
                    </div>
                )} */}

            </div>

            <div className="flex flex-col gap-4 ">

                <div className="flex gap-4 justify-center">
                    <input type="search" name="search" id="search" className="search" placeholder="Search user" />
                    <button className="btn-primary btn">Sort By</button>
                </div>


                <div className="overflow-x-auto grid grid-cols-3 gap-3">
                    {
                        branchData && branchData.length > 0 ? (
                            branchData.map((branch) => (
                                <>
                                    <div className="card bg-slate-50 shadow-sm ">
                                        <div className="card-body">
                                            <h2 className="card-title">{branch.title}</h2>
                                            <p>{branch.address}</p>
                                            <p>{branch.country}</p>
                                            <div className="">
                                                <p className=" font-semibold">Branch Manager : </p>

                                            </div>
                                            <div>
                                                <p className=" font-semibold">Employees : </p>

                                            </div>

                                            <div className="card-actions justify-end">
                                                <Link to={`/client`} className="btn">View client</Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))) : (
                            <>
                            </>)}
                </div>
            </div>


        </div>
    );
}

export default Branch;