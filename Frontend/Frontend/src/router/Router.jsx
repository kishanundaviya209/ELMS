// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AuthLayout from "../layout/AuthLayout.jsx";
// import RegisterPage from "../pages/auth/RegisterPage.jsx";
// import LoginPage from "../pages/auth/LoginPage.jsx";
// import HomeLayout from "../layout/HomeLayout.jsx";
// import HomePage from "../pages/common/HomePage.jsx";
// import ListDepartment from "../pages/department/ListDepartment.jsx";
// import CreateDepartment from "../pages/department/CreateDepartment.jsx";
// import EditDepartment from "../pages/department/EditDepartment.jsx";
// import LeaveRequestForm from "../pages/leaveRequest/user/LeaveRequestForm.jsx";
// import UpdateLeaveRequestForm from "../pages/leaveRequest/admin/UpdateLeaveRequest.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AuthLayout />,
//     children: [
//       {
//         index: true,
//         element: <LoginPage />,
//       },
//       {
//         path: "/register",
//         element: <RegisterPage />,
//       },
//     ],
//   },
//   {
//     path: "/home",
//     element: <HomeLayout />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: "department",
//         element: <ListDepartment />,
//       },
//       {
//         path: "department/create",
//         element: <CreateDepartment />,
//       },
//       {
//         path: "department/edit/:id",
//         element: <EditDepartment />,
//       },
//       {
//         path: "leaverequest",
//         element: <LeaveRequestForm />,
//       },
//       {
//         path: "leaverequest/admin",
//         element: <UpdateLeaveRequestForm />,
//       },
//       // {
//       //   path: "leave/filter",
//       //   element: <LeaveFilter />,
//       // }
//     ],
//   },
// ]);

// export default function Router() {
//   return <RouterProvider router={router} />;
// }

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "../layout/AuthLayout.jsx";
import HomeLayout from "../layout/HomeLayout.jsx";

import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import HomePage from "../pages/common/HomePage.jsx";

import ListDepartment from "../pages/department/ListDepartment.jsx";
import CreateDepartment from "../pages/department/CreateDepartment.jsx";
import EditDepartment from "../pages/department/EditDepartment.jsx";

import LeaveRequestForm from "../pages/leaveRequest/user/LeaveRequestForm.jsx";
import UpdateLeaveRequestForm from "../pages/leaveRequest/admin/UpdateLeaveRequest.jsx";

import RoleRoute from "../store/RoleRoute.jsx";

import ResetPassword from "../pages/auth/ResetPassword.jsx";
import VerifyEmail from "../pages/auth/VerifyEmail.jsx";
import ListUser from "../pages/user/ListUser.jsx";
import CreateUser from "../pages/user/CreateUser.jsx";
import UpdateUser from "../pages/user/UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "user",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <ListUser />
          </RoleRoute>
        ),
      },
      {
        path: "user/create",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <CreateUser />
          </RoleRoute>
        ),
      },
      {
        path: "user/edit/:id",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <UpdateUser />
          </RoleRoute>
        ),
      },
      {
        path: "department",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <ListDepartment />
          </RoleRoute>
        ),
      },
      {
        path: "department/create",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <CreateDepartment />
          </RoleRoute>
        ),
      },
      {
        path: "department/edit/:id",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <EditDepartment />
          </RoleRoute>
        ),
      },
      {
        path: "leaverequest/admin",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <UpdateLeaveRequestForm />
          </RoleRoute>
        ),
      },
      {
        path: "leaverequest",
        element: (
          <RoleRoute allowedRoles={["User"]}>
            <LeaveRequestForm />
          </RoleRoute>
        ),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
