import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const RedirectAuthenticated = ({ children }) => {
  const { session } = useAuth();
  if (session) {
    return <Navigate to="/" />;
  }
  return children;
};

export default RedirectAuthenticated;
