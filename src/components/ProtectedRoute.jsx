import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserContext();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // atau spinner UI
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;