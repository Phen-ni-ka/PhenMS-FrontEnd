import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PiPasswordFill } from "react-icons/pi";
import axiosClient from "../axios-client";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const payload = {
      token: searchParams[0].get("token"),
      email: searchParams[0].get("email"),
      password: newPasswordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    };

    axiosClient
      .post("reset-password", payload)
      .then(() => {
        toast.success("Thay đổi mật khẩu thành công");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error("Thay đổi mật khẩu thất bại");
      });
  };
  return (
    <div className="px-8 pb-8 pt-32 w-80">
      <ToastContainer theme="light" />
      <h2 className="text-xl font-bold mb-8">Xác nhận mật khẩu mới</h2>
      <form className="flex flex-col" onSubmit={onSubmitHandler}>
        <div className="relative">
          <PiPasswordFill className="absolute top-2 left-2.5 " size={"22"} />
          <input
            ref={newPasswordRef}
            placeholder="Nhập mật khẩu mới"
            className="border pl-10 pr-2 py-1.5 rounded-md mb-6 w-full"
            type="password"
          />
        </div>
        <div className="relative">
          <PiPasswordFill className="absolute top-2 left-2.5 " size={"22"} />
          <input
            ref={confirmPasswordRef}
            placeholder="Nhập lại mật khẩu mới"
            className="border pl-10 pr-2 py-1.5 rounded-md mb-6 w-full"
            type="password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-sky-400 py-1.5 rounded-lg text-white text-lg mb-4"
        >
          Khôi phục mật khẩu
        </button>
      </form>
    </div>
  );
}
