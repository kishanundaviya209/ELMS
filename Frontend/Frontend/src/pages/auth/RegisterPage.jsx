// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllDepartments } from "../../api/departmentAPI";
// import { registerApi } from "../../api/authAPI";

// export default function RegisterPage() {
//   const navigate = useNavigate();

//   const [error, setError] = useState("");

//   const [departments, setDepartments] = useState([]);

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     departmentId: "",
//   });

//   useEffect(() => {
//     getAllDepartments()
//       .then((res) => setDepartments(res.data))
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load departments");
//       });
//   }, []);

//   const change = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.fullName.trim()) return setError("Full name required");
//     if (form.fullName.length < 3)
//       return setError("Full name must be at least 3 characters");

//     if (!form.email.trim()) return setError("Email required");
//     if (!/\S+@\S+\.\S+/.test(form.email)) return setError("Email is invalid");

//     if (!form.password.trim()) return setError("Password required");
//     if (form.password.length < 4)
//       return setError("Password must be at least 4 characters");
//     if (form.password.includes(" "))
//       return setError("Password cannot contain spaces");

//     if (!form.departmentId) return setError("Select department");

//     try {
//       await registerApi(form);
//       alert("Registration successful");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setError("Registration failed");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center mt-5">
//       <div className="card p-4 shadow" style={{ width: 400 }}>
//         <h3 className="text-center">Register</h3>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="fullName"
//             type="text"
//             className="form-control mb-3"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={change}
//           />

//           <input
//             name="email"
//             type="email"
//             className="form-control mb-3"
//             placeholder="Email"
//             value={form.email}
//             onChange={change}
//           />

//           <input
//             name="password"
//             type="password"
//             className="form-control mb-3"
//             placeholder="Password"
//             value={form.password}
//             onChange={change}
//           />

//           <select
//             className="form-control mb-3"
//             name="departmentId"
//             value={form.departmentId}
//             onChange={change}
//           >
//             <option value="">-- Select Department --</option>
//             {departments.map((d) => (
//               <option key={d.departmentId} value={d.departmentId}>
//                 {d.departmentName}
//               </option>
//             ))}
//           </select>

//           <button className="btn btn-success w-100">Register</button>

//           <p className="text-center mt-3">
//             Already have an account?{" "}
//             <Link to="/" className="text-primary text-decoration-none">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }



// ===================================================== New Design Code ==============================================================


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllDepartments } from "../../api/departmentAPI";
import { registerApi } from "../../api/authAPI";
import "../../css/auth/Register.css"

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    departmentId: "",
  });

  useEffect(() => {
    getAllDepartments()
      .then((res) => setDepartments(res.data))
      .catch(() => setError("Failed to load departments"));
  }, []);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password || !form.departmentId) {
      return setError("All fields are required");
    }

    setLoading(true);
    try {
      await registerApi(form);
      navigate("/");
    } catch {
      setError("Email already registered!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-split-container">
        {/* Left Branding (Same as Login) */}
        <div className="auth-brand-section">
          <div className="brand-content">
            <div className="brand-logo">
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <h1 className="brand-title">Join Our Platform</h1>
            <p className="brand-subtitle">
              Create your account and manage leaves effortlessly
            </p>
          </div>

          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="auth-form-section">
          <div className="form-container scrollable-form">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Fill in the details to get started</p>
            </div>

            {error && (
              <div className="error-alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>{error}</span>
              </div>
            )}

            {/* <form onSubmit={handleSubmit} className="login-form">

              <div className="form-group">
                <label>
                  <i className="bi bi-person-fill"></i>
                  Full Name
                </label>
                <input
                  name="fullName"
                  className="form-input"
                  value={form.fullName}
                  onChange={change}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="bi bi-envelope-fill"></i>
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-input"
                  value={form.email}
                  onChange={change}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="bi bi-lock-fill"></i>
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-input"
                  value={form.password}
                  onChange={change}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="bi bi-building"></i>
                  Department
                </label>
                <select
                  name="departmentId"
                  className="form-input"
                  value={form.departmentId}
                  onChange={change}
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.departmentId} value={d.departmentId}>
                      {d.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              <button className="submit-btn" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form> */}

            <form onSubmit={handleSubmit} className="login-form">
              {/* ROW */}
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <i className="bi bi-person-fill"></i>
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    className="form-input"
                    value={form.fullName}
                    onChange={change}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <i className="bi bi-envelope-fill"></i>
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="form-input"
                    value={form.email}
                    onChange={change}
                  />
                </div>
              </div>

              {/* FULL WIDTH */}
              <div className="form-group">
                <label>
                  <i className="bi bi-lock-fill"></i>
                  Password
                </label>

                <div className="password-input-wrapper">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    value={form.password}
                    onChange={change}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${
                        showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <i className="bi bi-building"></i>
                  Department
                </label>
                <select
                  name="departmentId"
                  className="form-input"
                  value={form.departmentId}
                  onChange={change}
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.departmentId} value={d.departmentId}>
                      {d.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              <button className="submit-btn" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Already have an account?{" "}
                <Link to="/" className="signup-link">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
