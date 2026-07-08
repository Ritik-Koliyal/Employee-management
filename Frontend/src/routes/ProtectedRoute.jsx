import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux.js";
import { useEffect, useRef } from "react";
import { initializeAuth } from "../services/auth.service.js";

const ProtectedRoute = () => {
  const initialized = useRef(false);
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (initialized.current) return;

    initializeAuth();
    initialized.current = true;
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
