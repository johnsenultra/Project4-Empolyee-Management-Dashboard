import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import Swal from "sweetalert2";
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
      // Display a confirmation alert using SweetAlert2
      Swal.fire({
      toast: true,
      title: 'Logout',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      customClass: {
         confirmButton: 'btn btn-danger', // You can customize the button style
         cancelButton: 'btn btn-secondary', // You can customize the button style
      },
      }).then((result) => {
         if (result.isConfirmed) {
            // User clicked "Yes," proceed with logout
            const auth = getAuth(firebaseApp);
            signOut(auth)
               .then(() => {
               setAuthenticated(false);
               navigate("/login");
               })
               .catch((error) => {
               // Handle error
               console.error('Error logging out: ', error);
               });
         } else {
            // User clicked "Cancel," do nothing
         }
      });
   };
 
   
   return (
      <section>
         {authenticated ? (
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
               <Container className="container">
                  <Tooltip title='Dashboard' placement="bottom">
                     <Link className="navbar-brand" to="/">
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
         <footer className="pb-4 text-center text-black fixed-bottom mt-auto">
            <Typography className="fw-medium">©️Developed by Johnsen Ultra</Typography>
         </footer>
      </section>
   )
}

export default Layout;
