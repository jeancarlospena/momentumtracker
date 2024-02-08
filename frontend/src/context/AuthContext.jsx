import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [authLoaded, setAuthLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  let jwtFound = false;
  const cookiesArray = decodeURIComponent(document.cookie).split("; ");
  cookiesArray.forEach((element) => {
    if (element.indexOf("jwt") == 0) {
      jwtFound = true;
    }
  });
  useEffect(() => {
    if (jwtFound) {
      axios({
        url: "/api/user/verify",
        method: "post",
      })
        .then((response) => {
          dispatch({ type: "LOGIN", payload: response.data });
          setAuthLoaded(true);
          setLoggedIn(true);
        })
        .catch((error) => {
          setAuthLoaded(true);
          console.log(error);
        });
    } else {
      setAuthLoaded(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, authLoaded, dispatch, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
