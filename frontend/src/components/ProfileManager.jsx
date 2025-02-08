import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfileManager = () => {
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [firstName, setFirstName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      axios({
        // NEED TO BE CHAGNED
        url: "/api/profile/update",
        method: "post",
        data: {
          firstName,
          email,
          password,
        },
      })
        .then((response) => {
          setUpdatingProfile(false);
        })
        .catch((error) => setError(error.response.data.error));
    }
  };
  return (
    <div className="displayed-section">
      <div className="bottom-margin">
        <span>Name: {user.firstName}</span>
      </div>
      <div className="bottom-margin">
        <span>Email: {user.email}</span>
      </div>
      <div className="bottom-margin">
        <Link to={"/subscription"}>Subscription</Link>
      </div>
      <span>
        <button
          onClick={() => setUpdatingProfile(!updatingProfile)}
          className="account-btn-regular blue-btn"
        >
          Update Account
        </button>
      </span>

      {updatingProfile && (
        <form className="log-form" onSubmit={(e) => submitHandler(e)}>
          <label>First Name</label>
          <input
            className="input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Update Email</label>
          <input
            className="input"
            type="text"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            className="input"
            type="password"
            autoComplete="new-password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Copnfirm Password</label>
          <input
            className="input"
            type="password"
            autoComplete="none"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <span className="error-span">{error} *</span>}
          <button className="submit-form" type="submit">
            Update
          </button>
        </form>
      )}
    </div>
  );
};
export default ProfileManager;
