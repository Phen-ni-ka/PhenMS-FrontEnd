import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {
  const auth = useSelector((state) => state.auth);

  console.log(auth.token);
  if (auth.token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="flex rounded-lg overflow-hidden bg-white shadow-lg">
        <div className="bg-sky-500 flex justify-center items-center flex-col rounded-tr-2xl rounded-br-2xl">
          <div className="flex w-80 justify-between">
            <img src="src\assets\login-icon-01.png" alt="login-icon-01" />
            <img src="src\assets\login-icon-02.png" alt="login-icon-02" />
          </div>
          <div className="w-40 h-40 rounded-full bg-yellow-300 absolute" />
          <img
            src="src\assets\student.png"
            alt="student"
            className="w-52 relative"
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
