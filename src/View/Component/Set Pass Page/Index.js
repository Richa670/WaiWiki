import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink } from 'react-router-dom';
// import PlannerLogo from '../../Universal/Logo';



const SetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleVisibility = (type) => {
    if (type === 'password') setShowPassword(!showPassword);
    else setShowConfirm(!showConfirm);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      
      {/* Left Section */}
      <Box
        sx={{
          width: { xs: '100%', md: '35%' },
          bgcolor: 'white',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Logo */}
        <Box mb={4} display="flex" alignItems="center" gap={1.5}>
        {/* < PlannerLogo /> */}
          <Typography variant="h4" fontWeight="bold">
            <Box component="span" color="#2A2A48">[[]]Wai</Box>
            <Box component="span" color="#7ECFB3">Wiki</Box>
          </Typography>
        </Box>

        {/* Heading */}
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Set Password
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Better to be safe — use at least 8 characters.
        </Typography>

        {/* Password Fields */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => toggleVisibility('password')}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Confirm password"
          type={showConfirm ? 'text' : 'password'}
          variant="standard"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => toggleVisibility('confirm')}>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5 }}
        >
          Let’s Start Our Journey
        </Button>

        {/* Back to Login */}
        <Button
        component={NavLink}
          to="/otp"
          startIcon={<ArrowBackIcon />}
          sx={{
            mt: 2,
            textTransform: 'none',
            color: 'black',
          }}
        >
          Back to log in
        </Button>

        {/* Footer */}
        <Typography variant="caption" display="block" align="center" mt={30}>
          © 2025, Eimple Labs. All Rights Reserved.
        </Typography>
      </Box>

      {/* Right Section */}
      <Box sx={{
            display: { xs: "none", lg: "block" },
            width: "50%",
            bgcolor: "#7ECFB3",
            position: 'relative' // For potential overlay content
          }} />
        </Box>
  );
};

export default SetPassword;