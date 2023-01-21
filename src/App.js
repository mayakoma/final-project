import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./App.css";
import React, {
  useRef,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { useHttpClient } from "./Hook/HttppHook";
// import { Navigate } from "react-router-dom";

import Checkout from "./components/Checkout/Checkout";
import Footer from "./components/footer/footer";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navigation from "./components/navigation/Navigation";
import ChosenProduct from "./components/ChosenProduct/ChosenProduct";
import Admin from "./components/Admin/Admin";
import { DataContext } from "./context/data-context";

import { AddCommentOutlined } from "@mui/icons-material";

const productsList = [
  {
    id: "1",
    title: "bread",
    price: "20",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
    description: "description about bread",
  },
  {
    id: "2",
    title: "corasun",
    price: "10",
    image:
      "https://st1.foodsd.co.il/Images/Recipes/xxl/Recipe-6429-HdKoeWt7mj6rsvnk.jpg",
    description: "description about bread",
  },
  {
    id: "3",
    title: "pita",
    price: "2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
    description: "description about bread",
  },
  {
    id: "4",
    title: "cake",
    price: "29.9",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
    description: "description about bread",
  },
  {
    id: "5",
    title: "cokkie",
    price: "19.9",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
    description: "description about bread",
  },
  {
    id: "6",
    title: "cake2",
    price: "29.9",
    image:
      "https://cdn.goodlifetv.co.il/wp-content/uploads/2021/08/09183655/AdobeStock_380794710.jpg",
    description: "description about bread",
  },
  {
    id: "7",
    title: "oreo coookie",
    price: "29.9",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
    description: "description about bread",
  },
  {
    id: "8",
    title: "snikers",
    price: "29.9",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
    description: "description about bread",
  },
];

function App() {
  const auth = useContext(DataContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [list, setList] = useState([]);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const adminIn = useCallback(() => {
    setIsAdmin(true);
  }, []);

  const adminOut = useCallback(() => {
    setIsAdmin(false);
  }, []);

  const addToList = useCallback(async (searchFilter) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/product/search`,
        "POST",
        JSON.stringify({
          title: searchFilter,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setList(responseData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    addToList("");
  }, []);

  return (
    <DataContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        isAdmin: isAdmin,
        adminIn: adminIn,
        adminOut: adminOut,
        addToList: addToList,
        list: list,
      }}
    >
      <Router>
        <div className="App">
          <Navigation />
          <img
            src="https://cohanimbakery.co.il/f-users/user_105071/website_105732/images/thumbs/W_960_240a8042_lr.jpg"
            className="app_img"
          />
          <div className="App_bodyConteiner">
            <Routes>
              <Route path="/" element={<List products={list} />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile/:id" element="" />
              <Route
                path="/:index"
                element={<div>{<ChosenProduct products={list} />}</div>}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
