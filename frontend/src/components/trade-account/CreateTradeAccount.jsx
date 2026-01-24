import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

export default function CreateTradeAccount() {
  const { accountState, user, dispatch, accountDispatch } = useAuthContext();
  const [accountName, setAccountName] = useState("");
  // const [accounts, setAccounts] = useState([]);
  const handleClick = () => {
    axios({
      url: "/api/trade-account",
      method: "post",
      data: {
        accountName,
      },
    })
      .then((response) => {
        accountDispatch({
          type: "ADD_ACCOUNT",
          payload: response.data.account,
        });
        setAccountName("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   axios({
  //     url: "/api/trade-account/accounts",
  //     method: "get",
  //   })
  //     .then((response) => {
  //       setAccounts(response.data);
  //       // console.log(response);
  //     })
  //     .catch((error) => {});
  // }, []);

  const handleDelete = (accountId) => {
    console.log(accountId);
    axios({
      url: "/api/trade-account/",
      method: "delete",
      data: {
        accountId,
      },
    })
      .then((response) => {
        setAccountName("");
      })
      .catch((error) => {});
  };

  const changePrimaryAccount = (id) => {
    axios
      .post("api/accounts/changePrimaryAccount", { accountName: id })
      .then((response) => {
        dispatch({ type: "SWAP_PRIMARY_ACCOUNT", payload: response.data });
      });
  };
  return (
    <div>
      <div className="create-new-account">
        <label>Create new account: </label>
        <input
          className="create-account-input"
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <button className="create-account-button" onClick={() => handleClick()}>
          Create Account
        </button>
      </div>
      <h2 className="basic-title">Accounts:</h2>
      {accountState.length > 0 && (
        <div className="trading-accounts-list">
          {accountState.map((account, index) => (
            <div className="row account-action" key={`accound${index}`}>
              {/* change the users favorite account */}
              <div className="row">
                <button
                  className="star-btn"
                  onClick={() => changePrimaryAccount(account._id)}
                >
                  <img
                    className={`star-icon ${
                      account._id === user.primaryAccount ? "" : "star-opacity"
                    }`}
                    src={
                      account._id === user.primaryAccount
                        ? "/images/star-gold.svg"
                        : "/images/star.svg"
                    }
                    alt=""
                  />
                </button>
                <p>{account.accountName}</p>
              </div>
              <div className="account-buttons-section">
                <button onClick={() => handleDelete(account._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
