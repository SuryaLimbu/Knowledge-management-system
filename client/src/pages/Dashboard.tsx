import { useState } from "react";
import { getUser } from "../utility/userUtils";
import { PiUsersBold, PiGaugeBold, PiGitBranchBold, PiMegaphone, PiStack, PiUsersThree, PiClipboardText } from 'react-icons/pi';


// Assuming User interface is defined here
interface User {
  userId: string;
  userType: string;
  newAccessToken: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(getUser());

  return (
    <>
      <div className="bg bg-white rounded-md p-4 shadow-sm">
        <h1 className="font-semibold text-lg text-center">Welcome To Dashboard</h1>
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="bg-slate-50 flex flex-col items-center text-lg font-bold py-6 rounded shadow-sm">
            <PiStack className="text-8xl my-4 " />
            <h1>10</h1>
            <h1>Total project</h1>
          </div>
          <div className="bg-slate-50 flex flex-col items-center text-lg font-bold py-6 rounded shadow-sm">
            <PiUsersThree className="text-8xl my-4 " />
            <h1>5</h1>
            <h1>Total Client</h1>
          </div>
          <div className="bg-slate-50 flex flex-col items-center text-lg font-bold py-6 rounded shadow-sm">
            <PiClipboardText className="text-8xl my-4 " />
            <h1>20</h1>
            <h1>Total Task</h1>
          </div>
        </div>

      </div>
      <div className="flex flex-row gap-3 bg-white rounded my-6 p-4 w-full">
        <div className="card bg-slate-50 shadow-sm "> 
          <div className="card-body">
            <h2 className="card-title">Upcoming Event</h2>
            <p>Nulla facilisi. Aenean vel urna non ligula sagittis.</p>
            <div>
              <h2 className=" font-bold">End: 2024-01-17</h2>

            </div>

          </div>
        </div>
        <div className="card bg-slate-50 shadow-sm ">
          <div className="card-body">
            <h2 className="card-title">Upcoming Event</h2>
            <p>Nulla facilisi. Aenean vel urna non ligula sagittis.</p>
            <div>
              <h2 className=" font-bold">End: 2024-01-17</h2>

            </div>

          </div>
        </div>
      </div>


    </>
  );
};

export default Dashboard;
