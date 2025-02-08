import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch, authLoaded } = useAuthContext();

  const logOutHandler = () => {
    axios({
      url: "/api/auth/logout",
      method: "post",
    })
      .then((response) => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="global-padding">
      <header>
        <div className="left-nav">
          <h1>
            <Link to={authLoaded && user ? "/dashboard" : "/"}>
              <img className="logo" src="../images/pricelogo.png" alt="" />
            </Link>
          </h1>
        </div>
        <div className="right-nav">
          {authLoaded && user && (
            <ul className="nav-menu">
              <li className="nav-link">
                <NavLink to={"/profile"}>profile</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to={"/dashboard"}>dashboard</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to={"/calendar"}>calendar</NavLink>
              </li>
              <li className="nav-link">
                <Link onClick={logOutHandler}>Log Out</Link>
              </li>
            </ul>
          )}
          {authLoaded && !user && (
            <ul className="nav-menu">
              <li className="nav-link">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="nav-link ">
                <Link className="link-btn highlight-btn" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-link">
                <Link className="link-btn" to="/login">
                  Sign In
                </Link>
              </li>
            </ul>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
