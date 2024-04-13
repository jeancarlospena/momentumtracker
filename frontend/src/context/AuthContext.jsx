import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  let accountNames, activeAccountsOnStartup, startUpActiveAccount;

  switch (action.type) {
    case "LOGIN":
      if (!!action.payload.importAccounts) {
        accountNames = Object.keys(action.payload.importAccounts);
        activeAccountsOnStartup = accountNames.length > 0 ? true : false;
        startUpActiveAccount = accountNames.includes(
          action.payload.primaryAccount
        )
          ? action.payload.primaryAccount
          : accountNames[0];
      } else {
        startUpActiveAccount = { unAveilable: true };
      }
      // console.log(!!action.payload.importAccounts);

      return {
        user: {
          ...action.payload,
          activeAccount: startUpActiveAccount,
        },
      };
    case "SWAP_ACCOUNT":
      const changeAccount = { ...state.user, activeAccount: action.payload };
      return { user: changeAccount };
    case "SWAP_PRIMARY_ACCOUNT":
      const changePrimaryAccount = {
        ...state.user,
        primaryAccount: action.payload,
      };
      return { user: changePrimaryAccount };
    case "UPDATE_IMPORT_ACCOUNTS":
      return { user: { ...state.user, importAccounts: action.payload } };
    case "ADD_ACCOUNT":
      const addAccount = {
        ...state.user,
        importAccounts: {
          ...state.user.importAccounts,
          [action.payload]: { empty: true },
        },
        activeAccount: action.payload,
      };
      return { user: addAccount };
    case "DELETE_ACCOUNT":
      const removeAccount = { ...state.user.importAccounts };
      delete removeAccount[action.payload];
      let activeAccountAfterDeletion;

      if (Object.keys(removeAccount).length > 0) {
        activeAccountAfterDeletion = Object.keys(removeAccount).includes(
          state.user.activeAccount
        )
          ? state.user.activeAccount
          : Object.keys(removeAccount)[0];
      } else {
        activeAccountAfterDeletion = { unAveilable: true };
      }
      return {
        user: {
          ...state.user,
          importAccounts: removeAccount,
          activeAccount: activeAccountAfterDeletion,
        },
      };
    case "IMPORT_TRADES":
      // console.log(action.payload);
      const importedTrades = {
        ...state.user.importAccounts,
        [state.user.activeAccount]: action.payload,
      };
      return { user: { ...state.user, importAccounts: importedTrades } };
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
        url: "/api/auth/verify",
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
