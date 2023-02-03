import React, { useEffect, useContext, useState } from "react";
import { useHttpClient } from "../../Hook/HttppHook";
import { DataContext } from "../../context/data-context";
import Button from "../Button/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import "./SearchRadio.css";
const SearchRadio = function () {
  const data = useContext(DataContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [radioGender, setRadioGender] = useState("all");
  const [radioArea, setRadioArea] = useState("all");

  const changeRadioGender = (e) => {
    setRadioGender(e.currentTarget.value);
    data.setGender(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const changeRadioArea = (e) => {
    setRadioArea(e.currentTarget.value);
    data.setArea(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const radios1 = [
    { name: "all", value: "all" },
    { name: "wonem", value: "women" },
    { name: "men", value: "men" },
  ];

  const radios2 = [
    { name: "all", value: "all" },
    { name: "north", value: "north" },
    { name: "center", value: "center" },
    { name: "south", value: "south" },
  ];

  return (
    <>
      <div className="searchRadio">
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
      </div>
    </>
  );
};

export default SearchRadio;
