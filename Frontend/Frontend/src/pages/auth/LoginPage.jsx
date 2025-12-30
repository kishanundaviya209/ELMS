// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { authHook } from "../../store/authStore";
// import { loginApi } from "../../api/authAPI";

// export default function LoginPage() {
//   const { loginUser } = authHook();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email.trim()) return setError("Email required");
//     if (!password.trim()) return setError("Password required");

//     setLoading(true);

//     try {
//       const res = await loginApi({ email, password });
//       loginUser(res.data);
//       navigate("/home");
//     } catch {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container min-vh-100 d-flex align-items-center justify-content-center">
//       <div className="card shadow-sm" style={{ width: "380px" }}>
//         <div className="card-body p-4">
//           <h4 className="text-center mb-3">Login</h4>

//           {error && <div className="alert alert-danger py-2">{error}</div>}

//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="mb-2">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="text-end mb-3">
//               <Link to="/verify-email" className="small">
//                 Forgot password?
//               </Link>
//             </div>

//             <button className="btn btn-primary w-100" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <div className="text-center mt-3 small">
//             Don’t have an account? <Link to="/register">Register</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//  ======================================================= New Design Code =======================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authHook } from "../../store/authStore";
import { loginApi } from "../../api/authAPI";
import "../../css/auth/Login.css";

export default function LoginPage() {
  const { loginUser } = authHook();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Email required");
    if (!password.trim()) return setError("Password required");
    setLoading(true);
    try {
      const res = await loginApi({ email, password });
      loginUser(res.data);
      navigate("/home");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-split-container">
        {/* Left Side - Branding */}
        <div className="auth-brand-section">
          <div className="brand-content">
            <div className="brand-logo">
              <i class="bi bi-calendar-check"></i>
            </div>
            <h1 className="brand-title">Leave Management System</h1>
            <p className="brand-subtitle">
              A clean and modern way to manage employee leave{" "}
            </p>
          </div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="error-alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>{error}</span>
                <button className="close-btn" onClick={() => setError("")}>
                  <i className="bi bi-x"></i>
                </button>
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">
                  <i className="bi bi-envelope-fill"></i>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="bi bi-lock-fill"></i>
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
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

              <div className="form-options justify-content-end">
                <Link to="/verify-email" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <i className="bi bi-arrow-right"></i>
                  </>
                )}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="signup-link">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
