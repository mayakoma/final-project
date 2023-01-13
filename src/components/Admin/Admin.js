import Search from "../search/Search";
import React, { useState } from "react";
import "./Admin.css";

function Admin() {
  const [usersList, setUsersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  return (
    <div>
      <h1 className="Admin_title"> Setting Page</h1>
      <div className="Admin_userSearchContenier">
        <h3 className="Admin_userSearchTitle">Search Users:</h3>
        <div className="Admin_userSearch">
          <Search className="Admin_Search" />
        </div>
      </div>
    </div>
  );
}

export default Admin;
