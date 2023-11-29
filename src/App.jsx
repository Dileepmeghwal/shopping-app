import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Header from "./component/Header";
import { useAuth } from "./context/AuthContext";
import Register from "./pages/Register";

function App() {
  const [count, setCount] = useState(0);

  const { accessToken, logout } = useAuth();

  return (
    <>
      <Routes>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/" element={accessToken ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
