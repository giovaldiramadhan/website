import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();

  if (!user) {
    // Jika tidak ada user, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika ada user, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;