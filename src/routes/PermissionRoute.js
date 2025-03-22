import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { hasPermission } from "../utils/permissionHelpers";
// import { hasPermission } from "../utils/permissionHelpers";

const PermissionRoute = ({ menu, action, children }) => {
  const { user, token } = useSelector((state) => state.auth);

  // If not logged in, you could redirect to login
  if (!token) {
    return <Navigate to="/recruiter/login" replace />;
  }

  // Check if the user has permission
  if (!hasPermission(user, menu, action)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If children is provided, render it; otherwise, use <Outlet />
  return children ? children : <Outlet />;
};

export default PermissionRoute;