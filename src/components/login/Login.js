import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useHttpClient } from "../../Hook/HttppHook";
import { DataContext } from "../../context/data-context";
import validator from "validator";
import { authFirebase } from "../../Firebase/Firebase";
// import { io } from "socket.io-client";

import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";

// console.log("io");
// socket.on

function Login() {
  const navigate = useNavigate();
  const auth = useContext(DataContext);
  const [firstTime, setFirstTime] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);

  const userEmail = useRef({ value: "" });
  const userPassword = useRef({ value: "" });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const loginHandler = async () => {
    let email = userEmail.current.value;
    let password = userPassword.current.value;
    const emailAdmin = "noyf@gmail.com";

    setFirstTime(false);

    if (!validator.isEmail(email)) {
      setValidEmail(false);
    }

    if (validator.isEmail(email)) {
      setValidEmail(true);
    }
    if (password.length < 6) {
      setValidPassword(false);
    }
    if (password.length > 6) {
      setValidPassword(true);
    }

    if (!firstTime && validEmail && validPassword) {
      signInWithEmailAndPassword(authFirebase, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          auth.login();
          if (email == emailAdmin) {
            auth.adminIn();
          }
          // socket.on("login", () => {
          //   console.log("connect +1");
          // });
          navigate("/");
        })
        .catch((error) => {
          setUserNotFound(true);
          console.log(error);
        });
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
        type="password"
        placeholder="password"
        ref={userPassword}
      />

      {!validPassword && (
        <p className="login__valid">
          Please enter a password longer than 6 characters{" "}
        </p>
      )}
      <Button onClick={loginHandler} title="Log In" />
      {userNotFound && (
        <p className="login__valid">
          The user isn't exist, you need to sign up or your details wrong
        </p>
      )}
    </div>
  );
}

export default Login;
