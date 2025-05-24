import React, { useState, useEffect } from 'react';
import { Box,
  Button,
  Typography, 
  Link,
  Paper,
  Alert,
  CircularProgress
 } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OtpInput from './OtpInput';
import {  NavLink, useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp, sendOtp } from '../authService'; //  API service


const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);


  
  const handleChange = (value: string) => {
    setOtp(value);
    setError('');
  };


   // Handle OTP verification
  const handleVerify = async (e) => {
    e.preventDefault();
    console.log('Reset requested for:', otp); 

    if (!otp || otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      navigate('/set-pass'); 
      return;
    }
  }

  // Handle OTP resend
  const handleResend = async () => {
    try {
      await sendOtp(email);
      setCountdown(30);
      setResendDisabled(true);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0 && resendDisabled) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);
 

  return (
  <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
            <Box component="span" color="#2A2A48">[[]]Wai</Box>
            <Box component="span" color="#7ECFB3">Wiki</Box>
          </Typography>
          
          <Paper elevation={0} component="form" onSubmit={handleVerify} >
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>OTP Verification</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>We sent a code to <strong>example@example.com</strong>
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}


            <Box sx={{ mb: 4 }}>
              <OtpInput length={4} onChange={handleChange} />
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Didn't receive the email?{' '}
              <Link href="#" 
              onClick={(e) => {
                e.preventDefault();
                handleResend();
              }} 
              sx={{ color: 'primary.main', fontWeight: 500, cursor: resendDisabled ? 'not-allowed' : 'pointer' }}>
                 {resendDisabled ? `Click to Resend (${countdown}s)` : 'Click to Resend'}
              </Link>
            </Typography>

            <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
        
      >
            {loading ? <CircularProgress size={24} /> : 'Continue'}
          </Button>

            </Box>

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

             {/* Footer */}
            <Typography variant="caption" align="center" mt={40}>
             © 2025, Eimple Labs. All Rights Reserved.
                   </Typography>
        </Box>
  
  );
};


export default OtpVerification;