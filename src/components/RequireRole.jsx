// src/components/RequireRole.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireRole({ allow, children }) {
  const { user } = useAuth();
  const loc = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ flash: "Please log in to continue." }} />;
  }
  if (!allow.includes(user.role)) {
    return <Navigate to="/" replace state={{ flash: "You don’t have access to that portal." }} />;
  }
  return children;
}
