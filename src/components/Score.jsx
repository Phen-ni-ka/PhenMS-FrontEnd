import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Score() {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/list-scores")
      .then((res) => {
        console.log(res.data);
        setSubjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="pt-6 px-4">
      <h1 className="text-2xl font-medium text-gray-600">Tra cứu điểm</h1>
      <div className="bg-white px-6 py-8 rounded-2xl mt-8">
        <table className="w-full text-left text-gray-500 dark:text-gray-400 shadow-lg">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Môn học
              </th>
              <th scope="col" className="px-6 py-3">
                Điểm thang 10
              </th>
              <th scope="col" className="px-6 py-3">
                Điểm thang 4
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((el) => (
              <tr
                key={el.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {el.subject_name}
                </td>
                <td className="px-6 py-4">{el.score_number}</td>
                <td className="px-6 py-4">{el.score_string}</td>
                <td className="px-6 py-4">{el.teacher_name}</td>
                <td className="px-6 py-4">
                  <button className="hover:text-blue-500">
                    Xem điểm chi tiết
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
