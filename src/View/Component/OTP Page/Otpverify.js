import React, { useState } from 'react';
import { Box, Button, Container, Typography, Link, Paper, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OtpInput from './OtpInput';
import { NavLink } from 'react-router-dom';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (otpValue:string) => {
    setOtp(otpValue);
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} md={6}>
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            <span style={{ color: '#404471' }}>[[]]Wai</span>
            <span style={{ color: '#8BD0BD' }}>Wiki</span>
          </Typography>
          
          <Paper elevation={0}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>OTP Verification</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>We sent a code to <strong>example@example.com</strong></Typography>

            <Box sx={{ mb: 4 }}>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
                style={{ width: '100%', padding: 12, fontSize: 18, textAlign: 'center', border: '1px solid #ccc', borderRadius: 4 }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <OtpInput length={4} onChange={handleChange} />
            </Box>


            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Didn't receive the email?{' '}
              <Link href="#" onClick={(e) => e.preventDefault()} sx={{ color: 'primary.main', fontWeight: 500 }}>
                Click to Resend
              </Link>
            </Typography>

            <Button fullWidth variant="contained" size="large" sx={{ mb: 3, bgcolor: '#1A237E', '&:hover': { bgcolor: '#0D1359' } }}>
              Continue
            </Button>

            <Button
        component={NavLink}
          to="/forgot-password"
          startIcon={<ArrowBackIcon />}
          sx={{
            mt: 2,
            textTransform: 'none',
            color: 'black',
          }}
        >
          Back to log in
        </Button>
          </Paper>
        </Container>
      </Grid>
      
      <Grid item md={6} sx={{ 
          display: { xs: 'none', md: 'block' },
          backgroundColor: '#8BD0BD'
        }} />
     
    </Grid>
  );
};

export default OtpVerification;