import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate, useLocation } from "react-router-dom";

function RequiredAuth({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to={"/login"} state={{ path: location.pathname }} />;
  }

  return children;
}

export default RequiredAuth;
