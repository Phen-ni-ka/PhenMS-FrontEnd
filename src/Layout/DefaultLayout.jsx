import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { logOut } from "../features/authSlice";
import { useDispatch } from "react-redux";

export default function DefaultLayout() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="h-screen flex pt-2">
      <aside className="w-56">
        <img src="src\assets\logo.png" alt="logo" className="w-36 mx-5" />
      </aside>
      <div className="content flex-grow">
        <header className="bg-white h-10 relative">
          <IoMenu
            className="bg-blue-600 text-white px-1 rounded-lg absolute -left-5 cursor-pointer"
            size={"2.2rem"}
          />
          <button
            className="absolute right-3 bg-blue-600 text-white text-xl px-2 py-0.5 rounded-md"
            onClick={() => dispatch(logOut())}
          >
            Log out
          </button>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
