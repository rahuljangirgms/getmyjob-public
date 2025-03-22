// src/routes/RecruitmentAuthRoutes.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RecruitmentAuthRoutes = ({ allowedRoles }) => {
  const { user, token } = useSelector((state) => state.auth);
  const role = user?.role || localStorage.getItem("role"); // Fallback if Redux state is empty

  if (!token) {
    // If not logged in, redirect to login
    return <Navigate to="/recruiter/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // If logged in but role is not allowed, redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RecruitmentAuthRoutes;
