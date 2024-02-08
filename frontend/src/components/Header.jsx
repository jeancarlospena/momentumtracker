import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch, authLoaded } = useAuthContext();

  const logOutHandler = () => {
    axios({
      url: "/api/user/logout",
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
            <Link to="/">
              <img className="logo" src="../images/new-logo.png" alt="" />
            </Link>
          </h1>
        </div>
        <div className="right-nav">
          {authLoaded && user && (
            <ul className="nav-menu">
              <li className="nav-link">
                <Link to={"/dashboard"}>dashboard</Link>
              </li>
              <li className="nav-link">
                <Link onClick={logOutHandler}>Log Out</Link>
              </li>
            </ul>
          )}
          {authLoaded && !user && (
            <ul className="nav-menu">
              <li className="nav-link">
                <Link to="/">Home</Link>
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
