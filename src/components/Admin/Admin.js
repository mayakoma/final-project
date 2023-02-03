import Search from "../search/Search";
import React, { useEffect, useState, useRef, useContext } from "react";
import ShowDetails from "./ShowDetails";
import ShowOrders from "./ShowOrders";
import { useHttpClient } from "../../Hook/HttppHook";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { DataContext } from "../../context/data-context";

import "./Admin.css";
import AddProductForm from "../AddProductForm/AddProductForm";
import SearchRadio from "../search-radio/SearchRadio";

function Admin() {
  const [usersList, setUsersList] = useState([]);
  const data = useContext(DataContext);
  const [ordersList, setOrdersList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dateRef = useRef({ value: "" });
  const addressRef = useRef({ value: "" });
  const priceRef = useRef({ value: "" });
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDateFunc] = useState("");
  const [nextDate, setNextDateFunc] = useState("");
  const [price, setPrice] = useState(0.0);

  const getUsersList = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:3001/user/search",
        "POST",
        JSON.stringify({
          userName: search,
          area: [data.area],
          gender: [data.gender],
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setUsersList(responseData);
    } catch (err) {}
  };
  const getOrderList = async () => {
    try {
      const responseData = await sendRequest(
        "http://localhost:3001/order/search",
        "POST",
        JSON.stringify({
          orderDate: date,
          untilOrderDate: nextDate,
          totalPrice: price,
          address: address,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setOrdersList(responseData);
    } catch (err) {}
  };

  useEffect(() => {
    if (data.isChange) {
      getUsersList();
      getOrderList();
      data.setIsChange(false);
    }
  }, [data.isChange]);

  const castDate = (date) => {
    const nextDate = new Date(date);
    const currentDateString = nextDate.toISOString();
    setDateFunc(currentDateString);

    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateString = nextDate.toISOString();
    setNextDateFunc(nextDateString);
  };

  return (
    <div className="admin">
      <h1 className="Admin_title"> Admin Page</h1>
      <div className="Admin_userSearchContenier">
        <h3 className="Admin_userSearchTitle">Search Users:</h3>
        <div className="Admin_userSearch">
          {/* <Search className="Admin_Search" /> */}
          <textarea
            className="Search_data"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchRadio />
          <button onClick={getUsersList}>Search</button>
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
            onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
            placeholder="Orders from price"
          />
          <input
            className="login__userName"
            type="date"
            onChange={(e) => castDate(e.target.value)}
          />
          <input
            className="login__userName"
            type="text"
            placeholder="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button onClick={getOrderList}>Search</button>
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
