import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Subscribe() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/list-subscribable-subjects")
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="pt-6 px-4">
      <h1 className="text-xl font-medium text-gray-700">
        Các môn có thể đăng ký
      </h1>
      <div className="ml-10 py-8 rounded-2xl grid grid-cols-4 gap-y-6">
        {subjects.map((subject) => (
          <div
            className={
              "w-56 bg-white rounded-lg pt-2 overflow-hidden shadow-lg"
            }
            key={subject.id}
          >
            <p className=" bg-blue-600 p-3 h-16 flex mx-4 items-center justify-center text-center rounded-xl shadow-md shadow-blue-300 text-white m-3 font-semibold">
              {subject.name}
            </p>
            <div className="bg-white rounded-lg text-center text-sm">
              <p>
                Tổng số tiết lí thuyết:{" "}
                <strong>{subject.total_period_theory}</strong>
              </p>
              <p>
                Tổng số tiết thực hành:{" "}
                <strong>{subject.total_period_practice}</strong>
              </p>
              <p>
                Số tín chỉ: <strong>{subject.credit}</strong>
              </p>
              <p>
                Kỳ học khuyến khích: <strong>{subject.semester}</strong>
              </p>
              <div className="flex justify-between items-center px-4 mt-4 w-full h-12 bg-sky-100 relative">
                <p className="text-xs">Dành cho K{subject.school_year}</p>
                <Link to={"" + subject.id}>
                  <button className="bg-blue-600 text-white hover:opacity-80 font-medium rounded-lg shadow-md shadow-blue-300 px-6 py-1.5">
                    Đăng ký
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
