import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },
    
    

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
 
]);
