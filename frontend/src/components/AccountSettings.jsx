import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useState } from "react";
import axios from "axios";

const AccountSettings = ({ editName, setEditing }) => {
  const { user, dispatch } = useAuthContext();
  const [updatedAccountName, setUpdatedAccountName] = useState("");
  const updateAccountHandler = (e) => {
    e.preventDefault();
    console.log(" it was a hitterrr");
    axios
      .post("api/accounts/renameaccount", {
        editName,
        updatedAccountName,
      })
      .then((response) => {
        console.log(response.data);

        dispatch({ type: "LOGIN", payload: response.data });
        setEditing(false);
      });
  };

  return (
    <div className="displayed-section">
      <form className="add-account" action="" onSubmit={updateAccountHandler}>
        <label htmlFor="">Rename account: {editName}</label>
        <div>
          <input
            type="text"
            value={updatedAccountName}
            onChange={(e) => setUpdatedAccountName(e.target.value)}
            className="input-small"
          />
          <button className="submit-form-small submit-form-margin">
            Update Name
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
