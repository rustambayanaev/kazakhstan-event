import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function UserAccountPage() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold text-center mb-4">
          Welcome, {user.name}!
        </h2>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">User ID:</span> {user._id}
          </div>
        </div>
      </div>
    </div>
  );
}
