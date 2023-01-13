import Search from "../search/Search";
import React, { useState } from "react";
import ShowDetails from "./ShowDetails";
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
      <ShowDetails list={[2, 3, 4, 5]} />
      <div className="Admin_ordersSearchContenier">
        <h3 className="Admin_ordersSearchTitle">Search Orders:</h3>
        <div className="Admin_ordersSearch">
          <Search className="Admin_Search" />
        </div>
      </div>
      <ShowDetails list={[1, 2, 3, 4]} />
    </div>
  );
}

export default Admin;
