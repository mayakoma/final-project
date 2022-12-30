import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [validName, setValidName] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const userName = useRef({ value: "" });
  const userPassword = useRef({ value: "" });

  const loginHandler = () => {
    let name = userName.current.value;
    let password = userPassword.current.value;
    if (name.length == 0) {
      setValidName(false);
    }
    if (password.length < 6) {
      setValidPassword(false);
    }

    if (!validName && !validPassword) {
      navigate("/");
    }
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <input
        className="login__userName"
        type="text"
        placeholder="user name"
        ref={userName}
      />
      {!validName && <p className="login__valid">Please enter your name</p>}
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
