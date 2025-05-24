import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Typography, 
  Box,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import { Mail, Lock } from "@mui/icons-material";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please fill out all fields");
      return;
    }

    try {
      setIsLoading(true);
      // Handle login logic here
      // await authService.login(email, password, rememberMe);
        navigate('/course');
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom color="2A2A48">
        Sign In
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        into your account
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email address"
          variant="outlined"
          margin="normal"
          placeholder="Enter your mail id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" aria-label="email icon">
                  <Mail color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" aria-label="password icon">
                  <Lock color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />


      
        <Box textAlign="right" mb={2}>
          <Button size="small" color="primary">
          <Link component={RouterLink} to="/forgot-password">
            Forgot Password?
            </Link>
          </Button>
        </Box>
      


        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Box>
              <Typography variant="body2">Remember me</Typography>
              <Typography variant="caption" color="text.secondary">
                Save my login details for next time.
              </Typography>
            </Box>
          }
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ py: 1.5 }}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          <Link component={RouterLink} to="/course"></Link>
          {isLoading ? "Signing in..." : "Login now"}
        </Button>
      </form>

        {/* Footer */}
      <Typography variant="caption" align="center" mt={40}>
      © 2025, Eimple Labs. All Rights Reserved.
     </Typography>


    </Box>
  );
};

export default SigninForm;