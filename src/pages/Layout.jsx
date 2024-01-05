import { Link, Outlet } from "react-router-dom";

function Layout() {
   
   return (
      <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
               <Link className="navbar-brand" to="/">Employee Records</Link>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon">
                  </span>
               </button>

               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link className="nav-link active" to="/home">Home</Link>
                  </li>

                  <li className="nav-item">
                     <Link className="nav-link active" to="/add">Add Employee</Link>
                  </li>

                  <li className="nav-item">
                     <Link className="nav-link active" to="/signup">Register</Link>
                  </li>

                  </ul>
               </div>
            </div>
         </nav>
         <div className="container-fluid mt-5">
            <Outlet />
         </div>
         <footer className="bg-dark pt-2 text-center text-white fixed-bottom mt-auto">
            <p className="fw-medium">©️Developed by Johnsen Ultra</p>
         </footer>
      </>
   )
}

export default Layout; 