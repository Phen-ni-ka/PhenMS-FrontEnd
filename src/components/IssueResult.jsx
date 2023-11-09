import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import HTMLReactParser from "html-react-parser";

export default function IssueResult() {
  const [issues, setIsssues] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/list-issues")
      .then((res) => {
        console.log(res.data);
        setIsssues(res.data);
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
                Tiêu đề
              </th>
              <th scope="col" className="px-6 py-3">
                Nội dung
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {issues.map((el) => (
              <tr
                key={el.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {el.title}
                </td>
                <td className="px-6 py-4">{HTMLReactParser(el.detail)}</td>
                <td className="px-6 py-4">{el.status_string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
