import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login() {

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
              variant='filled'
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
              variant='filled'
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
