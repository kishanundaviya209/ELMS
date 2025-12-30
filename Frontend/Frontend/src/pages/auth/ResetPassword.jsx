// import { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { resetPasswordApi } from "../../api/authAPI";
// import { authHook } from "../../store/authStore";

// export default function ResetPassword() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//   const { loginUser } = authHook();

//   const email = params.get("email");
//   const token = params.get("token");

//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!password.trim()) {
//       return setError("Password is required");
//     }

//     setLoading(true);
//     try {
//       const res = await resetPasswordApi({
//         email,
//         token,
//         newPassword: password,
//       });

//       loginUser(res.data); // auto-login after reset
//       navigate("/");
//     } catch {
//       setError("Reset password failed or link expired");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container min-vh-100 d-flex align-items-center justify-content-center">
//       <div className="card shadow-sm" style={{ width: "380px" }}>
//         <div className="card-body p-4">
//           <h4 className="text-center mb-3">Reset Password</h4>

//           {error && <div className="alert alert-danger py-2">{error}</div>}

//           <form onSubmit={handleReset}>
//             <div className="mb-4">
//               <label className="form-label">New Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <button className="btn btn-success w-100" disabled={loading}>
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// ====================================================== New Design Code ======================================================

import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPasswordApi } from "../../api/authAPI";
import { authHook } from "../../store/authStore";
import "../../css/auth/Authentication.css";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginUser } = authHook();

  const email = params.get("email");
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      return setError("Password is required");
    }

    setLoading(true);
    try {
      const res = await resetPasswordApi({
        email,
        token,
        newPassword: password,
      });

      loginUser(res.data); // auto login
      navigate("/");
    } catch {
      setError("Reset password failed or link expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-split-container">
        {/* Left Branding */}
        <div className="auth-brand-section">
          <div className="brand-content">
            <div className="brand-logo">
              <i className="bi bi-key-fill"></i>
            </div>
            <h1 className="brand-title">Reset Your Password</h1>
            <p className="brand-subtitle">
              Create a strong new password to secure your account
            </p>
          </div>

          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        {/* Right Form */}
        <div className="auth-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>New Password</h2>
              <p>Please enter your new password below</p>
            </div>

            {error && (
              <div className="error-alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleReset} className="login-form">
              <div className="form-group">
                <label>
                  <i className="bi bi-lock-fill"></i>
                  New Password
                </label>

                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <button className="submit-btn" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Back to{" "}
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
