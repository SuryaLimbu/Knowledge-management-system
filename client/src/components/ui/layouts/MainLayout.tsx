import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../navbar/Sidebar";
import LogoutAfterInactivity from "../../LogoutAfterInactivity/LogoutAfterInactivity";
import { getUser } from "../../../utility/userUtils";
import { logoutUser } from "../../logout/Logout";



interface User {
    userId: string;
    // other properties
}

const MainLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    }


    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(getUser());

    useEffect(() => {
        const handleLogout = () => {
            logoutUser(navigate);
            console.log('Logging out.......')
            setUser(null);
        };

        window.addEventListener('logout', handleLogout);

        return () => {
            window.removeEventListener('logout', handleLogout);
        };

    }, [navigate]);
    return (
        <>
            {/* Include LogoutAfterInactivity component */}
            <LogoutAfterInactivity handleLogout={() => window.dispatchEvent(new Event('logout'))} />

            <div className="flex flex-row bg-slate-50 gap-2">
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

                <div className="flex flex-col w-full gap-1">
                    <Navbar onToggleSidebar={toggleSidebar} />
                    <main className={`ml-${isSidebarOpen ? '64' : '0'} transition-all duration-300 ease-in-out w-full`}>
                        <Outlet />
                    </main>
                </div>




            </div>
        </>
    );
}
export default MainLayout;