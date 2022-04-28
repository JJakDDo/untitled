import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Character from "./pages/Character";
import Inventory from "./pages/Inventory";
import Field from "./pages/Field";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/character' element={<Character />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/field' element={<Field />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
