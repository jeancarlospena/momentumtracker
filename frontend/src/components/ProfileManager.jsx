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
      <div className="profile-describer">
        <span>FULL NAME </span>
        <span className="profile-user-info-name">{user.firstName}</span>
      </div>
      <div className="profile-describer">
        <span>EMAIL</span>
        <span className="profile-user-info"> {user.email}</span>
      </div>
      <div className="profile-describer">
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
          <input
            placeholder="First Name"
            className="input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            placeholder="Password"
            className="input"
            type="password"
            autoComplete="new-password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            className="input"
            type="password"
            autoComplete="none"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <span className="error-span">{error} *</span>}
          <button className="submit-form" type="submit">
            Update Account
          </button>
        </form>
      )}
    </div>
  );
};
export default ProfileManager;
