import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import axios from "axios";
import SmallScreenNav from "./SmallScreenNav.jsx";
const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch, authLoaded } = useAuthContext();
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
    <>
      <header
        className={`wide-header ${
          isHome ? "header-grade-back" : "header-dark-back"
        }`}
      >
        {/* <header className={"header-dark-back"}> */}
        <div className="container">
          <div className="main-navigator">
            <div className="left-nav">
              <h1>
                <Link to={authLoaded && user ? "/dashboard" : "/"}>
                  <img className="logo" src="../images/lightso.svg" alt="" />
                </Link>
              </h1>
            </div>

            <div className="right-nav">
              {authLoaded && !user && (
                <ul className="nav-menu">
                  {/* <li className="nav-link">
                  <NavLink to="/">Home</NavLink>
                </li> */}
                  <li className="nav-link">
                    <NavLink to="/faq">FAQ</NavLink>
                  </li>
                  <li className="nav-link ">
                    <NavLink to="/signup">Start Membership</NavLink>
                  </li>
                  <li className="nav-link">
                    <NavLink to="/login">Sign In</NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* small screens navigator */}
      <SmallScreenNav />
    </>
  );
};

export default Header;
