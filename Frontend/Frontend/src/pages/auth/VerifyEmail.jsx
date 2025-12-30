// import { useState } from "react";
// import { forgotPasswordApi } from "../../api/authAPI";

// export default function VerifyEmail() {
//   const [email, setEmail] = useState("");
//   const [msg, setMsg] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMsg("");

//     if (!email.trim()) {
//       return setError("Email is required");
//     }

//     setLoading(true);
//     try {
//       await forgotPasswordApi({ email });
//       setMsg("Password reset link has been sent to your email");
//     } catch {
//       setError("Email not found or invalid");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container min-vh-100 d-flex align-items-center justify-content-center">
//       <div className="card shadow-sm" style={{ width: "380px" }}>
//         <div className="card-body p-4">
//           <h4 className="text-center mb-3">Verify Email</h4>

//           {msg && <div className="alert alert-success py-2">{msg}</div>}
//           {error && <div className="alert alert-danger py-2">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <button className="btn btn-primary w-100" disabled={loading}>
//               {loading ? "Sending..." : "Send Reset Link"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// ========================================================= New Design Code =======================================================
 
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordApi } from "../../api/authAPI";
import "../../css/auth/Authentication.css";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!email.trim()) {
      return setError("Email is required");
    }

    setLoading(true);
    try {
      await forgotPasswordApi({ email });
      setMsg("Password reset link has been sent to your email");
    } catch {
      setError("Email not found or invalid");
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
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <h1 className="brand-title">Verify Your Email</h1>
            <p className="brand-subtitle">
              We’ll send a secure password reset link to your email
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
              <h2>Forgot Password</h2>
              <p>Enter your registered email address</p>
            </div>

            {msg && (
              <div className="success-alert">
                <i className="bi bi-check-circle-fill"></i>
                <span>{msg}</span>
              </div>
            )}

            {error && (
              <div className="error-alert">
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>
                  <i className="bi bi-envelope-fill"></i>
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Remember your password?{" "}
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
