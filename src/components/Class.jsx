import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Class() {
  const params = useParams();
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/list-subscribable-classes?subject_id=" + params.subject_id)
      .then((res) => {
        console.log(res);
        setClasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickHandle = (event, id) => {
    event.preventDefault();

    axiosClient
      .post("/subscribe-class", {
        class_id: id,
      })
      .then(() => {
        toast.success("Đăng ký thành công");
      })
      .catch((err) => {
        const response = err.response;
        toast.error(response.data.message);
      });
  };
  return (
    <div className="pt-6 px-4">
      <ToastContainer theme="light" />
      <h1 className="text-xl font-medium text-gray-700">
        Các lớp có thể đăng ký
      </h1>
      <div className="ml-4 py-8 rounded-2xl grid grid-cols-3 gap-y-6">
        {classes.map((el) => (
          <div
            className=" bg-white w-72 rounded-xl overflow-hidden shadow-lg"
            key={el.id}
          >
            <div className="flex justify-center items-center font-light bg-sky-100 w-full h-10 mb-4 text-center">
              <p>{el.class_name}</p>
            </div>
            <div className="flex mb-4 mx-4">
              <div>
                <div className="w-24 h-24 rounded-lg bg-red-200 overflow-hidden shadow-md shadow-blue-300">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      el.avatar_url ??
                      "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg"
                    }
                    alt="ảnh giảng viên"
                  />
                </div>
              </div>
              <div className="ml-4 flex-1 flex flex-col justify-between">
                <p className="font-semibold">{el.teacher_name}</p>
                <div className="bg-sky-100 rounded-lg justify-around flex shadow-md shadow-blue-300 text-sm py-2 text-center">
                  <div>
                    <p>Còn trống</p>
                    <p className="text-blue-600 font-semibold">
                      {el.remain_slot}
                    </p>
                  </div>
                  <div>
                    <p>Tổng</p>
                    <p className="text-blue-600 font-semibold">
                      {el.max_students}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-4 my-3">
              <button
                className="w-full bg-blue-500 py-1.5 hover:opacity-80 rounded-lg text-white font-medium shadow-md shadow-blue-300"
                onClick={() => onClickHandle(event, el.id)}
              >
                Đăng ký
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
