import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="container mt-5">
      <Outlet />
    </div>
  );
}
