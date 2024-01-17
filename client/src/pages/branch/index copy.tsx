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
                                <th>Title</th>
                                <th>Address</th>
                                <th>Country</th>
                                <th>Employees</th>
                                <th></th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                branchData && branchData.length > 0 ? (
                                    branchData.map((branch) => (
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            {/* <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={avatar} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{branch.Title}</div>
                                                        <div className="text-sm opacity-50">{branch.address}</div>
                                                    </div>
                                                </div>
                                            </td> */}
                                            <td>
                                                {branch.title}
                                            </td>
                                            <td> {branch.address}</td>
                                            <th>{branch.country}</th>
                                            <th>
                                                {branch.employees}
                                            </th>
                                            <th>
                                                {branch.client}
                                            </th>

                                            <th>
                                                <div className='flex gap-1 '>
                                                    <Link to={`/updateBranch/${branch.title}`} className='btn btn-square btn-info text-white'>Edit</Link>
                                                    <button className='btn btn-square btn-error text-white' onClick={() => handleOpenModal(branch.title)} >Delete</button>

                                                    <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
                                                        <div className="p-4">
                                                            <h3 className="font-bold text-lg">Delete User</h3>
                                                            <p className="py-4">Are you sure you want to delete this user?</p>
                                                            <div className="modal-action">
                                                                <form method="dialog">
                                                                    <button className="btn" onClick={() => handleDelete(branch.title)}>
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
    );
}

export default Branch;