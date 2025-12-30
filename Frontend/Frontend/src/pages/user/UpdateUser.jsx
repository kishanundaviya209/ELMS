import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, updateUser } from "../../api/userAPI";
import { getAllDepartments } from "../../api/departmentAPI";
import "../../css/user/editUser.css"

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    departmentId: "",
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const userRes = await getUsers();
      const deptRes = await getAllDepartments();

      setDepartments(deptRes.data);

      const selectedUser = userRes.data.find((u) => u.id == id);

      if (selectedUser) {
        setUser({
          fullName: selectedUser.fullName,
          email: selectedUser.email,
          departmentId: selectedUser.departmentId || "",
        });
      }
    } catch {
      setError("Failed to load user");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.fullName.trim()) {
      setError("Full Name is required");
      return;
    }

    if (!user.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!user.departmentId) {
      setError("Department is required");
      return;
    }

    try {
      await updateUser(id, {
        fullName: user.fullName.trim(),
        departmentId: user.departmentId || null,
      });

      alert("User updated successfully");
      navigate("/home/user");
    } catch {
      setError("Failed to update user");
    }
  };

  // return (
  //   <div className="d-flex justify-content-center mt-5">
  //     <div className="card shadow-lg p-4" style={{ width: "500px" }}>
  //       <h3 className="text-center text-primary">Edit User</h3>

  //       {error && <div className="alert alert-danger text-center">{error}</div>}

  //       <form onSubmit={handleSubmit}>
  //         <input
  //           className="form-control mb-3"
  //           name="fullName"
  //           value={user.fullName}
  //           onChange={handleChange}
  //         />

  //         <input className="form-control mb-3" value={user.email} disabled />

  //         <select
  //           className="form-select mb-3"
  //           name="departmentId"
  //           value={user.departmentId}
  //           onChange={handleChange}
  //         >
  //           <option value="">-- Select Department --</option>
  //           {departments.map((d) => (
  //             <option key={d.departmentId} value={d.departmentId}>
  //               {d.departmentName}
  //             </option>
  //           ))}
  //         </select>

  //         <button className="btn btn-primary w-100">Edit User</button>
  //       </form>
  //     </div>
  //   </div>
  // );






  return (
  <div className="elms-page-container">
    <div className="create-page-wrapper">
      <div className="modern-form-card">
        {/* Left Sidebar */}
        <div className="form-sidebar edit-mode">
          <div className="edit-badge">
            <i className="bi bi-person-gear"></i>
          </div>
          <h2>Edit Employee</h2>
          <p className="mt-3 opacity-75">
            Update employee information and department assignment.
          </p>
        </div>

        {/* Right Form */}
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <h4 className="fw-bold mb-4 text-dark">Employee Information</h4>

            {error && (
              <div className="alert alert-light border-danger text-danger py-2 small d-flex align-items-center">
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                {error}
              </div>
            )}

            <div className="input-group-custom">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. John Doe"
                value={user.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group-custom">
              <label>Email Address</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="disabled-input"
              />
            </div>

            <div className="input-group-custom">
              <label>Department</label>
              <select
                name="departmentId"
                value={user.departmentId}
                onChange={handleChange}
                className="form-select modern-select"
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d.departmentId} value={d.departmentId}>
                    {d.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn-modern-submit" type="submit">
              Save Changes <i className="bi bi-check2-circle ms-1"></i>
            </button>

            <Link to="/home/user" className="back-link">
              <i className="bi bi-chevron-left me-1"></i> Cancel changes
            </Link>
          </form>
        </div>
      </div>
    </div>
  </div>
);








}
