import { Link, Outlet } from "react-router-dom";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { Container } from "@mui/material";

function Layout() {
   
   return (
      <section>
         <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <Container className="container">
               <Tooltip title='Dashboard' placement="right">
                  <Link className="navbar-brand" to="/">
                     <DashboardCustomizeIcon/>
                  </Link>
               </Tooltip>
               <div className="d-flex">
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

                  <Link className="nav-link active" to="/login">Login</Link>
                  <Tooltip title='Logout'>
                     <Link className="nav-link active">
                        <LogoutIcon/>
                     </Link>
                  </Tooltip>
               </div>
            </Container>
         </nav>
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
