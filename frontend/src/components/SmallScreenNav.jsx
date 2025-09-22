import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

import axios from "axios";
import { useState } from "react";
import Header from "./Header.jsx";
const SmallScreenNav = () => {
  const navigate = useNavigate();
  const { user, dispatch, authLoaded } = useAuthContext();
  const [expandedNav, setExpandedNav] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  // const logOutHandler = () => {
  //   axios({
  //     url: "/api/auth/logout",
  //     method: "post",
  //   })
  //     .then((response) => {
  //       dispatch({ type: "LOGOUT" });
  //       navigate("/");
  //     })
  //     .catch((error) => console.log(error));
  // };
  return (
    <div className="small-nav-blocker">
      {/* Overlay (only when menu is open) */}
      {expandedNav && (
        <div
          className="nav-overlay"
          onClick={() => setExpandedNav(false)}
        ></div>
      )}
      {/* small screens navigator */}
      {/* <header className={` small-navavigator `}> */}
      <header
        className={`small-navavigator ${
          isHome ? "header-grade-back" : "header-dark-back"
        }`}
      >
        {/* <header className={"header-dark-back"}> */}
        <div className="container">
          <div className="main-navigator">
            <div className="left-nav">
              <h1>
                <Link to={authLoaded && user ? "/dashboard" : "/"}>
                  <img
                    className="logo"
                    src="../images/quantskyewhite.svg"
                    alt=""
                  />
                </Link>
              </h1>
            </div>
            <div>
              <img
                className="nav-sandwich"
                onClick={() => setExpandedNav(true)}
                src="/images/nav_sandwich.svg"
                alt=""
              />
            </div>
            <div
              className={`mobile-nav 
                ${expandedNav ? "nav-open" : ""} 
                `}
            >
              {authLoaded && !user && (
                <ul className="small-nav-menu">
                  <span
                    className="close-small-nav"
                    onClick={() => setExpandedNav(false)}
                  >
                    Close
                  </span>
                  <li
                    className="nav-link"
                    onClick={() => setExpandedNav(false)}
                  >
                    <NavLink to="/faq">FAQ</NavLink>
                  </li>

                  <li
                    className="nav-link "
                    onClick={() => setExpandedNav(false)}
                  >
                    <NavLink to="/signup">Start Membership</NavLink>
                  </li>
                  <li
                    className="nav-link"
                    onClick={() => setExpandedNav(false)}
                  >
                    <NavLink to="/login">Sign In</NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default SmallScreenNav;
