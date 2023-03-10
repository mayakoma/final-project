import React, { useState, useRef, useContext } from "react";
import { useHttpClient } from "../../Hook/HttppHook";
import Button from "../Button/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataContext } from "../../context/data-context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  border: "3px solid #000",
  boxShadow: 24,
  p: 4,
  fontSize: "large",
  fontSize: "30px",
  fontFamily: "monospace",
};

function ShowDetails({ list }) {
  const [open, setOpen] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const data = useContext(DataContext);
  const userName = useRef({ value: "" });

  const [radioArea, setRadioArea] = useState("north");

  const changeRadioArea = (e) => {
    setRadioArea(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const radios2 = [
    { name: "north", value: "north" },
    { name: "center", value: "center" },
    { name: "south", value: "south" },
  ];

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const deleteObject = async (objId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/user/delete`,
        "DELETE",
        JSON.stringify({
          userId: objId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
    } catch (err) {}
    data.setIsChange(true);
  };

  const editHandler = (l) => {
    setUserEdit(l);
    console.log(l);
    console.log(userEdit);

    setRadioArea(l.area);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const updateUser = async () => {
    const name = userName.current.value;
    console.log("name");
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/user/update`,
        "PATCH",
        JSON.stringify({
          userId: userEdit._id,
          userName: name,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData.user);
      closeModal();
      data.setIsChange(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ul className="showDetails">
        {list != [] &&
          list.map((l, i) => (
            <li key={i} className="showDetails_userItem">
              <div className="showDetails_info">
                <p>
                  <strong>email:</strong> {l.email}
                </p>
                <p>
                  <strong>user Name:</strong> {l.userName}
                </p>
                <p>
                  <strong>Area: </strong>
                  {l.area}
                </p>
                <p>
                  <strong>Gender: </strong>
                  {l.gender}
                </p>
              </div>
              <div className="buttons">
                <button
                  className="showDetails_delBtn"
                  onClick={() => {
                    editHandler(l);
                  }}
                >
                  edit
                </button>
                <button
                  className="showDetails_delBtn"
                  onClick={function () {
                    deleteObject(l._id);
                  }}
                >
                  delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      <Modal
        open={open}
        onClose={() => closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="div" component="div">
            <input
              className="login__userName"
              type="text"
              placeholder={userEdit.userName}
              ref={userName}
            />
          </Typography>
          {/* <Typography id="modal-modal-title" variant="div" component="div">
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
          </Typography> */}
          <Typography id="modal-modal-title" variant="div" component="div">
            <button
              onClick={() => {
                updateUser();
              }}
            >
              update
            </button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default ShowDetails;
