import { Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { selectIsAuthenticated } from '../store/slices/authSlice'

const ProtectedRoute = ({ children }) => {

  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthenticated = true

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children;
};

export default ProtectedRoute;
