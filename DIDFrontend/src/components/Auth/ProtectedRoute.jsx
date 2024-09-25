import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth-context/auth-context";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth();
  console.log(user, token);
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;