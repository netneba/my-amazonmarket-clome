import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../components/Utility/CartContext";


const ProtectedRoute = ({ children, msg }) => {
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!state.user) {
      navigate("/auth", {
        replace: true,
        state: {
          message: msg || "Please login to continue",
          redirectTo: location.pathname,
        },
      });
    } else {
      setAuthorized(true);
    }
  }, [state.user, navigate, location.pathname, msg]);

  // Show loading until authorization is verified
  if (!authorized) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
