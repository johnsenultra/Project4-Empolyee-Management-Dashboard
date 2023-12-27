import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import firebaseApp from './firebaseConfig';
import { getFirestore, collection, onSnapshot, setDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";


const defaultTheme = createTheme();

export default function AddEmployee() {

  const [employee, setEmploye] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    gender: "",
    contact: "",
    jobtitle: "",
    hiredate: ""
  });

  const [employeeList, setEmployeList] = useState([]);
  


  useEffect(() => {
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(firebaseApp);

    try {
      // Fetch the data in the UI components
      onSnapshot(collection(db, 'employees'), snapshot => {
        const newEmployeeList = [];
        
        snapshot.forEach(employee => {
          const tempEmployee = employee.data();
          tempEmployee["employee_id"] = employee.id
          newEmployeeList.push(tempEmployee);
        });
        setEmployeList(newEmployeeList);
      });
      
    } catch (e) {
      alert("could not fetch data!");
    }
  }, [])

  const addEmployee = async () => {
    // Initialize Cloud Firestore and get reference to the service
    const db = getFirestore(firebaseApp);

    if (employee.firstname === '' || employee.lastname === '' || employee.email === '' || employee.address === '' || employee.address === '' || employee.contact === '' ||
      employee.jobtitle === '' || employee.hiredate === '') {
      alert('Some input field are empty')
    } else {
      // Generate a new employee ID based on the current year and a sequential number
      const currentYear = new Date().getFullYear();
      const sequentialNumber = employeeList.length + 1;
      const employeeID = `${currentYear.toString().slice(-2)}${sequentialNumber.toString().padStart(4, '0')}`;
      
      const newEmployee = {
        ...employee,
        employee_id: employeeID,
      };
      
      setEmployeList([...employeeList, newEmployee])

      try {
        await setDoc(doc(db, "employees", employeeID), newEmployee)
      } catch {

      }
    } 
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: -3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <h2 className='fw-bold'>Add Employee</h2>
         
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
              variant='filled'
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
              variant='filled'
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
              variant='filled'
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
              variant='filled'
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
                variant='filled'
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
                variant='filled'
              />
            </div>
          </div>
          <TextField
            margin="normal"
            size='small'
            required
            fullWidth
            name="position"
            label="Job Title"
            type="text"
            id="position"
            variant='filled'
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
            variant='filled'
            InputLabelProps={{
              shrink: true,
            }}
          />
          
            <Button type="submit" fullWidth variant="contained" 
            sx={{ 
              mt: 3,
              background: 'black',
              fontWeight: 'bold',
              ":hover": {
                background: 'purple'
              }
            }}>
              Add Employee
            </Button>
            
         </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
