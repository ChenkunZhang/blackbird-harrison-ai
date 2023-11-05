import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';


export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Add validation code here
    var validator = require("email-validator");

    // Validation for email
    if (!validator.validate(email)){
      setEmailError("Email not valid");
      return false;
    }
    // Minimum of 8 characters
    if (password.length < 8){
      setPasswordError("Minimum of 8 characters");
      return false;
    }
    // Should contains both uppercase and lowercase letter
    if (!/[A-Z]/.test(password)|| !/[a-z]/.test(password)){
      setPasswordError("Should contains both uppercase and lowercase letter");
      return false;
    }
    // Minimum of 1 numerical digit (0-9)
    if (!/\d/.test(password)){
      setPasswordError("Minimum of 1 numerical digit (0-9)");
      return false;
    }
    // Minimum of 1 special character
    if (!/[!@#$%^&*]/.test(password)){
      setPasswordError("Minimum of 1 special character");
      return false;
    }
    
    // Return null if the  password is valid
    setShowAlert("Form Valid")
    return true; 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if(validateForm(event)){
      setShowAlert("Login Successful");
    }
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={emailError}
              error={Boolean(emailError)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={passwordError}
              error={Boolean(passwordError)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              aria-label="sign in"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
