import { useEffect, useState } from "react";
import ApiAxiosGet from "../../utility/apiAxiosGet";
import { getUser } from "../../utility/userUtils";
import { Link } from "react-router-dom";
interface User {
    userId: string,
    userType: string,
    newAccessToken: string
}
interface ProjectProps {
    porjectId: Number,
    clientId: Number,
    users: [String],
    projectName: String,
    startDate: String,
    endDate: String,
    desc: String,
    projectManger: String,
    budget: String
}

const Project = () => {
    const [user, setUser] = useState<User | null>(getUser());

    const [projectData, setProjectData] = useState<ProjectProps[] | null>(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            if (user) {
                const projectData = await ApiAxiosGet('project', user.newAccessToken);
                console.log(projectData);
                setProjectData(projectData);
                // console.log("user data from user page:", userData);
            }

        }
        fetchProjectData();
    }, [user]);
    return (
        <>
            <div className=" bg-white w-full">
                <h1 className=" text-4xl font-bold px-4">List of projects</h1>
                <div className="grid md:grid-cols-2 gap-3 p-4 w-full ">
                    {
                        projectData && projectData.length > 0 ? (
                            projectData.map((project) => (
                                <div className="card bg-slate-50 shadow-sm ">
                                    <div className="card-body">
                                        <h2 className="card-title">{project.projectName}</h2>
                                        <p>{project.desc}</p>
                                        <div>
                                            <h2 className=" font-bold">budget:$ {project.budget}</h2>
                                            <h1>{project.startDate} - {project.endDate}</h1>

                                        </div>

                                        <div className="card-actions items-center justify-between pt-4">
                                            <progress className="progress progress-success w-56" value="70" max="100"></progress>

                                            <Link to={`1`} className="btn btn-primary">View Tasks</Link>
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
export default Project;