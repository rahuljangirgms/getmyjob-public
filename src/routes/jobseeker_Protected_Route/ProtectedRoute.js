import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.jobSeekerAuth); // Get auth state

  return token ? <Outlet /> : <Navigate to="/jobseeker/login" replace />;
};

export default ProtectedRoute;
