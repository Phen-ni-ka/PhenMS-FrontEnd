import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../axios-client";
export default function ChangePassword() {
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const payload = {
      current_password: currentPassword.current.value,
      new_password: newPassword.current.value,
      confirm_password: confirmPassword.current.value,
    };

    axiosClient
      .post("change-password", payload)
      .then(() => {
        toast.success("Thay đổi mật khẩu thành công");
      })
      .catch(() => {
        toast.success("Thay đổi mật khẩu thất bại");
      });
  };
  return (
    <div className="pt-6 px-8 h-screen">
      <ToastContainer theme="light" />
      <h1 className="text-2xl font-medium text-gray-700">Thay đổi mật khẩu</h1>
      <div className="w-full h-full flex justify-center items-center">
        <form
          className="bg-white p-12 rounded-lg mb-32"
          onSubmit={onSubmitHandler}
        >
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">
              Mật khẩu hiện tại
            </label>
            <input
              ref={currentPassword}
              className="px-4 py-2 w-80 border-2 rounded border-gray-300"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">
              Mật khẩu mới
            </label>
            <input
              ref={newPassword}
              className="px-4 py-2 w-80 border-2 rounded border-gray-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium">
              Xác nhận mât khẩu mới
            </label>
            <input
              ref={confirmPassword}
              className="px-4 py-2 w-80 border-2 rounded border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 w-full rounded-lg py-2 text-white hover:opacity-80 mt-8"
          >
            Xác nhận thay đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}
