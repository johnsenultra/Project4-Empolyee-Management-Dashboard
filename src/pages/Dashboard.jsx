import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, getDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Visibility from '@mui/icons-material/VisibilityRounded';
import DeleteIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Login from './auth/Login';
import Swal from 'sweetalert2';

function Dashboard() {

   const defaultTheme = createTheme({});
   const [employeeList, setEmployeList] = useState([]);
   const [open, setOpen] = useState(false);
   const [selectedEmployee, setSelectedEmployee] = useState(null);
   const [editToggle, setEditToggle] = useState(false);
   const [authenticated, setAuthenticated] = useState(false);
   const [userProperties, setUserProperties] = useState({});
   

   useEffect(() => {
      const db = getFirestore(firebaseApp);

      try {
         onSnapshot(collection(db, 'employees'), snapshot => {
            const newEmployeeList = [];

            snapshot.forEach(employee => {
               const tempEmployee = employee.data();
               tempEmployee["employee_id"] = employee.id;
               newEmployeeList.push(tempEmployee);
            });
            setEmployeList(newEmployeeList);
         });
      } catch (e) {
         alert ("Could not fetch data!");
      }

      const auth = getAuth(firebaseApp);

      onAuthStateChanged(auth, (user) => {
         if (user) {
            setAuthenticated(true);
            setUserProperties(user);
         } else {
            // User is signed out
            // ...
         }
      });
   }, [])

   // Delete employee in the list 
   const deleteEmployee = (employeeID, firstname, lastname,) => {

      // Initialize Cloud Firestore and get a reference to the service
      const db = getFirestore(firebaseApp);

      Swal.fire({
         toast: true,
         title: 'Delete Employee',
         text: `Are you sure you want to delete ${firstname} ${lastname}?`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Confirm',
         cancelButtonText: 'Cancel',
         customClass: {
            confirmButton: 'btn btn-dark',
         }
      })
      .then((result) => {
         if(result.isConfirmed) {
            //If confirmed, delete document
            deleteDoc(doc(db, 'employees', employeeID))
            .then(() => {
               //Additional logic after deletion if needed
            })
            .catch((error) => {
               console.error('Error deleting document: ', error);
            });
         } else {
            Swal.fire({
               toast: true,
               text: 'Deletion canceled by the user',
               icon: 'info',
               showConfirmButton: false,
               timer: 1800
            })
         }
      });
   };


   // Fetch data for specific employee when click the view icon
   const handleInfoEmployee = async (employeeID) => {
      const db = getFirestore(firebaseApp);
      const employeeDoc = doc(db, 'employees', employeeID);

      try {
         const employeeSnapshot = await getDoc(employeeDoc);

         if (employeeSnapshot.exists()) {
            const employeeData = {
               employee_id: employeeSnapshot.id,
               ...employeeSnapshot.data(),
            };

            setSelectedEmployee(employeeData);

            setEditToggle(false);
            setOpen(true);
            
         } else {
            console.error('Employee not found');
         }
      } catch (error) {
         console.error('Error fetching employee data: ', error);
      }
   };

   const handleClose = () => setOpen(false);

   const editEmployee = () => {
      setEditToggle(true);
   };

   const handleEmployeeUpdate = async () => {
      try {
         // Initialize Cloud Firestore and get a reference to the service
         const db = getFirestore(firebaseApp);
         const employeeRef = doc(db, 'employees', selectedEmployee.employee_id);

         // Check if any of the fields are empty or blank
         if (!selectedEmployee.firstname.trim() || !selectedEmployee.lastname.trim() || !selectedEmployee.email.trim() || 
         !selectedEmployee.address.trim() || !selectedEmployee.gender.trim() || selectedEmployee.jobtitle === '' ){
            

            // alert('error')
            Swal.fire({
               toast: true,
               text: 'Please fill in all fields before updating',
               icon: 'warning',
               confirmButtonText: 'OK',
               customClass: {
                 confirmButton: 'btn btn-dark',
               },
            })
         } else {
               // Updated data
            const updatedData = {
               firstname: selectedEmployee.firstname,
               lastname: selectedEmployee.lastname,
               email: selectedEmployee.email,
               address: selectedEmployee.address,
               gender: selectedEmployee.gender,
               contact: selectedEmployee.contact,
               jobtitle: selectedEmployee.jobtitle,
               hiredate: selectedEmployee.hiredate
            };

             // Update the document
            await updateDoc(employeeRef, updatedData);

            handleClose(); // Close the modal after successful update
         }
      } catch (error) {
         console.log('Error updating the employee data: ', error);
      }
   };


   if (authenticated) {
      return (
         <ThemeProvider theme={defaultTheme}>
            <Container component="main" className="container-fluid">
               <h1 className="fw-bold">Employee List</h1>
               <p>This is a list of employed employee</p>

               <div className='table-responsive' style={{ overflowX: 'auto', maxHeight: '450px' }}>
                  <table className="table table-striped">
                     <thead className='table-success' style={{position: 'sticky'}}>
                        <tr>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>Email</th>
                           <th>Job Title</th>
                           <th className='px-4'>Action</th>
                        </tr>
                     </thead>
                     <tbody className='table-dark'>
                        {employeeList.map((employeeRecord) => (
                           <tr className='border' key={employeeRecord.id}>
                              <td>{employeeRecord.firstname}</td>
                              <td>{employeeRecord.lastname}</td>
                              <td>{employeeRecord.email}</td>
                              <td>{employeeRecord.jobtitle}</td>
                              <td>
                                 <Tooltip title='View' placement='left'>
                                    <IconButton className="btn btn-secondary btn-sm"
                                       onClick={() => handleInfoEmployee(employeeRecord.employee_id)}>
                                       <Visibility color='info'/>
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title='Delete' placement='right'>
                                    <IconButton onClick={() => 
                                       deleteEmployee(employeeRecord.employee_id, employeeRecord.firstname, employeeRecord.lastname, employeeRecord.email,
                                       employeeRecord.address, employeeRecord.gender, employeeRecord.contact, employeeRecord.jobtitle, employeeRecord.hiredate
                                    )}
                                       className="btn btn-danger btn-sm">
                                       <DeleteIcon color='warning'/>
                                    </IconButton>
                                 </Tooltip>
                              </td>
                           </tr>
                        ))}
                     </tbody>

                     <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                     >
                        <Box sx={{
                           position: 'absolute',
                           top: '45%',
                           left: '50%',
                           transform: 'translate(-50%, -50%)',
                           bgcolor: 'background.paper',
                           borderRadius: '13px',
                           p: 3,
                           px: 3,
                           
                           }}>
                           {selectedEmployee && (
                              
                              <div>
                                 {editToggle ? (
                                    <Box
                                       sx={{
                                       }}
                                    >
                                       
                                       <Typography id="modal-modal-title" variant="h4" sx={{fontWeight: 'bold'}}>
                                          Edit Employee Information
                                       </Typography>
                                       <br />
                                       
                                       {/* Input field */}
                                       <div className="row ">
                                       <div className="col md-6">
                                          <TextField
                                          margin="normal"
                                          size='small'
                                          required
                                          fullWidth
                                          id="firstname"
                                          label="First Name"
                                          name="firstname"
                                          variant='outlined'
                                          InputLabelProps={{
                                             shrink: true,
                                          }}
                                          onChange={(e) => setSelectedEmployee({
                                             ...selectedEmployee,
                                             firstname: e.target.value
                                          })}
                                          value={selectedEmployee.firstname}
                                          />
                                       </div>
                           
                                       <div className="col md-6">
                                          <TextField
                                             margin="normal"
                                             size='small'
                                             required
                                             fullWidth
                                             id="lastname"
                                             label="Last Name"
                                             name="=lastname"
                                             variant='outlined'
                                             InputLabelProps={{
                                                shrink: true,
                                             }}
                                             onChange={(e) => setSelectedEmployee({
                                                ...selectedEmployee,
                                                lastname: e.target.value
                                             })}
                                             value={selectedEmployee.lastname}
                                          />
                                       </div>
                                       </div>
                           
                                    <Box component="form"  noValidate sx={{ mt: 0 }}>
                                       <TextField
                                          margin="normal"
                                          size='small'
                                          required
                                          fullWidth
                                          id="email"
                                          label="Email"
                                          name="email"
                                          type='email'
                                          variant='outlined'
                                          InputLabelProps={{
                                             shrink: true,
                                          }}
                                          onChange={(e) => setSelectedEmployee({
                                             ...selectedEmployee,
                                             email: e.target.value
                                          })}
                                          value={selectedEmployee.email}
                                       />
                                       <TextField
                                          margin="normal"
                                          size='small'
                                          required
                                          fullWidth
                                          name="address"
                                          label="Address"
                                          type="text"
                                          id="address"
                                          variant='outlined'
                                          InputLabelProps={{
                                             shrink: true,
                                          }}
                                          onChange={(e) => setSelectedEmployee({
                                             ...selectedEmployee,
                                             address: e.target.value
                                          })}
                                          value={selectedEmployee.address}
                                       />
                           
                                       <div className="row ">
                                          <div className="col md-6">
                                             <TextField
                                             margin="normal"
                                             size='small'
                                             required
                                             fullWidth
                                             name="gender"
                                             label="Gender"
                                             type="text"
                                             id="gender"
                                             variant='outlined'
                                             InputLabelProps={{
                                                shrink: true,
                                             }}
                                             onChange={(e) => setSelectedEmployee({
                                                ...selectedEmployee,
                                                gender: e.target.value
                                             })}
                                             value={selectedEmployee.gender}
                                             />
                                          </div>
                           
                                          <div className="col md-6">
                                             <TextField
                                             margin="normal"
                                             size='small'
                                             required
                                             fullWidth
                                             name="contact"
                                             label="Contact"
                                             type="text"
                                             id="contact"
                                             variant='outlined'
                                             InputLabelProps={{
                                                shrink: true,
                                             }}
                                             onChange={(e) => setSelectedEmployee({
                                                ...selectedEmployee,
                                                contact: e.target.value
                                             })}
                                             value={selectedEmployee.contact}
                                             />
                                          </div>
                                       </div>
                                       
                                       <TextField
                                          margin="normal"
                                          size='small'
                                          required
                                          fullWidth
                                          name="jobtitle"
                                          label="Job Title"
                                          type="text"
                                          id="jobtitle"
                                          variant='outlined'
                                          InputLabelProps={{
                                             shrink: true,
                                          }}
                                          onChange={(e) => setSelectedEmployee({
                                             ...selectedEmployee,
                                             jobtitle: e.target.value
                                          })}
                                          value={selectedEmployee.jobtitle}
                                       />
                                       <TextField
                                          margin="normal"
                                          size='small'
                                          required
                                          fullWidth
                                          name="hiredate"
                                          label="Hire Date"
                                          type="date"
                                          id="hiredate"
                                          variant='outlined'
                                          InputLabelProps={{
                                             shrink: true,
                                          }}
                                          onChange={(e) => setSelectedEmployee({
                                             ...selectedEmployee,
                                             hiredate: e.target.value
                                          })}
                                          value={selectedEmployee.hiredate}
                                       />
                     
                                       </Box>
                                    </Box>
                                 
                                 ) : (
                                    <Box>
                                       <Typography id="modal-modal-title" variant="h4" sx={{fontWeight: 'bold'}}>
                                          Employee Information
                                       </Typography>
                                       <br />

                                       <Typography variant="body1">
                                          <strong>First Name:</strong> {selectedEmployee.firstname}
                                       </Typography>

                                       <Typography variant="body1">
                                       <strong>Last Name:</strong> {selectedEmployee.lastname}
                                       </Typography>

                                       <Typography variant="body1">
                                       <strong>Email:</strong> {selectedEmployee.email}
                                       </Typography>

                                       <Typography variant="body1">
                                       <strong>Address:</strong> {selectedEmployee.address}
                                       </Typography>

                                       <Typography variant="body1">
                                       <strong>Gender:</strong> {selectedEmployee.gender}
                                       </Typography>

                                       <Typography variant="body1">
                                       <strong>Contact:</strong> {selectedEmployee.contact}
                                       </Typography>

                                       <Typography variant="body1">
                                          <strong>Job Title:</strong> {selectedEmployee.jobtitle}
                                       </Typography>

                                       <Typography variant="body1">
                                       <strong>Hire Date:</strong> {selectedEmployee.hiredate}
                                       </Typography>
                                    </Box>
                                 )}
                                 <Box>
                                 <br />
                                 {editToggle ? (
                                    <Button style={{margin: '0 auto', display: "flex"}}
                                       variant="contained"
                                       color="primary"
                                       sx={{
                                          fontWeight: 'bold',
                                          backgroundColor: 'primary',
                                          color: 'white',
                                          transition: 'background-color 0.3s',
                                          '&:hover': {
                                             backgroundColor: '',
                                          },
                                       }}
                                       onClick={() => handleEmployeeUpdate()}
                                       >
                                       Update
                                    </Button>
                                 ) : (
                                    <Button style={{margin: '0 auto', display: "flex"}}
                                       variant="contained"
                                       color="primary"
                                       sx={{
                                          fontWeight: 'bold',
                                          backgroundColor: 'primary',
                                          color: 'white',
                                          transition: 'background-color 0.3s',
                                          '&:hover': {
                                             backgroundColor: '',
                                          },
                                       }}
                                       onClick={() => editEmployee()}
                                       >
                                       Edit
                                    </Button>
                                 )}
                                    
                                 </Box>
                              </div>

                           )}

                        </Box>
                     </Modal>
                  </table>
               </div>
            </Container>
         </ThemeProvider>
      );
   } else {
      return (
         <Login />
      )
   }
}

export default Dashboard;