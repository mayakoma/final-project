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
import Checkout from "./components/Checkout/Checkout";
import Footer from "./components/footer/footer";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navigation from "./components/navigation/Navigation";
import ChosenProduct from "./components/ChosenProduct/ChosenProduct";
import Admin from "./components/Admin/Admin";
import { DataContext } from "./context/data-context";
import { io } from "socket.io-client";
import { AddCommentOutlined } from "@mui/icons-material";
import List2 from "./components/list/List copy";

// const productsList = [
//   {
//     id: "1",
//     title: "bread",
//     price: "20",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
//     description: "description about bread",
//   },
//   {
//     id: "2",
//     title: "corasun",
//     price: "10",
//     image:
//       "https://st1.foodsd.co.il/Images/Recipes/xxl/Recipe-6429-HdKoeWt7mj6rsvnk.jpg",
//     description: "description about bread",
//   },
//   {
//     id: "3",
//     title: "pita",
//     price: "2",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
//     description: "description about bread",
//   },
//   {
//     id: "4",
//     title: "cake",
//     price: "29.9",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
//     description: "description about bread",
//   },
//   {
//     id: "5",
//     title: "cokkie",
//     price: "19.9",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
//     description: "description about bread",
//   },
//   {
//     id: "6",
//     title: "cake2",
//     price: "29.9",
//     image:
//       "https://cdn.goodlifetv.co.il/wp-content/uploads/2021/08/09183655/AdobeStock_380794710.jpg",
//     description: "description about bread",
//   },
//   {
//     id: "7",
//     title: "oreo coookie",
//     price: "29.9",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
//     description: "description about bread",
//   },
//   {
//     id: "8",
//     title: "snikers",
//     price: "29.9",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4BK_hUxmAf_6--dz_DRtEddqGYdt48nj4Q&usqp=CAU",
//     description: "description about bread",
//   },
// ];

const socket = io.connect("http://localhost:3001");

function App() {
  const auth = useContext(DataContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [list, setList] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [area, setarea] = useState("");
  const [gender, setgender] = useState("");
  const [isChange, setisChange] = useState(false);
  const [userid, setUserid] = useState("");

  const setIsChange = (flag) => {
    setisChange(flag);
  };

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const setId = useCallback((uid) => {
    setUserid(uid);
  }, []);

  const adminIn = useCallback(() => {
    setIsAdmin(true);
  }, []);

  const adminOut = useCallback(() => {
    setIsAdmin(false);
  }, []);

  const setGender = useCallback((gender) => {
    setgender(gender);
  }, []);

  const setArea = useCallback((area) => {
    setarea(area);
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
      setPokemons(responseData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getData = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/product/getProducts`
      );
      setPokemons(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const sendToServer = async (pokemon) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/product/add`,
        "POST",
        JSON.stringify({
          index: pokemon.index,
          title: pokemon.name,
          description: `defense: ${pokemon.defense}, height:${pokemon.height}, attack: ${pokemon.attack}`,
          image: pokemon.image,
          price: pokemon.price,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    let index = 0;
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/"
    );
    const data = await res.json();
    data.results.forEach(async (element, i) => {
      const pokemonRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${element.name}`
      );
      const pokemonData = await pokemonRes.json();

      setPokemons((prevPokemons) => [
        ...prevPokemons,
        {
          name: pokemonData.name,
          type: pokemonData.types[0].type.name,
          height: pokemonData.height,
          image: pokemonData.sprites.front_default,
          attack: pokemonData.stats[0].base_stat,
          defense: pokemonData.stats[1].base_stat,
          price: Math.floor(Math.random() * 121) + 30,
          index: i,
        },
      ]);
    });
    pokemons.forEach((pokemon) => sendToServer(pokemon));
  };

  useEffect(() => {
    // fetchData();
    getData();
    // addToList("");
  }, []);

  return (
    <DataContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        gender: gender,
        area: area,
        userId: userid,
        setUserId: setId,
        isAdmin: isAdmin,
        adminIn: adminIn,
        adminOut: adminOut,
        addToList: addToList,
        list: list,
        setGender: setGender,
        setArea: setArea,
        isChange: isChange,
        setIsChange: setIsChange,
      }}
    >
      <Router>
        <div className="App">
          <Navigation />
          <img
            src="https://wallpaper.dog/large/743770.jpg"
            className="app_img"
          />
          <div className="App_bodyConteiner">
            <Routes>
              {/* <Route path="/" element={<List products={list} />} /> */}
              <Route path="/" element={<List2 products={pokemons} />} />
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
          <Footer socket={socket} />
        </div>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
