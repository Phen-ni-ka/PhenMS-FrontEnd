import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./Layout/GuestLayout";
import DefaultLayout from "./Layout/DefaultLayout";
import Login from "./components/Login";
import Class from "./components/Class";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import Score from "./components/Score";
import Subscribe from "./components/Subscribe";
import Exam from "./components/Exam";
import SubscribeResult from "./components/SubscribeResult";
import Profile from "./components/Profile";
import Home from "./components/Home";
import SendMail from "./components/SendMail";
import IssueResult from "./components/IssueResult";
import EditProfile from "./components/EditProfile";
import ClassMate from "./components/ClassMate";
import ChangePassword from "./components/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/score",
        element: <Score />,
      },
      {
        path: "/subscribe",
        element: <Subscribe />,
      },
      {
        path: "/subscribe/:subject_id",
        element: <Class />,
      },
      {
        path: "/subscribe-result",
        element: <SubscribeResult />,
      },
      {
        path: "/subscribe-result/classmate/:classId",
        element: <ClassMate />,
      },
      {
        path: "/exam-schedule",
        element: <Exam />,
      },
      {
        path: "/send-mail",
        element: <SendMail />,
      },
      {
        path: "/mail-result",
        element: <IssueResult />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;
