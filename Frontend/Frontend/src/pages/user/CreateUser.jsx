import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/userAPI";
import { getAllDepartments } from "../../api/departmentAPI";
import "../../css/user/createUser.css"

export default function CreateUser() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    departmentId: "",
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(res.data);
    } catch {
      setError("Failed to load departments");
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError("Enter a valid email address");
      return;
    }

    if (!user.password) {
      setError("Password is required");
      return;
    }

    if (user.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!user.departmentId) {
      setError("Department is required");
      return;
    }

    try {
      await createUser({
        fullName: user.fullName.trim(),
        email: user.email.trim(),
        password: user.password,
        departmentId: user.departmentId || null,
      });

      alert("User created successfully");
      navigate("/home/user");
    } catch {
      setError("Failed to create user");
    }
  };

  // return (
  //   <div className="d-flex justify-content-center mt-5">
  //     <div className="card shadow-lg p-4" style={{ width: "500px" }}>
  //       <h3 className="text-center text-primary">Add New User</h3>

  //       {error && <div className="alert alert-danger text-center">{error}</div>}

  //       <form onSubmit={handleSubmit}>
  //         <input
  //           className="form-control mb-3"
  //           name="fullName"
  //           placeholder="Full Name"
  //           value={user.fullName}
  //           onChange={handleChange}
  //         />

  //         <input
  //           className="form-control mb-3"
  //           name="email"
  //           placeholder="Email"
  //           value={user.email}
  //           onChange={handleChange}
  //         />

  //         <input
  //           type="password"
  //           className="form-control mb-3"
  //           name="password"
  //           placeholder="Password"
  //           value={user.password}
  //           onChange={handleChange}
  //         />

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

  //         <button className="btn btn-primary w-100">Add User</button>
  //       </form>
  //     </div>
  //   </div>
  // );





  return (
  <div className="elms-page-container">
    <div className="create-page-wrapper">
      <div className="modern-form-card">
        {/* Left Sidebar */}
        <div className="form-sidebar">
          <div className="edit-badge">
            <i className="bi bi-person-plus"></i>
          </div>
          <h3>Create Employee</h3>
          <p className="mt-3 opacity-75">
            Add a new employee and assign them to a department.
          </p>
        </div>

        {/* Right Form */}
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <h4 className="fw-bold mb-4 text-dark">Employee Details</h4>

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
                name="email"
                placeholder="enter "
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group-custom">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter secure password"
                value={user.password}
                onChange={handleChange}
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
              Create Employee <i className="bi bi-check-circle ms-1"></i>
            </button>

            <Link to="/home/user" className="back-link">
              <i className="bi bi-chevron-left me-1"></i> Cancel and go back
            </Link>
          </form>
        </div>
      </div>
    </div>
  </div>
);










}
