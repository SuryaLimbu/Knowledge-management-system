import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../../logo.svg';
import { RiDashboardLine, RiUserLine } from 'react-icons/ri'
const Navbar: React.FC = () => {
    return (
        <>
            <div className="relative flex h-full w-full">
                <div className="px-8">
                    <div className="flex items-center justify-center gap-4 p-4 mb-2">
                        <img src={Logo} alt="logo" className="w-20 h-20" />
                    </div>

                    <nav>
                        <div className=" relative block w-full">
                            <button type="button"
                                className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
                                <Link to="/" className="flex">
                                    <div className="grid mr-4 place-items-center">

                                        <RiDashboardLine />
                                    </div>
                                    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                                        Dashboard
                                    </p>
                                </Link>
                            </button>
                            <button type="button"
                                className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
                                <Link to="/users" className="flex">
                                    <div className="grid mr-4 place-items-center">

                                        <RiUserLine />
                                    </div>
                                    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                                        Users
                                    </p>
                                </Link>
                            </button>
                        </div>
                    </nav>

                </div>

            </div>
        </>
    );
}
export default Navbar;