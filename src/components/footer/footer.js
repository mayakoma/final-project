import React, { useEffect, useState, useContext } from "react";
import "./footer.css";
import { io } from "socket.io-client";
import { DataContext } from "../../context/data-context";

const Footer = function ({ socket }) {
  const data = useContext(DataContext);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    socket.on("userNumber", (users) => {
      setUsers(users);
    });
  }, [users, socket]);
  return <div className="footer"> {<p>number of users {users}</p>} </div>;
};

export default Footer;
