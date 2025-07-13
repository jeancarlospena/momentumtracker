import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const SideNavigator = () => {
  const { dispatch } = useAuthContext();

  const logOutHandler = () => {
    axios({
      url: "/api/auth/logout",
      method: "post",
    })
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/calendar");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="side-navigator">
      <div className="logo-section">
        <Link to={"/dashboard"}>
          <img className="logged-logo" src="../images/quantsky.svg" alt="" />
        </Link>
      </div>
      <div className="side-nav-menu">
        <div className="side-section">
          <NavLink className="nav-link" to={"/profile"}>
            profile
          </NavLink>
          <NavLink className="nav-link" to={"/dashboard"}>
            dashboard
          </NavLink>
          <NavLink className="nav-link" to={"/calendar"}>
            calendar
          </NavLink>
        </div>

        <div className="side-section nav-bottom-links">
          <Link className="nav-link " to={"#"}>
            &#x2139; Support
          </Link>
          <Link className="nav-link" onClick={logOutHandler}>
            &#8592; Log Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNavigator;
