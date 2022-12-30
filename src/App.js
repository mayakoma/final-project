import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Checkout from "./components/checkout/Checkout";
import Footer from "./components/footer/footer";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <img
          src="https://cohanimbakery.co.il/f-users/user_105071/website_105732/images/thumbs/W_960_240a8042_lr.jpg"
          className="app_img"
        />
        <div className="App_bodyConteiner">
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/:id" element="" />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
