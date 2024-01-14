// Sidebar.tsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PiUsersBold, PiGaugeBold, PiGitBranchBold } from 'react-icons/pi';
import logo from '../../../logo.svg';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (to: string) => {
        setActiveLink(to);
        onClose();
    };
    return (
        <aside
            className={`   rounded-md w-64 h-screen p-4 ${isOpen ? 'block' : 'hidden'} md:block`}
            onClick={onClose}
        >
            <div className='flex flex-col gap-6'>
                <div className='flex justify-center p-4'>
                    <img src={logo} alt="" className='w-20 ' />
                </div>
                <ul className="menu p-1 text-base-content font-medium">
                    {/* Sidebar content here */}

                    <li>
                        <Link to={`dashboard`} className={`flex py-2 px-4 ${activeLink === '/' ? 'text-blue-500' : ''}`}
                            onClick={() => handleLinkClick('/')}
                        ><span className='pr-4'><PiGaugeBold /></span>Dashboard</Link>
                    </li>
                    <li>
                        <Link to={`users`} className={`flex  py-2 px-4 ${activeLink === '/' ? 'text-blue-500' : ''}`}
                            onClick={() => handleLinkClick('/')}><span className='pr-4'><PiUsersBold /></span>Users</Link>
                    </li>
                    <li>
                        <Link to={`users`} className={`flex  py-2 px-4 ${activeLink === '/' ? 'text-blue-500' : ''}`}
                            onClick={() => handleLinkClick('/')}><span className='pr-4'><PiGitBranchBold /></span>Branchs</Link>
                    </li>
                </ul>
            </div>

        </aside>
    );
};

export default Sidebar;
