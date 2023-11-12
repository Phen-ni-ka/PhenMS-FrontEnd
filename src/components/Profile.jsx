import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Profile() {
  const [student, setStudent] = useState({});
  useEffect(() => {
    axiosClient
      .get("/get-profile")
      .then(({ data }) => {
        setStudent(data);
      })
      .catch((err) => console.log(err.response));
  }, []);
  return (
    <div className="pt-6 px-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium text-gray-700">Sơ yếu lí lịch</h1>
        <Link
          to="/edit-profile"
          className="bg-blue-600 px-8 py-2 font-medium text-white rounded-lg text-xl mr-10"
        >
          Chỉnh sửa
        </Link>
      </div>
      <div className="bg-white px-6 py-8 rounded-2xl mt-8 flex">
        <div className="w-40 h-48">
          <img
            className="w-full h-full object-cover"
            src={
              student.avatar_url ??
              "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            }
          />
        </div>
        <div className="ml-8 w-full">
          <h2 className="text-lg uppercase font-semibold">Thông tin cơ bản</h2>
          <div className="w-full bg-blue-600 mt-1 mb-4 opacity-75 h-1" />
          <div>
            <div className="grid grid-cols-3 gap-y-8">
              <div>
                <p className={"text-lg font-medium"}>Mã sinh viên</p>
                <p>{student.student_code ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Họ và tên</p>
                <p>{student.fullname ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Giới tính</p>
                <p>{student.gender_string ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Ngày sinh</p>
                <p>{student.date_of_birth ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Email</p>
                <p>{student.email ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Mã căn cước</p>
                <p>{student.identity_code ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Chuyên ngành</p>
                <p>{student.major_name ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Khóa đào tạo</p>
                <p>{student.school_year ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Số điện thoại</p>
                <p>{student.phone_number ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Tỉnh/Thành phố</p>
                <p>{student.province ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Quận/Huyện</p>
                <p>{student.district ?? "---"}</p>
              </div>
              <div>
                <p className={"text-lg font-medium"}>Phường/Xã</p>
                <p>{student.ward ?? "---"}</p>
              </div>
            </div>
            <div className="mt-8 ">
              <span className="text-lg font-medium">Địa chỉ: </span>
              {student.address ?? "---"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
