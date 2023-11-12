import { GoogleLogin } from "@react-oauth/google";
import { setToken, setUser } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { PiPasswordFill } from "react-icons/pi";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../axios-client";

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmitHandle = (event) => {
    event.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        console.log(data);
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
      })
      .catch((err) => {
        const response = err.response;
        toast.error(response.data.message);
      });
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">Chào mừng đến Phenikaa MS</h2>
      <h3 className="text-lg font-medium mt-10 mb-5">Đăng nhập</h3>
      <ToastContainer theme="light" />
      <form className="flex flex-col" onSubmit={onSubmitHandle}>
        <div className="relative">
          <TfiEmail className="absolute top-2 left-2.5 " size={"22"} />
          <input
            ref={emailRef}
            placeholder="Nhập email"
            type="email"
            className="border pl-10 pr-2 py-1.5 rounded-md mb-4 w-full"
          />
        </div>
        <div className="relative">
          <PiPasswordFill className="absolute top-2 left-2.5 " size={"22"} />
          <input
            ref={passwordRef}
            placeholder="Nhập mật khẩu"
            type="password"
            className="border pl-10 pr-2 py-1.5 rounded-md w-full"
          />
        </div>

        <Link
          className="text-center my-4 text-sky-600 text-base"
          to={"/forget-password"}
        >
          Quên mật khẩu
        </Link>
        <button className="bg-blue-600 py-1.5 rounded-lg text-white text-lg">
          Đăng nhập
        </button>
      </form>
      <div className="flex items-center my-3">
        <div className="w-full h-0.5 bg-gray-300" />
        <span className="mx-3">Hoặc</span>
        <div className="w-full h-0.5 bg-gray-300" />
      </div>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={(res) => {
            axiosClient
              .post("/login-with-google", { token: res.credential })
              .then(({ data }) => {
                dispatch(setUser(data.user));
                dispatch(setToken(data.token));
              })
              .catch((err) => {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
              });
          }}
        />
      </div>
    </div>
  );
}
