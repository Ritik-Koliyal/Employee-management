import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux.js";

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
