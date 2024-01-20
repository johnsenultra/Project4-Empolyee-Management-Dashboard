import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseApp from '../firebaseConfig';
import Swal from 'sweetalert2'

const defaultTheme = createTheme();

export default function SignIn() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  let navigate = useNavigate();

  const handleSignup = () => {

    if (lastname !== '' && firstname !== '' && 
    email !== '' && isValidEmail(email) && 
    password !== '' && isValidPassword(password) && 
    confirmPassword !== '' && password === confirmPassword) {
       
      const auth = getAuth(firebaseApp);
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed up 
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          });
          Swal.fire({
            toast: 'true',
            text: `Hello, ${firstname} ${lastname}! Your account has been successfully created.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 4000
          })
        navigate("/login");

      }).catch((error) => {
        Swal.fire({
          toast: 'true',
          text: error,
          icon: 'warning',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'btn btn-dark',
          },
        })
      });
    } else {
      let errorMessage = 'Please fill in all the required fields!';
      if (email !== '' && !isValidEmail(email)) {
        errorMessage = 'Please enter a valid email address!';
      }
      if (password !== '' && !isValidPassword(password)) {
        errorMessage = 'Please enter a valid password (at least 8 characters)!';
      }

      Swal.fire({
        toast: 'true',
        title: 'Incomplete or Invalid',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-dark',
        },
      });
    }
  };

  // Helper functions for email and password validation
  const isValidEmail = (email) => {
  // For a simple check, use a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
  // For a simple check, ensure it's at least 6 characters
  return password.length >= 8;
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

          <Avatar sx={{ m: 2, mt: 10, bgcolor: '#333333',}}>
            <AddCircleOutlineRoundedIcon />
          </Avatar>
          
          <Typography className='fw-bold' component="h1" variant="h4">
            Sign up
          </Typography>
          <p>Create your account here.</p>
          
          {/* Input field */}
          <div className="row ">
            <div className="col md-6">
               <TextField
                margin = "normal"
                size = 'small'
                required
                fullWidth
                id = "firstname"
                label = "First Name"
                name = "firstname"
                variant = 'outlined'
                onChange={(e) => setFirstname(
                  e.target.value,
                )}
                value={firstname}
               />
            </div>

            <div className="col md-6">
              <TextField
                margin = "normal"
                size = 'small'
                required
                fullWidth
                id = "lastname"
                label = "Last Name"
                name = "lastname"
                variant='outlined'
                onChange={(e) => setLastname(
                  e.target.value,
              )}
              value={lastname}
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
              label="Email Address"
              name="email"
              autoComplete="email"
              variant='outlined'
              onChange={(e) => setEmail(
                e.target.value,
              )}
              value={email}
            />
            <TextField
              margin="normal"
              size='small'
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant='outlined'
              onChange={(e) => setPassword(
                e.target.value,
              )}
              value={password}
            />
            <TextField
              margin="normal"
              size='small'
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              variant='outlined'
              onChange={(e) => setConfirmPassword(
                e.target.value,
              )}
              value={confirmPassword}
            />

            <Button fullWidth variant="contained" onClick={() => handleSignup()}
              sx={{ 
                mt: 3,
                background: 'black',
                fontWeight: 'bold',
                ":hover": {
                  background: 'purple'
                }
              }}>
              Sign In
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Grid item>
                <span>Already had an account? <Link to='/login' variant="body2">Login here.</Link></span>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <footer className="pb-4 text-center text-black fixed-bottom mt-auto">
            <Typography className="fw-medium">©️Developed by Johnsen Ultra</Typography>
         </footer>
      </Container>
    </ThemeProvider>
  );
}
