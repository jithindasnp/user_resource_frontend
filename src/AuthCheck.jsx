import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AuthCheck({ children }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/" />;
    }
  }, []);

  return children;
}

export default AuthCheck;
