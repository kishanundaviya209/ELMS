import { authHook } from "../store/authStore";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import "../css/common/Navbar.css";

export default function Navbar() {
  const { user, logoutUser } = authHook();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top elms-navbar">
        <div className="container-fluid px-4">
          {/* Brand */}
          <Link
            className="navbar-brand d-flex align-items-center gap-2"
            to="/home"
          >
            <span className="elms-logo">ELMS</span>
            <span className="elms-title d-none d-md-inline">
              Leave Management
            </span>
          </Link>

          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#elmsNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="elmsNavbar">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
              <li className="nav-item">
                <NavLink to="/home" end className="nav-link nav-saas">
                  Home
                </NavLink>
              </li>

              {user?.role === "Admin" && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link nav-saas" to="/home/user">
                      Employee
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link nav-saas"
                      to="/home/department"
                    >
                      Department
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link nav-saas"
                      to="/home/leaverequest/admin"
                    >
                      Leave Requests
                    </NavLink>
                  </li>
                </>
              )}

              {user?.role !== "Admin" && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link nav-saas"
                    to="/home/leaverequest"
                  >
                    Leave Request
                  </NavLink>
                </li>
              )}

              {/* User */}
              <li className="nav-item dropdown ms-lg-2">
                <button
                  className="user-menu-btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {user?.role === "User" ? "Employee" : "Admin"}
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li className="dropdown-item text-muted">
                    Role: <b> {user?.role === "User" ? "Employee" : "Admin"}</b>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="elms-page">
        <Outlet />
      </main>
    </>
  );
}
