import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthenticateRoutes = () => {
  const isValid = !!localStorage.getItem("token");
  
  return isValid? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthenticateRoutes;
