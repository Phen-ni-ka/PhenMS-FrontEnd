import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

export default function ClassMate() {
  const { classId } = useParams();
  const [classMates, setClassMates] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/classmates/" + classId)
      .then((res) => {
        console.log(res.data);
        setClassMates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pt-6 px-4">
      <h1 className="text-2xl font-medium text-gray-600">Danh sách lớp</h1>
      <div className="bg-white px-6 py-8 rounded-2xl mt-8">
        <table className="w-full text-left text-gray-500 dark:text-gray-400 shadow-lg">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Họ và tên
              </th>
              <th scope="col" className="px-6 py-3">
                Mã sinh viên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {classMates.map((el) => (
              <tr
                key={el.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {el.fullname}
                </td>
                <td className="px-6 py-4">{el.student_code}</td>
                <td className="px-6 py-4">{el.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
