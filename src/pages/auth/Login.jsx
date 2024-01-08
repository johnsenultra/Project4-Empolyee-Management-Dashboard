import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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
          icon: 'error',
          confirmButtonText: 'OK',
        })
      });
    } else {
      Swal.fire({
        toast: 'true',
        text: 'Incorret or missing credentials!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }
  

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
         <Typography className='fw-bold' component="h1" variant="h3">
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
              Sign In
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Grid item>
              <span>Dont have an account? <Link to='/signup' variant="body2">Register here.</Link></span>
              </Grid>
            </Grid>
         </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
