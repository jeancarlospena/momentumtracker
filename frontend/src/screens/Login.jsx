import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();

  const { dispatch, accountDispatch } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    axios({
      url: "/api/auth/login",
      method: "post",
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        // console.log(response.data);
        const userData = response.data.user;
        const userAccounts = response.data.accounts;
        if (userData.primaryAccount === "" && userAccounts.length > 0) {
          userData.activeAccount = userAccounts[0]._id;
        }
        dispatch({ type: "LOGIN", payload: userData });
        accountDispatch({
          type: "INITIAL_LOAD",
          payload: userAccounts,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        {
        }
        setError(error.response.data.error);
      });
  };
  return (
    <form className="log-form auth-form-space" onSubmit={submitHandler}>
      <input
        placeholder="Email"
        className="input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        className="input"
        type="password"
        autoComplete="true"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <span className="error-span">{error} *</span>}
      <button className="submit-form" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default Login;
