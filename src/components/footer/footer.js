import React, { useEffect, useState } from "react";
import "./footer.css";
import { io } from "socket.io-client";

const Footer = function ({ socket }) {
  const [users, setUsers] = useState(0);

  useEffect(() => {
    socket.on("userNumber", (users) => {
      setUsers(users);
    });
  }, [users, socket]);
  return <div className="footer">number of users {users} </div>;
};

export default Footer;
