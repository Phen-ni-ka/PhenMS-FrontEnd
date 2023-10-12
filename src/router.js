import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./Layout/GuestLayout";
import DefaultLayout from "./Layout/DefaultLayout";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgetPassword from "./components/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
    ],
  },
]);

export default router;
