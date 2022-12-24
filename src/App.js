import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Checkout from "./components/checkout/Checkout";
import Footer from "./components/footer/footer";
import List from "./components/list/List";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <img
          src="https://www.tastingtable.com/img/gallery/the-best-ways-to-keep-donuts-fresh/intro-1642795858.webp"
          className="app_img"
        />
        <div className="App_bodyConteiner">
          <Routes>
            <Route path="/list" element={<List />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
