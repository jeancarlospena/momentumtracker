import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useState } from "react";
import axios from "axios";
import AccountSettings from "./AccountSettings.jsx";

const AccountsManager = () => {
  const { user, dispatch } = useAuthContext();
  const [newAccountName, setNewAccountName] = useState("");
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("api/accounts/createimportaccount", { accountName: newAccountName })
      .then((response) => {
        dispatch({ type: "ADD_ACCOUNT", payload: response.data });
        setNewAccountName("");
      });
  };
  const deleteAccount = (name) => {
    axios
      .post("api/accounts/deleteimportaccount", { accountName: name })
      .then((response) => {
        dispatch({ type: "DELETE_ACCOUNT", payload: response.data });
      });
  };
  const changePrimaryAccount = (name) => {
    axios
      .post("api/accounts/changePrimaryAccount", { accountName: name })
      .then((response) => {
        dispatch({ type: "SWAP_PRIMARY_ACCOUNT", payload: response.data });
      });
  };
  const editAccountDisplay = (accountName) => {
    setEditName(accountName);
    setEditing(!editing);
  };
  return (
    <>
      {!editing && (
        <div className="displayed-section">
          <form className="add-account" action="" onSubmit={submitHandler}>
            <label htmlFor="">Create new account:</label>
            <div>
              <input
                type="text"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
                className="input-small"
              />
              <button className="submit-form-small submit-form-margin">
                Create
              </button>
            </div>
          </form>
          {!user.activeAccount?.unAveilable &&
            Object.keys(user.importAccounts).map((accountName, ind) => {
              return (
                <div className="account-display bottom-margin" key={ind}>
                  <button
                    className="star-btn"
                    onClick={() => changePrimaryAccount(accountName)}
                  >
                    <img
                      className={`star-icon ${
                        accountName === user.primaryAccount
                          ? ""
                          : "star-opacity"
                      }`}
                      src={
                        accountName === user.primaryAccount
                          ? "/images/star-gold.svg"
                          : "/images/star.svg"
                      }
                      alt=""
                    />
                  </button>
                  <span className="account-name-tag">
                    {accountName.length > 20
                      ? `${accountName.match(/.{1,20}/g)[0]}...`
                      : accountName}
                  </span>

                  <div className="right-buttons">
                    <button
                      className="account-btn-regular blue-btn btn-spacing"
                      onClick={() => editAccountDisplay(accountName)}
                    >
                      Edit
                    </button>
                    <button
                      className="account-btn-regular red-btn btn-spacing"
                      onClick={() => deleteAccount(accountName)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {editing && (
        <div className="displayed-section">
          <button
            className="account-btn-regular blue-btn bottom-margin"
            onClick={() => editAccountDisplay("")}
          >
            Go back
          </button>
          <AccountSettings editName={editName} setEditing={setEditing} />
        </div>
      )}
    </>
  );
};

export default AccountsManager;
