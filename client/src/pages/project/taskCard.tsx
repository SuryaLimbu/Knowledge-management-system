import React, { useState } from "react";

interface TaskCardProps {
    taskTitle: string;
    taskDescription: string;
    onTextAnswerChange: (answer: string) => void;
    onFileUpload: (file: File) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskTitle, taskDescription, onTextAnswerChange, onFileUpload }) => {
    const [textAnswer, setTextAnswer] = useState("");

    const handleTextAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextAnswer(event.target.value);
        onTextAnswerChange(event.target.value);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileUpload(file);
        }
    };

    return (
        <div className="card w-full bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{taskTitle}</h2>
                <p>{taskDescription}</p>
                <div className="mt-4">
                    <label className="block mb-2 font-bold text-sm">Text Answer:</label>
                    <ul>
                        <li className=" bg-lime-50 p-4 rounded-md my-2">
                            FOR IMMEDIATE RELEASE<br />

                            Tech Innovators Co. Unveils QuantumGadget: <br/>
                            A Quantum Leap in Consumer Electronics

                            Silicon City, CA – January 17, 2024 – Tech Innovators Co. proudly introduces QuantumGadget, a game-changing device set to redefine consumer electronics. Packed with a Quantum Processing Unit, Holographic Display, and BioMetric Security, QuantumGadget offers a revolutionary user experience.

                            Availability:

                            QuantumGadget is now available online at www.techinnovators.com and select retail partners.
                            <br />
                            Media Contact:

                            Lisa Techson
                            PR Manager
                            press@techinnovators.com
                            (555) 987-6543
                        </li>
                    </ul>
                    <textarea className="textarea textarea-bordered h-32 w-full" placeholder="Enter Your Answer"></textarea>
                </div>
                <div className="my-4">
                    <label className="block mb-2 font-bold text-sm">File Upload:</label>
                    <input type="file" onChange={handleFileUpload} className="file-input file-input-bordered w-full" />

                </div>
                <button className="btn btn-primary">Submit</button>
                {/* Add any additional elements or styles as needed */}
            </div>
        </div>
    );
};

export default TaskCard;
