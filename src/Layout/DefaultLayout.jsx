import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { logOut } from "../features/authSlice";
import { useDispatch } from "react-redux";
import {
  ImCalculator,
  ImHome,
  ImMail2,
  ImProfile,
  ImTable2,
} from "react-icons/im";
import { LiaMailBulkSolid } from "react-icons/lia";
import { RiPresentationLine } from "react-icons/ri";
import { PiExamBold } from "react-icons/pi";

export default function DefaultLayout() {
  const [isOpen, SetIsOpent] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="h-screen flex pt-2 relative">
      <aside
        className={
          "fixed bg-white h-screen z-10 top-0 pt-4 " + (isOpen ? "w-56" : "")
        }
      >
        <IoMenu
          className={
            "bg-blue-600 text-white px-1 rounded-lg absolute cursor-pointer " +
            (isOpen ? " -right-4" : " -right-10")
          }
          onClick={() => {
            SetIsOpent((preValue) => !preValue);
          }}
          size={"2.2rem"}
        />
        {isOpen ? (
          <img src="src\assets\logo.png" alt="logo" className="w-36 mx-5" />
        ) : (
          <img
            src="src\assets\logo-small.png"
            alt="logo"
            className="w-10 mx-5"
          />
        )}
        <p className="min-w-full mt-4 ml-8 mb-2">
          {isOpen ? "Menu chính" : ""}
        </p>
        <ul>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return (
                (isActive
                  ? "block border-l-8 border-blue-600 text-blue-600"
                  : "pl-2") + " block"
              );
            }}
          >
            <li className="flex items-center pl-6 py-3">
              <ImHome size={20} className="mr-2" />
              <span className={!isOpen && "hidden"}>Trang chủ</span>
            </li>
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) => {
              return (
                (isActive
                  ? "block border-l-8 border-blue-600 text-blue-600"
                  : "pl-2") + " block"
              );
            }}
          >
            <li className="flex items-center pl-6 py-3">
              <ImProfile size={20} className="mr-2" />
              <span className={!isOpen && "hidden"}>Sơ yếu lí lịch</span>
            </li>
          </NavLink>
          <NavLink
            to="score"
            className={({ isActive }) => {
              return (
                (isActive
                  ? "block border-l-8 border-blue-600 text-blue-600"
                  : "pl-2") + " block"
              );
            }}
          >
            <li className="flex items-center pl-6 py-3">
              <PiExamBold size={20} className="mr-2" />
              <span className={!isOpen && "hidden"}>Tra cứu điểm</span>
            </li>
          </NavLink>
          <NavLink
            to="subscribe"
            className={({ isActive }) => {
              return (
                (isActive
                  ? "block border-l-8 border-blue-600 text-blue-600"
                  : "pl-2") + " block"
              );
            }}
          >
            <li className="flex items-center pl-6 py-3">
              <ImCalculator size={20} className="mr-2" />
              <span className={!isOpen && "hidden"}>Đăng ký học</span>
            </li>
          </NavLink>
          <NavLink
            to="subscribe-result"
            className={({ isActive }) => {
              return (
                (isActive
                  ? "block border-l-8 border-blue-600 text-blue-600"
                  : "pl-2") + " block"
              );
            }}
          >
            <li className="flex items-center pl-6 py-3">
              <RiPresentationLine size={20} className="mr-2" />
              <span className={!isOpen && "hidden"}>Kết quả đăng kí</span>
            </li>
          </NavLink>
          <NavLink
            to="exam-schedule"
            className={({ isActive }) => {
              return (
                (isActive
                  ? "block border-l-8 border-blue-600 text-blue-600"
                  : "pl-2") + " block"
              );
            }}
          >
            <li className="flex items-center pl-6 py-3">
              <ImTable2 size={20} className="mr-2" />
              <span className={!isOpen && "hidden"}>Tra cứu lịch thi</span>
            </li>
          </NavLink>
        </ul>
        <ul className="absolute bottom-4">
          <NavLink
            to="send-mail"
            className={({ isActive }) => {
              return (
                (isActive
                  ? "block border-l-8 border-blue-600 text-blue-600"
                  : "pl-2") + " block"
              );
            }}
          >
            <li className="flex items-center pl-6 py-3">
              <ImMail2 size={20} className="mr-2" />
              <span className={!isOpen && "hidden"}>Gửi ý kiến</span>
            </li>
          </NavLink>
          <NavLink
            to="mail-result"
            className={({ isActive }) => {
              return (
                (isActive
                  ? "block border-l-8 border-blue-600 text-blue-600"
                  : "pl-2") + " block"
              );
            }}
          >
            <li className="flex items-center pl-6 py-3">
              <LiaMailBulkSolid size={20} className="mr-2" />
              <span className={!isOpen && "hidden"}>Tình trạng thư</span>
            </li>
          </NavLink>
        </ul>
      </aside>
      <div className={"content flex-grow " + (isOpen ? "ml-56" : "ml-20")}>
        <header className="bg-white h-10 flex justify-end">
          <button
            className={
              " hover:text-blue-500 px-2 py-0.5 rounded-md" +
              (location.pathname === "/change-password"
                ? " text-blue-500"
                : " text-black")
            }
          >
            <Link to="change-password">Đổi mật khẩu</Link>
          </button>
          <button
            className=" text-black hover:text-blue-500 px-2 py-0.5 rounded-md"
            onClick={() => dispatch(logOut())}
          >
            Đăng xuất
          </button>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
