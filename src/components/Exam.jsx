import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Exam() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axiosClient
      .get("list-exams")
      .then((res) => setExams(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="pt-6 px-4">
      <h1 className="text-2xl font-medium text-gray-600">Lịch thi</h1>
      <div className="bg-white px-6 py-8 rounded-2xl mt-8">
        <table className="w-full text-left text-gray-500 dark:text-gray-400 shadow-lg">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Môn học
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày thi
              </th>
              <th scope="col" className="px-6 py-3">
                Bắt đầu
              </th>
              <th scope="col" className="px-6 py-3">
                Kết thúc
              </th>
              <th scope="col" className="px-6 py-3">
                Hình thức
              </th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr
                key={exam.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {exam.subject_name}
                </td>
                <td className="px-6 py-4">{exam.date}</td>
                <td className="px-6 py-4">{exam.start_time}</td>
                <td className="px-6 py-4">{exam.end_time}</td>
                <td className="px-6 py-4">Thực hành phòng máy</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
