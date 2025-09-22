import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { inputFocus } from "../scripts/inputFocus.js";
import Pricing from "../components/Pricing.jsx";

const SignUp = () => {
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      axios({
        url: "/api/auth/signup",
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
  // const inputFocus = (e, inputToRef) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     inputToRef.current.focus();
  //   }
  // };
  return (
    <div className="sign-up-content">
      <div className="pricing-container">
        <Pricing />
      </div>
      <form className="log-form auth-form-space" onSubmit={submitHandler}>
        <input
          placeholder="First Name"
          className="input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onKeyDown={(e) => inputFocus(e, emailRef)}
        />

        <input
          ref={emailRef}
          placeholder="Email"
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => inputFocus(e, passwordRef)}
        />

        <input
          ref={passwordRef}
          placeholder="Password"
          className="input"
          type="password"
          autoComplete="true"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => inputFocus(e, confirmPasswordRef)}
        />
        <input
          ref={confirmPasswordRef}
          placeholder="Confirm Password"
          className="input"
          type="password"
          autoComplete="true"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <span className="error-span">{error} *</span>}
        <button className="submit-form" type="submit">
          Start Trading!
        </button>
      </form>
    </div>
  );
};

export default SignUp;
