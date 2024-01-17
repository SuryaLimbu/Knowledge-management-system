import { useEffect, useState } from "react";
import ApiAxiosGet from "../../utility/apiAxiosGet";
import { getUser } from "../../utility/userUtils";
import { Link } from "react-router-dom";
interface User {
    userId: string,
    userType: string,
    newAccessToken: string
}
interface AnnouncementProps {
    userId: Number,
    title: String,
    desc: String,
    announcementFor: [String],
    announcementDate: String
}

const Announcement = () => {
    const [user, setUser] = useState<User | null>(getUser());

    const [projectData, setProjectData] = useState<AnnouncementProps[] | null>(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (user) {
                const projectData = await ApiAxiosGet('announcement', user.newAccessToken);
                console.log(projectData);
                setProjectData(projectData);
                // console.log("user data from user page:", userData);
            }

        }
        fetchProjectData();
    }, [user]);
    return (
        <>
            <div className="  bg-white w-full my-4">
                <h1 className=" px-4 text-4xl font-bold ">List of Announcement</h1>
                <div className="grid md:grid-cols-2 gap-3 py-4 w-full px-2">
                    {
                        projectData && projectData.length > 0 ? (
                            projectData.map((project) => (
                                <div className="card bg-slate-50 shadow-sm ">
                                    <div className="card-body">
                                        <h2 className="card-title">{project.title}</h2>
                                        <p>{project.desc}</p>
                                        <div>
                                            <h2 className=" font-bold">End: {project.announcementDate}</h2>

                                        </div>

                                    </div>
                                </div>
                            ))) : (<p>No user data available</p>)

                    }



                </div>
            </div>
        </>
    )
}
export default Announcement;