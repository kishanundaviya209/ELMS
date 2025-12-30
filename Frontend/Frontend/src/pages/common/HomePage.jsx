// import { useEffect, useState } from 'react';
// import { authHook } from '../../store/authStore';
// import { getDepartmentById } from '../../api/departmentAPI';

// export default function HomePage() {
//   const { user } = authHook();
//   const [department, setDepartment] = useState('');

//    useEffect(() => {
//     if (user?.departmentId) {
//       getDepartmentById(user.departmentId)
//         .then(res => {
//           setDepartment(res.data.departmentName);
//         })
//         .catch(() => setDepartment("Not assigned"));
//     }
//   }, [user]);

//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       <p>Hello, {user?.fullName || 'Guest'}!</p>
//       <p>Your Email: {user?.email}</p>
//       <p>Your Department: {department || 'Not assigned'}</p>
//     </div>
//   )
// }


// ===============================================================================================================================

// import { useEffect, useState } from "react";
// import { authHook } from "../../store/authStore";
// import { getDepartmentById } from "../../api/departmentAPI";

// export default function HomePage() {
//   const { user } = authHook();
//   const [department, setDepartment] = useState("");

//   useEffect(() => {
//     if (user?.departmentId) {
//       getDepartmentById(user.departmentId)
//         .then((res) => setDepartment(res.data.departmentName))
//         .catch(() => setDepartment("Not assigned"));
//     }
//   }, [user]);

//   return (
//     <div className="container-fluid bg-light min-vh-100 py-5">
//       <div className="container">
//         <div className="card shadow border-0 mb-4">
//           <div className="card-body d-flex align-items-center">
//             <div
//               className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-4"
//               style={{ width: 80, height: 80, fontSize: 30 }}
//             >
//               {user?.fullName?.charAt(0) || "G"}
//             </div>

//             <div>
//               <h4 className="mb-1">{user?.fullName || "Guest User"}</h4>
//               <p className="mb-0 text-muted">{user?.email}</p>
//             </div>
//           </div>
//         </div>

//         <div className="row g-4">
//           {user?.role !== "Admin" && (
//             <div className="col-md-6">
//               <div className="card shadow-sm border-0 h-100">
//                 <div className="card-body text-center">
//                   <h6 className="text-muted">Department</h6>
//                   <h5 className="mt-3 text-success">
//                     {department || "Not assigned"}
//                   </h5>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="col-md-6">
//             <div className="card shadow-sm border-0 h-100">
//               <div className="card-body text-center">
//                 <h6 className="text-muted">Role</h6>
//                 <h5 className="mt-3 text-primary">{user?.role || "N/A"}</h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ============================================================================================================

import { useEffect, useState } from "react";
import { authHook } from "../../store/authStore";
import { getDepartmentById, getAllDepartments } from "../../api/departmentAPI";
import { getAllLeaves, getLeaveByUserId } from "../../api/leaveRequestAPI";
import { getUsers } from "../../api/userAPI";
import { Link, Navigate } from "react-router-dom";
import "../../css/common/HomePage.css";

export default function HomePage() {
  const { user } = authHook();

  const [department, setDepartment] = useState("");

  // USER
  const [usedLeaves, setUsedLeaves] = useState(0);

  // ADMIN
  const [pendingCount, setPendingCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);

  /* ================= DEPARTMENT ================= */
  useEffect(() => {
    if (user?.departmentId) {
      getDepartmentById(user.departmentId)
        .then((res) => setDepartment(res.data.departmentName))
        .catch(() => setDepartment("Not assigned"));
    }
  }, [user]);

  /* ================= USER LEAVE LOGIC ================= */
  useEffect(() => {
    if (user?.role === "User") {
      loadUserLeaves();
    }
  }, [user]);

  const loadUserLeaves = async () => {
    try {
      const res = await getLeaveByUserId(user.userId);

      const approvedLeaves = res.data.filter(
        (leave) => leave.status === "Approved"
      );

      let totalUsed = 0;

      approvedLeaves.forEach((leave) => {
        const from = new Date(leave.fromDate);
        const to = new Date(leave.toDate);

        const days =
          Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) +
          1;

        totalUsed += days;
      });

      setUsedLeaves(totalUsed);
    } catch (error) {
      console.error("Failed to load user leaves", error);
    }
  };

  /* ================= ADMIN LOGIC ================= */
  useEffect(() => {
    if (user?.role === "Admin") {
      loadAdminDashboard();
    }
  }, [user]);

  const loadAdminDashboard = async () => {
    try {
      const leavesRes = await getAllLeaves();
      const usersRes = await getUsers();
      const deptRes = await getAllDepartments();

      setPendingCount(
        leavesRes.data.filter((l) => l.status === "Pending").length
      );

      setEmployeeCount(usersRes.data.length - 1); // exclude admin

      setDepartmentCount(deptRes.data.length);
    } catch (error) {
      console.error("Failed to load admin dashboard", error);
    }
  };

  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="home-page">
      <div className="container">
        {/* ================= WELCOME BAR ================= */}
        <div className="card welcome-card shadow-sm mb-4">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1">Welcome, {user.fullName} 👋</h4>
              <p className="text-muted mb-0">
                {user?.role === "User" ? "Employee": "Admin"}
                {user.role !== "Admin" && ` | ${department || "No Department"}`}
              </p>
              <p className="text-muted mb-0">{user.email}</p>
            </div>

            <div className="user-avatar">{user.fullName?.charAt(0)}</div>
          </div>
        </div>

        {/* ================= ADMIN DASHBOARD ================= */}
        {user.role === "Admin" && (
          <>
            <h5 className="mb-3">Admin Details</h5>

            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body">
                    <h6 className="text-muted">Employees</h6>
                    <h2 className="text-primary fw-bold">{employeeCount}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body">
                    <h6 className="text-muted">Pending Requests</h6>
                    <h2 className="text-warning fw-bold">{pendingCount}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body">
                    <h6 className="text-muted">Departments</h6>
                    <h2 className="text-info fw-bold">{departmentCount}</h2>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
