// src/components/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div className="full-page-loader">Loading...</div>;
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;