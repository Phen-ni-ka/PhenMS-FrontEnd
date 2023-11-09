import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../axios-client";
import axios from "axios";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {
  const [student, setStudent] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const genderInputRef = useRef();
  const dobInputRef = useRef();
  const idCodeInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const provinceInputRef = useRef();
  const districtInputRef = useRef();
  const wardInputRef = useRef();
  const addressInputRef = useRef();
  const avatarInputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (avatarInputRef.current.files[0]) {
      const selectedFile = avatarInputRef.current.files[0];
      const blobValue = new Blob([selectedFile]);

      var formdata = new FormData();

      formdata.append("avatar", blobValue);

      axiosClient
        .post("upload-avatar", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Tải ảnh lên thành công ");
        })
        .catch(() => {
          toast.error("Tải ảnh lên thất bại ");
        });
    }

    const payload = {
      gender: genderInputRef.current.value,
      date_of_birth: dobInputRef.current.value,
      identity_code: idCodeInputRef.current.value,
      phone_number: phoneNumberInputRef.current.value,
      province: provinceInputRef.current.value ?? student.province,
      district: districtInputRef.current.value ?? student.district,
      ward: wardInputRef.current.value ?? student.ward,
      address: addressInputRef.current.value,
    };

    console.log(payload);

    axiosClient
      .put("update-profile", payload)
      .then(() => {
        toast.success("Cập nhật thông tin thành công");
      })
      .catch(() => {
        toast.error("Cập nhật thông tin thất bại!!!");
      });
  };

  useEffect(() => {
    axiosClient
      .get("/get-profile")
      .then(({ data }) => {
        setStudent(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getProvince = () => {
    axios
      .get("https://provinces.open-api.vn/api/?depth=1")
      .then(({ data }) => setProvinces(data));
  };

  const getDistrict = () => {
    const selectedProvince = provinces.find(
      (el) => el.name == provinceInputRef.current.value
    );
    if (provinces.length > 0) {
      axios
        .get(
          "https://provinces.open-api.vn/api/p/" +
            selectedProvince.code +
            "?depth=2"
        )
        .then(({ data }) => {
          setDistricts(data.districts);
        });
    }
  };

  const getWard = () => {
    const selectedDistrict = districts.find(
      (el) => el.name == districtInputRef.current.value
    );
    if (districts.length > 0) {
      axios
        .get(
          "https://provinces.open-api.vn/api/d/" +
            selectedDistrict.code +
            "?depth=2"
        )
        .then(({ data }) => {
          setWards(data.wards);
        });
    }
  };
  return (
    <div className="pt-6  px-4">
      <ToastContainer theme="light" />
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium text-gray-700">
          Chỉnh sửa thông tin
        </h1>
      </div>
      <form
        className="bg-white px-6 py-8 rounded-2xl mt-8"
        onSubmit={onSubmitHandler}
      >
        <h2>Thông tin sinh viên</h2>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          <div>
            <label className="font-medium ml-4 mb-1.5 block">Họ và tên</label>
            <input
              className="rounded-md w-full px-4 py-2 border-2 border-blue-200 "
              readOnly
              defaultValue={student.fullname}
            />
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">
              Mã sinh viên
            </label>
            <input
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
              readOnly
              defaultValue={student.student_code}
            />
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">Giới tính</label>
            <select
              ref={genderInputRef}
              className="rounded-md w-full px-4 py-2 border-2 border-blue-200 "
              defaultValue={student.gender_string}
            >
              <option value={1}>Nam</option>
              <option value={2}>Nữ</option>
            </select>
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">Ngày sinh</label>
            <input
              ref={dobInputRef}
              type="date"
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
              defaultValue={student.date_of_birth}
            />
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">Email</label>
            <input
              type="email"
              defaultValue={student.email}
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
              readOnly
            />
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">Căn cước</label>
            <input
              ref={idCodeInputRef}
              defaultValue={student.identity_code}
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
            />
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">
              Số điện thoại
            </label>
            <input
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
              ref={phoneNumberInputRef}
              defaultValue={student.phone_number}
            />
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">
              Khóa đào tạo
            </label>
            <input
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
              defaultValue={student.school_year}
              readOnly
            />
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">
              Chuyên ngành
            </label>
            <input
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
              readOnly
              defaultValue={student.major_name}
            />
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">
              Tỉnh/Thành phố
            </label>
            <select
              ref={provinceInputRef}
              onClick={getProvince}
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
            >
              <option value={student.province}>{student.province}</option>
              {provinces.map((el, key) => (
                <option key={key} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">Quận/Huyện</label>
            <select
              ref={districtInputRef}
              onClick={getDistrict}
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
              name={"Duy"}
            >
              <option value={student.district}>{student.district}</option>
              {districts.map((el, key) => (
                <option key={key} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-medium ml-4 mb-1.5 block">Phường/Xã</label>
            <select
              ref={wardInputRef}
              onClick={getWard}
              className="rounded-md w-full px-4 py-2.5 border-2 border-blue-200 "
              name={student.ward}
            >
              <option value={student.ward}>{student.ward}</option>
              {wards.map((el, key) => (
                <option value={el.name} key={key}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="font-medium ml-4 mb-1.5 block">Địa chỉ</label>
          <input
            ref={addressInputRef}
            className="rounded-md w-full px-4 py-4 border-2 border-blue-200 "
            defaultValue={student.address}
          />
        </div>
        <div className="mt-6 flex items-center justify-around">
          <div>
            <label className="font-medium ml-4 mb-1.5 block">Chọn ảnh</label>
            <input
              ref={avatarInputRef}
              type="file"
              className="rounded-md w-full px-4 py-4 border-4 border-blue-500 border-dashed file:bg-neutral-900 file:rounded-md file:text-white file:px-4 file:py-2 "
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg text-white font-medium bg-blue-600"
            >
              Xác nhận lưu
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
