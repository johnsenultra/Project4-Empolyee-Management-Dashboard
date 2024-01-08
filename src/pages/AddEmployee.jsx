import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import firebaseApp from './firebaseConfig';
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore";
import Swal from 'sweetalert2'


const defaultTheme = createTheme();

export default function AddEmployee() {

  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    gender: "",
    contact: "",
    jobtitle: "",
    hiredate: ""
  });

  const [employeeList, setEmployeeList] = useState([]);
  

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
        setEmployeeList(newEmployeeList);
      });
      
    } catch (e) {
      alert("could not fetch data!");
    }
  }, [])

  // Add new employed employee
  const addEmployee = async () => {
    // Initialize Cloud Firestore and get reference to the service
    const db = getFirestore(firebaseApp);

    if (employee.firstname === '' || employee.lastname === '' || employee.email === '' || employee.address === '' || employee.address === '' || employee.gender === '' || employee.contact === '' ||
      employee.jobtitle === '' || employee.hiredate === '') {
        Swal.fire({
          toast: true,
          text: 'Some input fields are empty',
          icon: 'error',
          confirmButtonText: 'OK',
        })
    } else {
      setEmployeeList(
        employeeList => [
            ...employeeList, employee
        ]
      );

      addDoc(collection(db, 'employees'), employee);

      setEmployee({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        gender: "",
        contact: "",
        jobtitle: "",
        hiredate: ""
      });

      Swal.fire({
        toast: 'true',
        text: 'Added successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
    }
      

    //   // Generate a new employee ID based on the current year and a sequential number
    //   const currentYear = new Date().getFullYear();
    //   const sequentialNumber = employeeList.length + 1;
    //   const employeeID = `${currentYear.toString().slice(-2)}${sequentialNumber.toString().padStart(4, '0')}`;
      
    //   const newEmployee = {
    //     ...employee,
    //     employee_id: employeeID,
    //   };
      
    //   setEmployeeList([...employeeList, newEmployee])

    //   try {
    //     await setDoc(doc(db, "employees", employeeID), newEmployee)
    //   } catch (error) {
    //     console.error('Error adding document: ', error)
    //   }

    //   setEmployee({
    //     firstname: "",
    //     lastname: "",
    //     email: "",
    //     address: "",
    //     gender: "",
    //     contact: "",
    //     jobtitle: "",
    //     hiredate: ""

    //   });
    // } 
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
              variant='outlined'
              onChange={(e) => setEmployee({
                ...employee,
                firstname: e.target.value
              })}
              value={employee.firstname}
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
                onChange={(e) => setEmployee({
                  ...employee,
                  lastname: e.target.value
                })}
                value={employee.lastname}
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
              onChange={(e) => setEmployee({
                ...employee,
                email: e.target.value
              })}
              value={employee.email}
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
              onChange={(e) => setEmployee({
                ...employee,
                address: e.target.value
              })}
              value={employee.address}
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
                  onChange={(e) => setEmployee({
                    ...employee,
                    gender: e.target.value
                  })}
                  value={employee.gender}
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
                  onChange={(e) => setEmployee({
                    ...employee,
                    contact: e.target.value
                  })}
                  value={employee.contact}
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
              onChange={(e) => setEmployee({
                ...employee,
                jobtitle: e.target.value
              })}
              value={employee.jobtitle}
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
              onChange={(e) => setEmployee({
                ...employee,
                hiredate: e.target.value
              })}
              value={employee.hiredate}
            />
          
            <Button fullWidth variant="contained" onClick={() => addEmployee() } 
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
