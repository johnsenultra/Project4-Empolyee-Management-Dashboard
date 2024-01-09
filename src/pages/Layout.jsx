import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';

function Layout() {

   const [authenticated, setAuthenticated] = useState(false);
   let navigate = useNavigate();

   useEffect(() => {
      const auth = getAuth(firebaseApp);

      onAuthStateChanged(auth, (user) => {
         if (user) {
            setAuthenticated(true);
            // const uid = user.uid; // You can use this UID if needed
         } else {
            setAuthenticated(false); // Ensure authenticated is false when the user is signed out
         }
      });
   }, []);

   // Logout function
   const logout = () => {
      const auth = getAuth(firebaseApp);
      signOut(auth)
      .then(() => {
         setAuthenticated(false);
         navigate("/login")
      })
      .catch((error) => {
         //Handle error
      })
   }
   
   return (
      <section>
         {authenticated ? (

         
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
               <Container className="container">
                  <Tooltip title='Dashboard' placement="right">
                     <Link className="navbar-brand" yto="/">
                        <DashboardCustomizeIcon/> 
                     </Link>
                  </Tooltip>
                  <Typography>Employee Management Dashboard</Typography>

                  <div className="d-flex">
                     {authenticated ? (
                        <>
                           <Tooltip title='Home'>
                              <Link className="nav-link active me-3" to="/home">
                                 <HomeWorkIcon/>
                              </Link>
                           </Tooltip>
                           
                           <Tooltip title='Add Employee'>
                              <Link className="nav-link active me-3" to="/add">
                                 <PersonAddAltRoundedIcon/>
                              </Link>
                           </Tooltip>

                           <Tooltip title='Logout'>
                              <Link className="nav-link active" onClick={logout}>
                                 <LogoutIcon/>
                              </Link>
                           </Tooltip>
                        </>
                     ) : (
                        <>
                           <Link className="nav-link active" to="/login">Login</Link>
                        </>
                     )}

                     </div>
               </Container>
            </nav>
         ) : null}
         
         <div className="container-fluid mt-5">
            <Outlet />
         </div>
         <footer className="bg-dark pt-2 text-center text-white fixed-bottom mt-auto">
            <p className="fw-medium">©️Developed by Johnsen Ultra</p>
         </footer>
      </section>
   )
}

export default Layout;
