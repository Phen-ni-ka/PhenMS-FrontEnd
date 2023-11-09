import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function SubscribeResult() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/list-subscribed-classes")
      .then((res) => {
        console.log(res.data);
        setClasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pt-6 px-4">
      <h1 className="text-2xl font-medium text-gray-600">Kết quả đăng ký</h1>
      <div className="bg-white px-6 py-8 rounded-2xl mt-8">
        <table className="w-full text-left text-gray-500 dark:text-gray-400 shadow-lg">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Môn học
              </th>
              <th scope="col" className="px-6 py-3">
                Tối đa
              </th>
              <th scope="col" className="px-6 py-3">
                Còn trống
              </th>
              <th scope="col" className="px-6 py-3">
                Giảng viên
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((el) => (
              <tr
                key={el.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {el.class_name}
                </td>
                <td className="px-6 py-4">{el.max_students}</td>
                <td className="px-6 py-4">{el.remain_slot}</td>
                <td className="px-6 py-4">{el.teacher_name}</td>
                <td className="px-6 py-4">{el.student_class_status_string}</td>
                <td className="px-6 py-4">
                  <button className="hover:text-blue-500">
                    <Link to={"classmate/" + el.id}>Xem danh sách lớp</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
