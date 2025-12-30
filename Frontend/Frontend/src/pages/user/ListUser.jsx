import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../../api/userAPI";
import { getAllDepartments } from "../../api/departmentAPI";
import { authHook } from "../../store/authStore";
import "../../../src/css/user/listUser.css"

export default function ListUser() {
  const { user } = authHook();
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const usersRes = await getUsers();
      const deptRes = await getAllDepartments();

      const filteredUsers = usersRes.data.filter(
        (u) => u.email !== "admin@gmail.com"
      );

      setUsers(filteredUsers);
      setDepartments(deptRes.data);
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  const getDepartmentName = (id) => {
    const dept = departments.find((d) => d.departmentId === id);
    return dept ? dept.departmentName : "-";
  };

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure?")) return;

  //   await deleteUser(id);
  //   setUsers(users.filter((u) => u.id !== id));
  // };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "User cannot be deleted because leave requests exist."
      );
    }
  };

  // return (
  //   <div className="container mt-5">
  //     <div className="card shadow-lg p-4" style={{ borderRadius: "15px" }}>
  //       <div className="d-flex justify-content-between mb-3">
  //         <h3 className="fw-bold text-primary">User List</h3>

  //         {user?.role === "Admin" && (
  //           <Link to="/home/user/create" className="btn btn-success">
  //             Add User
  //           </Link>
  //         )}
  //       </div>

  //       <table className="table table-bordered table-hover text-center">
  //         <thead className="table-dark">
  //           <tr>
  //             <th>#</th>
  //             <th>Full Name</th>
  //             <th>Email</th>
  //             <th>Department</th>
  //             {user?.role === "Admin" && <th>Action</th>}
  //           </tr>
  //         </thead>

  //         <tbody>
  //           {users.length === 0 ? (
  //             <tr>
  //               <td colSpan="5">No users found</td>
  //             </tr>
  //           ) : (
  //             users.map((u, index) => (
  //               <tr key={u.id}>
  //                 <td>{index + 1}</td>
  //                 <td>{u.fullName}</td>
  //                 <td>{u.email}</td>
  //                 <td>{getDepartmentName(u.departmentId)}</td>

  //                 {user?.role === "Admin" && (
  //                   <td>
  //                     <Link
  //                       to={`/home/user/edit/${u.id}`}
  //                       className="btn btn-primary btn-sm me-2"
  //                     >
  //                       Edit
  //                     </Link>
  //                     <button
  //                       className="btn btn-danger btn-sm"
  //                       onClick={() => handleDelete(u.id)}
  //                     >
  //                       Delete
  //                     </button>
  //                   </td>
  //                 )}
  //               </tr>
  //             ))
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );

  return (
    <div className="container mt-2 py-4">
      <div className="user-card">
        {/* Header */}
        <div className="user-header">
          <h3 className="user-title">Employee Management</h3>

          {user?.role === "Admin" && (
            <Link to="/home/user/create" className="btn btn-user-add">
              + Add Employee
            </Link>
          )}
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table user-table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                {user?.role === "Admin" && (
                  <th className="text-center">Action</th>
                )}
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u, index) => (
                  <tr key={u.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{u.fullName}</td>
                    <td className="text-muted">{u.email}</td>
                    <td>
                      <span className="badge bg-light text-dark px-3 py-2">
                        {getDepartmentName(u.departmentId)}
                      </span>
                    </td>

                    {user?.role === "Admin" && (
                      <td className="text-center">
                        <Link
                          to={`/home/user/edit/${u.id}`}
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(u.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
