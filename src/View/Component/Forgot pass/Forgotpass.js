import React from 'react';
import { 
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Link,
  CssBaseline
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LockReset as ResetIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';


const ForgotPasswordPage = () => {
    const [email, setEmail] = React.useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle password reset logic here
      console.log('Reset requested for:', email);
    };
  
  return (
    
      <>
            <CssBaseline />
    <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

                 {/* Heading */}


                  <Box 
                     display="flex" 
                     alignItems="center" 
                     mb={4}
                     sx={{
                       '& img': {
                         height: 40, 
                         marginRight: 2
                       }
                     }}
                   ></Box>
       <Typography 
            variant="h3" 
            component="div" 
            fontWeight="bold"
            mb={4}
          >
            <Box component="span" color="#2A2A48">[[]]Wai</Box>
            <Box component="span" color="#7ECFB3">Wiki</Box>
          </Typography>

              {/* Subheading */}
              <ResetIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography component="h1" variant="h4" gutterBottom>
                Forgot Password
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                Enter your email address and we'll send you a link to reset your password.
              </Typography>
              
              {/* Email Input */}
              <Typography variant="subtitle1" component="label" gutterBottom>
                Email address
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  variant="outlined"
                  size="small"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />



                <Box sx={{ 
                  maxWidth: 400,
                  mx: 'auto',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}>


      {/* Divider
      <Divider sx={{ my: 2 }} /> *

      {/* Send Button */}
       <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                  >
                    Send 
                  </Button>



      {/* Back Link */}
      <Button
        component={NavLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            mt: 2,
            textTransform: 'none',
            color: 'black',
          }}
        >
          Back to log in
        </Button>
    </Box>
    </Box>
    </Box>
    </Container>
    </>
  );
};


export default ForgotPasswordPage;