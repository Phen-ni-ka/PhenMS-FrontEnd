import { GoogleLogin } from "@react-oauth/google";
import { setToken, setUser } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { PiPasswordFill } from "react-icons/pi";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);
  const onSubmitHandle = (event) => {
    event.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        console.log(data);
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">Chào mừng đến Phenikaa MS</h2>
      <h3 className="text-lg font-medium mt-10 mb-5">Đăng nhập</h3>
      <form className="flex flex-col" onSubmit={onSubmitHandle}>
        <div className="relative">
          <TfiEmail className="absolute top-2 left-2.5 " size={"22"} />
          <input
            ref={emailRef}
            placeholder="Nhập email"
            className="border pl-10 pr-2 py-1.5 rounded-md mb-4 w-full"
          />
        </div>
        <div className="relative">
          <PiPasswordFill className="absolute top-2 left-2.5 " size={"22"} />
          <input
            ref={passwordRef}
            placeholder="Nhập mật khẩu"
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
            axiosClient.post("/login-with-google", res).then((res) => res);
            // dispatch(setToken(res.credential));
          }}
        />
      </div>
    </div>
  );
}
