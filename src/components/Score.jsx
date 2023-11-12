import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Modal from "react-modal";

Modal.setAppElement("#root");
export default function Score() {
  const [subjects, setSubjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scoreDetail, setScoreDetail] = useState({
    subjectName: null,
    theoreticalScore: null,
    midtermScore: null,
    finalScore: null,
    scoreNumber: null,
  });
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            backgroundColor: "rgb(128,128,128, 0.5)",
          },
          content: {
            position: "absolute",
            top: "20rem",
            left: "30rem",
            right: "20rem",
            bottom: "20rem",
            height: "fit-content",
            minWidth: "fit-content",
            border: "1px solid #ccc",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "16px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <table className="w-full text-left text-gray-500 dark:text-gray-400 shadow-lg">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Môn
              </th>
              <th scope="col" className="px-6 py-3">
                Điểm lí thuyết
              </th>
              <th scope="col" className="px-6 py-3">
                Điểm giữa kì
              </th>
              <th scope="col" className="px-6 py-3">
                Điểm cuối kì
              </th>
              <th scope="col" className="px-6 py-3">
                Điểm tổng kết
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {scoreDetail.subjectName}
              </td>
              <td className="px-6 py-4">{scoreDetail.theoreticalScore}</td>
              <td className="px-6 py-4">{scoreDetail.midtermScore}</td>
              <td className="px-6 py-4">{scoreDetail.finalScore}</td>
              <td className="px-6 py-4">{scoreDetail.scoreNumber}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
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
                Điểm thang chữ
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
                  <button
                    className="hover:text-blue-500"
                    onClick={() => {
                      setScoreDetail({
                        subjectName: el.subject_name,
                        theoreticalScore: el.theoretical_score,
                        midtermScore: el.midterm_score,
                        finalScore: el.final_score,
                        scoreNumber: el.score_number,
                      });
                      setModalIsOpen(true);
                    }}
                  >
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
