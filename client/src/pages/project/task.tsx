import React, { useState } from "react";
import TaskCard from "./taskCard";
import { Link } from "react-router-dom";

const TaskPage = () => {
    const [textAnswer, setTextAnswer] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleTextAnswerChange = (answer: string) => {
        setTextAnswer(answer);
    };

    const handleFileUpload = (file: File) => {
        setUploadedFile(file);
    };

    const handleSubmit = () => {
        // Handle the submission logic, including text answer and uploaded file
        console.log("Text Answer:", textAnswer);
        console.log("Uploaded File:", uploadedFile);
        // You can send the data to your server or perform any other necessary actions
    };

    return (
        <div className="p-4">
            <div className="text-sm breadcrumbs py-5">
                <ul>
                    <li><Link to={`/dashboard`}>Dashboard</Link></li>
                    <li><Link to={`/project`}>Project</Link></li>
                    <li>Task Page</li>
                </ul>
            </div>
            <TaskCard
                taskTitle="Write a sample press release announcing the launch of a new tech product."
                taskDescription="Finish the assigned project by the end of the week."
                onTextAnswerChange={handleTextAnswerChange}
                onFileUpload={handleFileUpload}
            />
            <div className="card w-full bg-base-100 shadow-sm mt-5">
                <div className="card-body">
                    <h2 className="card-title">Write a sample press release announcing the launch of a new tech product.</h2>
                    <p>Finish the assigned project by the end of the week.</p>
                    <div className="mt-4">
                        <label className="block mb-2 font-bold text-sm">Text Answer:</label>
                        <ul>
                            <li className=" bg-lime-50 p-4 rounded-md my-2">
                                FOR IMMEDIATE RELEASE

                                Tech Innovators Co. Unveils QuantumGadget: A Quantum Leap in Consumer Electronics

                                Silicon City, CA – January 17, 2024 – Tech Innovators Co. proudly introduces QuantumGadget, a game-changing device set to redefine consumer electronics. Packed with a Quantum Processing Unit, Holographic Display, and BioMetric Security, QuantumGadget offers a revolutionary user experience.

                                Availability:

                                QuantumGadget is now available online at www.techinnovators.com and select retail partners.

                                Media Contact:

                                Lisa Techson
                                PR Manager
                                press@techinnovators.com
                                (555) 987-6543
                            </li>
                        </ul>

                    </div>
                    <div className="mt-4">
                        <h2 className=" bg-green-100 rounded-md text-center py-2">Complete</h2>
                    </div>
                    {/* <button className="btn btn-primary">Submit</button> */}
                    {/* Add any additional elements or styles as needed */}
                </div>
            </div>

        </div>
    );
};

export default TaskPage;
