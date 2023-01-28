import Search from "../search/Search";
import React, { useEffect, useState, useRef } from "react";
import ShowDetails from "./ShowDetails";
import ShowOrders from "./ShowOrders";
import { useHttpClient } from "../../Hook/HttppHook";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./Admin.css";
import AddProductForm from "../AddProductForm/AddProductForm";
import SearchRadio from "../search-radio/SearchRadio";

function Admin() {
  const [usersList, setUsersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dateRef = useRef({ value: "" });
  const addressRef = useRef({ value: "" });
  const numRef = useRef({ value: "" });

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
    <div className="admin">
      <h1 className="Admin_title"> Admin Page</h1>
      <div className="Admin_userSearchContenier">
        <h3 className="Admin_userSearchTitle">Search Users:</h3>
        <div className="Admin_userSearch">
          <Search className="Admin_Search" />
          {/* <input
            className="login__userName"
            type="text"
            ref={numRef}
            placeholder="Order's number"
          /> */}
          <SearchRadio />
          {/* <button>Search</button> */}
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
          {/* <Search className="Admin_Search" /> */}
          <input
            className="login__userName"
            type="text"
            ref={numRef}
            placeholder="Order's number"
          />
          <input className="login__userName" type="date" ref={dateRef} />
          <input
            className="login__userName"
            type="text"
            placeholder="address"
            ref={addressRef}
          />
        </div>
        <button>Search</button>
      </div>
      <div className="Admin_ordersInfo">
        {ordersList == [] ? (
          <LoadingSpinner />
        ) : (
          <ShowOrders list={ordersList} />
        )}
      </div>
      <AddProductForm />
    </div>
  );
}

export default Admin;
