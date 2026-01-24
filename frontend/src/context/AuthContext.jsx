import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { getTrades } from "../scripts/tradesFetcher.js";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // if (!!action.payload.importAccounts) {
      //   accountNames = Object.keys(action.payload.importAccounts);
      //   startUpActiveAccount = accountNames.includes(
      //     action.payload.primaryAccount
      //   )
      //     ? action.payload.primaryAccount
      //     : accountNames[0];
      // } else {
      //   startUpActiveAccount = { unAveilable: true };
      // }
      const userData = action.payload;
      if (!("importAccounts" in userData)) {
        userData.importAccounts = {};
      }
      if (userData.primaryAccount !== "") {
        userData.activeAccount = userData.primaryAccount;
      }
      return {
        user: action.payload,
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
      return {
        user: {
          ...state.user,
          importAccounts: { ...state.importAccounts, ...action.payload },
        },
      };
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
      const importedTrades = {
        ...state.user.importAccounts,
        [action.payload.account]: action.payload.trades,
      };
      return { user: { ...state.user, importAccounts: importedTrades } };
    case "LOGOUT":
      return { user: null };
    case "UPDATE_SUBSCRIPTION":
      const updatedPayment = { ...state.user, subscription: action.payload };
      return { user: updatedPayment };
    default:
      return state;
  }
};

export const accountReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_LOAD":
      return action.payload;
    case "ADD_ACCOUNT":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [accountState, accountDispatch] = useReducer(accountReducer, []);
  const [loadedTrades, setLoadedTrades] = useState({});
  const [authLoaded, setAuthLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // const updateLoadedTrades = async (primaryAccount) => {
  //   try {
  //     const fetchedData = await getTrades(primaryAccount);
  //     if (fetchedData.success) {
  //       setLoadedTrades({
  //         [primaryAccount]: fetchedData.trades,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          const userData = response.data.user;
          const userAccounts = response.data.accounts;
          if (userData.activeAccount === "" && userData.primaryAccount !== "") {
            userData.activeAccount = userData.primaryAccount;
          }
          if (userData.primaryAccount === "" && userAccounts.length > 0) {
            userData.activeAccount = userAccounts[0]._id;
          }
          dispatch({ type: "LOGIN", payload: userData });
          accountDispatch({
            type: "INITIAL_LOAD",
            payload: userAccounts,
          });
          if (userData.primaryAccount) {
            // async function fetchData() {
            //   try {
            //     const fetchedData = await getTrades(userData.primaryAccount);
            //     if (fetchedData.success) {
            //       console.log(fetchData);
            //       setLoadedTrades({
            //         [userData.primaryAccount]: fetchedData.trades,
            //       });
            //     }
            //   } catch (error) {
            //     console.log(error);
            //   }
            // }
            // fetchData();
            // updateLoadedTrades(userData.primaryAccount);
          }
          setAuthLoaded(true);
          setLoggedIn(true);
        })
        .catch((error) => {
          setAuthLoaded(true);
        });
    } else {
      setAuthLoaded(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authLoaded,
        dispatch,
        loggedIn,
        loadedTrades,
        // updateLoadedTrades,
        accountState,
        accountDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
