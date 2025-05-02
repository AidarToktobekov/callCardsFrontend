import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, children, protectionType }) => {
  if (!isAllowed) {
    return <Navigate to="/sign-in" />;
  }

  if (protectionType === 'admin' && isAllowed.role !== 'admin') {
    return <Navigate to="/" />;
  }

  if (protectionType === 'senior_spec' && isAllowed.role === 'user') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
