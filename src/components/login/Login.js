import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useHttpClient } from "../../Hook/HttppHook";
import { DataContext } from "../../context/data-context";
import validator from "validator";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const auth = useContext(DataContext);
  const [firstTime, setFirstTime] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const userEmail = useRef({ value: "" });
  const userPassword = useRef({ value: "" });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const loginHandler = async () => {
    let email = userEmail.current.value;
    let password = userPassword.current.value;
    const emailAdmin = "noyflaysher@gmail.com";

    setFirstTime(false);

    if (!validator.isEmail(email)) {
      setValidEmail(false);
    }

    if (validator.isEmail(email)) {
      setValidEmail(true);
      if (email == emailAdmin) {
        auth.adminIn();
      }
    }
    if (password.length < 6) {
      setValidPassword(false);
    }
    if (password.length > 6) {
      setValidPassword(true);
    }

    if (!firstTime && validEmail && validPassword) {
      auth.login();
      navigate("/");
    }
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <input
        className="login__userName"
        type="text"
        placeholder="email"
        ref={userEmail}
      />
      {!validEmail && <p className="login__valid">Please enter valid email</p>}
      <input
        className="login__password"
        type="text"
        placeholder="password"
        ref={userPassword}
      />

      {!validPassword && (
        <p className="login__valid">
          Please enter a password longer than 6 characters{" "}
        </p>
      )}
      <Button onClick={loginHandler} title="Log In" />
    </div>
  );
}

export default Login;
