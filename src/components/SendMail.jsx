import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import axiosClient from "../axios-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SendMail() {
  const editor = useRef();
  const title = useRef();
  const navigate = useNavigate();

  const sendEmail = (event) => {
    event.preventDefault();
    const payload = {
      title: title.current.value,
      detail: editor.current.value,
    };

    axiosClient
      .post("send-issue", payload)
      .then(() => {
        toast.success("Đã gửi thành công");
        // navigate("/mail-result");
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Không gửi thành công");
      });
  };
  return (
    <div className="pt-6 px-4">
      <ToastContainer theme="light" />
      <h1 className="text-xl font-medium text-gray-700">Gửi báo cáo</h1>
      <form
        className="bg-white flex flex-col justify-center px-6 py-8 rounded-2xl mt-8"
        onSubmit={sendEmail}
      >
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2">Tiêu đề</label>
          <input className="border-2 w-full p-2 rounded" ref={title} />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Nội dung</label>
          <JoditEditor className="" ref={editor} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 p-3 rounded-lg text-white text-lg font-semibold mt-8"
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
