import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayerSearch from "./pages/PlayerSearch";
import Home from "./pages/Home";
import { createTheme, ThemeProvider } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playersearch" element={<PlayerSearch />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
