import { useState, useEffect, useRef } from 'react';
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
import Typography from '@mui/material/Typography';

function Dashboard() {

   const defaultTheme = createTheme({});
   const [employeeList, setEmployeList] = useState([]);
   const [open, setOpen] = useState(false);
   const [selectedEmployee, setSelectedEmployee] = useState(null);
   

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
   }, [])

   const deleteEmployee = (employeeID, firstname, lastname,) => {

      // Initialize Cloud Firestore and get a reference to the service
      const db = getFirestore(firebaseApp);

      let userConfirmed = window.confirm(`Are you sure you want to delete ${firstname} ${lastname}?`);

      if(userConfirmed) {
         //If confirmed, delete document
         deleteDoc(doc(db, 'employees', employeeID))
         .then(() => {
            //Additional logic after deletion if needed
         })
         .catch((error) => {
            console.error('Error deleting document: ', error);
         });
      } else {
         alert('Deletion canceled by user');
      }
   };

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
            setOpen(true)
         } else {
            console.error('Employee not found');
         }
      } catch (error) {
         console.error('Error fetching employee data: ', error);
      }
   };

   const handleClose = () => setOpen(false);

   return (
      <ThemeProvider theme={defaultTheme}>
         <Container component="main" className="container-fluid">
            <h1 className="fw-bold">Employee Records</h1>
            <p>This is a list of employee records</p>

            <table className="table table-striped">
               <thead>
                  <tr>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Email</th>
                     <th>Job Title</th>
                     <th className='px-4'>Action</th>
                  </tr>
               </thead>
               <tbody>
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
               <div>
                  <Modal
                     open={open}
                     onClose={handleClose}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description"
                  >
                     <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 350,
                        bgcolor: 'background.paper',
                        borderRadius: '13px',
                        p: 3,
                        px: 3,
                        
                        }}>
                        <Typography id="modal-modal-title" variant="h5" sx={{fontWeight: 'bold'}}>
                           Employee Information
                        </Typography>
                        <br />
                        {selectedEmployee && (
                           <div>
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
                                 <strong>Job Title:</strong> {selectedEmployee.jobtitle}
                              </Typography>
                              <Typography variant="body1">
                              <strong>Hire Date:</strong> {selectedEmployee.hiredate}
                              </Typography>
                           </div>
                        )}
                        <br />
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
                           }}>
                           Edit
                        </Button>
                     </Box>
                  </Modal>
               </div>
            </table>
         </Container>
      </ThemeProvider>
   );
}

export default Dashboard;