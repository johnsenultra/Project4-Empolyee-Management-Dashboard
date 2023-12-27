import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout.jsx";
import Dashboard from './pages/Dashboard.jsx';
import AddEmployee from './pages/AddEmployee.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Login from './pages/auth/Login.jsx';

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='home' element={<Dashboard />} />
              <Route path='add' element={<AddEmployee />} />
              <Route path='signup' element={<SignUp />} />
              <Route path='login'element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
