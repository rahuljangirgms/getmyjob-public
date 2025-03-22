import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  let token = null;

  try {
    // ✅ Get token from Redux store (if available)
    const authState = useSelector((state) => state.jobSeekerAuth.token);
    token = authState?.token || null;

    // ✅ If Redux token is not available, try getting from localStorage
    if (!token) {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        token = parsedAuth?.token || null;
      }
    }
  } catch (error) {
    console.error("Error retrieving auth token:", error);
  }

  // ✅ If user is already authenticated, redirect to dashboard
  return token ? <Navigate to="/jobseeker/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
