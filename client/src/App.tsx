import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { createTheme, ThemeProvider } from '@mui/material';
import DealerTip from './pages/DealerTipPage';
import RakePage from './pages/RakePage';
import BuyInPage from './pages/BuyInPage';
import CashOutPage from './pages/CashOutPage';
import NavBar from './pages/components/Nav';
import UserPage from './pages/UserPage';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app">
        {/* <header id="main-header"></header> */}
        <div className="content">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dealer-tips" element={<DealerTip />} />
              <Route path="/rakes" element={<RakePage />} />
              <Route path="/buy-ins" element={<BuyInPage />} />
              <Route path="/cash-outs" element={<CashOutPage />} />
              <Route path="/users" element={<UserPage />} />
            </Routes>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
