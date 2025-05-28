import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BuyInPage from './pages/BuyInPage';
import CashOutPage from './pages/CashOutPage';
import NavBar from './pages/components/Nav';
import DealerTip from './pages/DealerTipPage';
import Home from './pages/Home';
import RakePage from './pages/RakePage';
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
        <CssBaseline />
        {/* <header id="main-header"></header> */}
        <Container maxWidth="sm" sx={{ padding: 2 }}>
          <Router>
            <NavBar />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/site" element={<Home />} />
                <Route path="/dealer-tips" element={<DealerTip />} />
                <Route path="/rakes" element={<RakePage />} />
                <Route path="/buy-ins" element={<BuyInPage />} />
                <Route path="/cash-outs" element={<CashOutPage />} />
                <Route path="/users" element={<UserPage />} />
              </Routes>
            </Grid>
          </Router>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
