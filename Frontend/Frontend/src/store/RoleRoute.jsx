import { Navigate } from "react-router-dom";
import { authHook } from "./authStore";

export default function RoleRoute({ children, allowedRoles }) {
  const { user } = authHook();

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
