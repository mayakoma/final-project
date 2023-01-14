import Search from "../search/Search";
import React, { useEffect, useState } from "react";
import ShowDetails from "./ShowDetails";
import ShowOrders from "./ShowOrders";
import { useHttpClient } from "../../Hook/HttppHook";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./Admin.css";
import Button from "../Button/Button";

function Admin() {
  const [usersList, setUsersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getUsersList = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:3001/user/getUsers"
      );
      setUsersList(responseData);
    } catch (err) {}
  };
  const getOrderList = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:3001/order/getOrders"
      );
      setOrdersList(responseData);
    } catch (err) {}
  };

  useEffect(() => {
    getUsersList();
    getOrderList();
  }, [sendRequest, usersList, ordersList]);

  return (
    <div>
      <h1 className="Admin_title"> Setting Page</h1>
      <div className="Admin_userSearchContenier">
        <h3 className="Admin_userSearchTitle">Search Users:</h3>
        <div className="Admin_userSearch">
          <Search className="Admin_Search" />
        </div>
      </div>
      <div className="Admin_usersInfo">
        {!usersList ? (
          <LoadingSpinner />
        ) : (
          <ShowDetails list={usersList || []} />
        )}
      </div>
      <div className="Admin_ordersSearchContenier">
        <h3 className="Admin_ordersSearchTitle">Search Orders:</h3>
        <div className="Admin_ordersSearch">
          <Search className="Admin_Search" />
        </div>
      </div>
      <div className="Admin_usersInfo">
        {ordersList == [] ? (
          <LoadingSpinner />
        ) : (
          <ShowOrders list={ordersList} />
        )}
      </div>
      <Button> Add Product</Button>
    </div>
  );
}

export default Admin;
