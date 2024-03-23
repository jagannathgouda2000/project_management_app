import React from "react";
import Login from "../Login";

const UserNotFound = () => {
  return (
    <div className="mt-6 flex h-screen justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">User Not Found</h1>
        <p className="text-gray-700">Please login to continue.</p>
      </div>
    </div>
  );
};

export default UserNotFound;
