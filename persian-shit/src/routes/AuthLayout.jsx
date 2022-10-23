import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

const AuthLayout = () => {
  const authContext = useAuth();
  const { user } = authContext;
  if (user && user.loading) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
