import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app">
        {/* <header id="main-header"></header> */}
        <Container>
          <Grid
            container
            size={12}
            spacing={2}
            sx={{ marginTop: 2, width: '100%' }}
          >
            <Router>
              {/* <NavBar /> */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </Router>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
