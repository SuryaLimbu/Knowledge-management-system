import { useState } from "react";
import { getUser } from "../utility/userUtils";

// Assuming User interface is defined here
interface User {
  userId: string;
  userType: string;
  newAccessToken:string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(getUser());

  return (
    <>
      <div className="bg bg-white rounded-md p-4 shadow-sm">
        <h2 className="font-semibold text-lg">Welcome To Dashboard</h2>
        {user && <h2 className="font-semibold text-lg">{user.userId} & {user.userType} </h2>}
        {user && <h2 className="font-semibold text-lg">{user.userType} </h2>}
        
      </div>
      <div>
      </div>

    </>
  );
};

export default Dashboard;
