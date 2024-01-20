import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout.jsx";
import Dashboard from './pages/Dashboard.jsx';
import AddEmployee from './pages/AddEmployee.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Login from './pages/auth/Login.jsx';

function App() {

  const defaultTheme = createTheme({});

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          {/* No need to wrap all routes in Layout */}
          <Route path="signup" element={<SignUp />} />
          {/* Login route is not wrapped in a Layout */}
          <Route path="login" element={<Login />} />
          {/* Layout will be rendered for these routes */}
          <Route path="/*" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="home" element={<Dashboard />} />
            <Route path="add" element={<AddEmployee />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
