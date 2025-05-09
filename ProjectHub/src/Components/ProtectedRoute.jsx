import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate(requiredRole === "admin" ? "/adminlogin" : "/student_login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.role !== requiredRole) {
        const confirmLogout = window.confirm(
          "You're not authorized to access this page.\nDo you want to logout and go to your login page?"
        );

        if (confirmLogout) {
          axios
            .get("http://localhost:3000/auth/logout", { withCredentials: true })
            .then(() => {
              navigate(
                requiredRole === "admin" ? "/adminlogin" : "/student_login"
              );
            });
        } else {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate("/");
          }
        }
      } else {
        setAuthorized(true);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      navigate(requiredRole === "admin" ? "/adminlogin" : "/student_login");
    }
  }, [navigate, requiredRole]);

  if (!authorized) return null; // Don't render children until authorized
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;
