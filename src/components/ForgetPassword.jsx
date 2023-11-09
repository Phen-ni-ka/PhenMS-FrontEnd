import React, { useRef, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import axiosClient from "../axios-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";

export default function ForgetPassword() {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const payload = {
      email: emailRef.current.value,
    };
    setLoading(true);
    axiosClient
      .post("/forget-password", payload)
      .then(({ data }) => {
        toast.success(data.message);
      })
      .catch((err) => {
        const response = err.response;
        toast.error(response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="px-8 pb-8 pt-32 w-80">
      <ToastContainer theme="light" />
      <h2 className="text-xl font-bold mb-8">Đặt lại mật khẩu</h2>
      {loading && <BarLoader width="254" height={"6"} color="#0ea5e9" />}
      <form className="flex flex-col" onSubmit={onSubmitHandler}>
        <div className="relative">
          <TfiEmail className="absolute top-2 left-2.5 " size={"22"} />
          <input
            ref={emailRef}
            placeholder="Nhập email"
            className="border pl-10 pr-2 py-1.5 rounded-md mb-6 w-full"
            type="email"
          />
        </div>
        <button className="bg-blue-600 hover:bg-sky-400 py-1.5 rounded-lg text-white text-lg mb-4">
          Khôi phục mật khẩu
        </button>
      </form>
    </div>
  );
}
