import React, { useRef, useState, useContext } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useHttpClient } from "../../Hook/HttppHook";
import { DataContext } from "../../context/data-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "../../Firebase/Firebase";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const auth = useContext(DataContext);
  const [firstTime, setFirstTime] = useState(true);
  const [validName, setValidName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const userName = useRef({ value: "" });
  const userPassword = useRef({ value: "" });
  const userEmail = useRef({ value: "" });

  const [checked, setChecked] = useState(false);
  const [radioGender, setRadioGender] = useState("women");
  const [radioArea, setRadioArea] = useState("north");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const logInHandler = () => {
    navigate("/login");
  };

  const changeRadioGender = (e) => {
    setRadioGender(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const changeRadioArea = (e) => {
    setRadioArea(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const radios1 = [
    { name: "women", value: "women" },
    { name: "men", value: "men" },
  ];

  const radios2 = [
    { name: "north", value: "north" },
    { name: "center", value: "center" },
    { name: "south", value: "south" },
  ];

  const signUpHandler = async () => {
    setFirstTime(false);
    let name = userName.current.value;
    let password = userPassword.current.value;
    let email = userEmail.current.value;
    if (name.length !== 0) {
      setValidName(true);
    }

    if (name.length === 0) {
      setValidName(false);
    }

    if (password.length > 6) {
      setValidPassword(true);
    }

    if (password.length < 6) {
      setValidPassword(false);
    }

    if (validator.isEmail(email)) {
      setValidEmail(true);
    }

    if (!validator.isEmail(email)) {
      setValidEmail(false);
    }

    if (!firstTime && validName && validPassword && validEmail) {
      auth.login();
      createUserWithEmailAndPassword(authFirebase, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/");
    }
  };
  return (
    <div className="login">
      <h1>Sign Up</h1>
      <input
        className="login__email"
        type="email"
        placeholder="email"
        ref={userEmail}
      />
      {!firstTime && !validEmail && (
        <p className="login__valid">Please enter correct email</p>
      )}
      <input
        className="login__userName"
        type="text"
        placeholder="user name"
        ref={userName}
      />
      {!firstTime && !validName && (
        <p className="login__valid">Please enter your name</p>
      )}
      <input
        className="login__password"
        type="password"
        placeholder="password"
        ref={userPassword}
      />
      {!firstTime && !validPassword && (
        <p className="login__valid">
          Please enter a password longer than 6 characters{" "}
        </p>
      )}

      <div className="signup__radio">
        <p className="signup__radio-title">Gender : </p>
        <ButtonGroup size="sm" className="buttons">
          {radios1.map((radio1, idx) => (
            <ToggleButton
              size="small"
              className="toggle1"
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-danger"}
              name="radio1"
              value={radio1.value}
              checked={radioGender === radio1.value}
              onChange={(e) => changeRadioGender(e)}
            >
              {radio1.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <div className="signup__radio">
        <p className="signup__radio-title">Area : </p>
        <ButtonGroup size="sm" className="buttons">
          {radios2.map((radio2, idx) => (
            <ToggleButton
              size="small"
              className="toggle2"
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-danger"}
              name="radio"
              value={radio2.value}
              checked={radioArea === radio2.value}
              onChange={(e) => changeRadioArea(e)}
            >
              {radio2.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <Button onClick={signUpHandler} title="Sign Up" />
      <p className="login__acount">Already have an acount ?</p>
      <Button onClick={logInHandler} title="Log In" />
    </div>
  );
}

export default Signup;
