import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

interface RequireAuthProps {
  allowedRoles?: Role[];
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { user, token, hasRole } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
