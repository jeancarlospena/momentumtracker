import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const SignUp = () => {
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      axios({
        url: "/api/user/signup",
        method: "post",
        data: {
          firstName,
          email,
          password,
        },
      })
        .then((response) => {
          dispatch({ type: "LOGIN", payload: response.data });
          navigate("/dashboard");
        })
        .catch((error) => setError(error.response.data.error));
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <label>
        First Name <span className="required">*</span>
      </label>
      <input
        className="input"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label>
        Email <span className="required">*</span>
      </label>
      <input
        className="input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>
        Password <span className="required">*</span>
      </label>
      <input
        className="input"
        type="password"
        autoComplete="true"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        Copnfirm Password <span className="required">*</span>
      </label>
      <input
        className="input"
        type="password"
        autoComplete="true"
        id="confirm-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <span className="error-span">{error} *</span>}
      <button className="submit-form" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
