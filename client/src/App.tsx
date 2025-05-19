import React from "react";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayerSearch from "./pages/PlayerSearch";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/playersearch" element={<PlayerSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
