import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { useEffect, useRef } from "react";
import { initializeAuth } from "../services/auth.service";

const ProtectedRoute = () => {
  const initialized = useRef(false);
  const { isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (initialized.current) return;

    initializeAuth();
    initialized.current = true;
  }, []);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;