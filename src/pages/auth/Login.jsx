import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../firebaseConfig';
import { useState } from 'react';
import Swal from 'sweetalert2'



const defaultTheme = createTheme();

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const handleLogin = () => {
    if(email !== '' && password !== '') {
      const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/');
        // ...
      })
      .catch((error) => {
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
      Swal.fire({
        toast: 'true',
        title: 'Incomplete',
        text: 'Please fill in all the required fields',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-dark',
        },
      })
    }
  }
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{mt: '50px'}}>
        <CssBaseline />
        <Card
          sx={{
            boxShadow: 10,
            mt: '20px',
            borderRadius: 5,
            p: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          
          <Avatar sx={{ m: 2, bgcolor: '#333333' }}>
            <LoginIcon />
          </Avatar>

          <Typography className='fw-bold' component="h1" variant="h4">
            Login
          </Typography>
          <p>Enter your email and password to login.</p>
         
         {/* Input field */}
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
                e.target.value
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
                e.target.value
              )}
              value={password}
            />
            <Button fullWidth variant="contained" onClick={() => handleLogin()} 
              sx={{ 
                mt: 3,
                background: 'black',
                fontWeight: 'bold',
                ":hover": {
                  background: 'purple'
                }
              }}>
              Login
              <ArrowRightAltIcon/ >
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Grid item>
                <span>Don't have an account? <Link to='/signup' variant="body2">Register here.</Link></span>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <footer className="pb-4 text-center text-black fixed-bottom mt-auto">
          <Typography>©️ 2024 Johnsen Ultra. All rights reserved</Typography>
         </footer>
      </Container>
    </ThemeProvider>
  );
}
