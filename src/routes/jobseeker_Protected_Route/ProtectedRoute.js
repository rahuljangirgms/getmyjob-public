import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  let token = null;

  try {
    // ✅ Get token from Redux store (if available)
    const authState = useSelector((state) => state.jobSeekerAuth.token  );
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

  // ✅ Allow access only if token exists, else redirect to Login
  return token ? <Outlet /> : <Navigate to="/jobseeker/login" replace />;
};

export default ProtectedRoute;
