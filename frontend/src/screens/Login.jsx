import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

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
        dispatch({ type: "LOGIN", payload: response.data });
        navigate("/dashboard");
      })
      .catch((error) => setError(error.response.data.error));
  };
  return (
    <form className="log-form" onSubmit={submitHandler}>
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

      {error && <span className="error-span">{error} *</span>}
      <button className="submit-form" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default Login;
