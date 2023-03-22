import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Unauthorized from "../../errors/Unauthorized";

const HomeAdmin = () => {
  const [authenticated, setAuthenticated] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser) {
      setAuthenticated(loggedInUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (authenticated && authenticated.roles.includes("ROLE_ADMIN")) {
    return <Outlet />;
  } else {
    return <Unauthorized />;
  }
};

export default HomeAdmin;
