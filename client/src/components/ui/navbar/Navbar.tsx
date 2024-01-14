
import React, { useState } from "react";
import blackProfile from '../../../icons/blank-profile-picture.png';
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../../logout/Logout";


interface NavProps {
    onToggleSidebar: () => void;
}
const Navbar: React.FC<NavProps> = ({ onToggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(navigate);
    };

    // alert(userData.refreshToken)


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">

                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle md:hidden" onClick={onToggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                </div>
            </div>
            <div className="navbar-center">
                <input type="search" name="search" id="search" className=" bg-slate-50 input w-full max-w-xs" />

            </div>
            <div className="navbar-end">

                <div className="dropdown dropdown-end flex gap-2">
                    <div className="text-end text-sm">
                        <h3 className=" font-semibold">Surya Man Kedem</h3>
                        <h4 className="font">Project Manger</h4>
                    </div>
                    <div tabIndex={0} role="button" className="w-8 m-1"><img className=" rounded-full" src={blackProfile} alt="" /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-10">
                        <li><a>Item 1</a></li>
                        <button className="btn btn-primary" onClick={handleLogout}> <span className=" text-lg"><PiSignOut /></span>Logout</button>
                    </ul>
                </div>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Navbar;
