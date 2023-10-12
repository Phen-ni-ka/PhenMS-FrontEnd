import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <div className="px-8 pb-8 pt-32 w-80">
      <h2 className="text-xl font-bold mb-8">Đặt lại mật khẩu</h2>
      <form className="flex flex-col">
        <div className="relative">
          <TfiEmail className="absolute top-2 left-2.5 " size={"22"} />
          <input
            placeholder="Nhập email"
            className="border pl-10 pr-2 py-1.5 rounded-md mb-6 w-full"
          />
        </div>
        <button className="bg-blue-600 hover:bg-sky-400 py-1.5 rounded-lg text-white text-lg mb-4">
          Khôi phục mật khẩu
        </button>
      </form>
      <Link to={"/login"}>
        <button className="bg-sky-400  hover:bg-blue-600 py-1.5 rounded-lg text-white text-lg w-full">
          Đăng nhập
        </button>
      </Link>
    </div>
  );
}
