import React from "react";
import { Box, Button, TextField, Typography, InputAdornment, IconButton }
 from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink,useNavigate } from 'react-router-dom';
// import PlannerLogo from "../../Universal/Logo";


const SignUp = () => {
    const navigate = useNavigate(); // Hook to navigate

    const handleLoginClick = () => {
      // You can add validation here
      navigate('/setpass'); 
    };

    return (
        <Box
            display="flex"
            minHeight="100vh"
        >
            {/* Left section */}
            <Box
                width="400px"
                p={5}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                boxShadow={2}
                bgcolor="#fff"
            >
                {/* Logo */}
                <Box
                    mb={4}
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                >
                    {/* <PlannerLogo /> */}

                    <Typography variant="h4" fontWeight="bold">
                       <Box component="span" color="#2A2A48">[[]]Wai</Box>
                       <Box component="span" color="#7ECFB3">Wiki</Box>
                    </Typography>
                </Box>

                {/* Title */}
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={3}>
                    Step into succes
                </Typography>

                {/* Email field */}
                <TextField
                    label="Email address"
                    placeholder="Enter your mail id"
                    margin="normal"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                    <EmailIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                {/* Login Button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                   onClick={handleLoginClick}
                >
                    Login now
                </Button>

                 {/* Back Link */}
                      <Button
                        component={NavLink}
                          to="/set-pass"
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
                <Typography variant="caption" align="center" mt={40}>
                    © 2025, Eimple. All Rights Reserved.
                </Typography>
            </Box>

            {/* Right section */}
            <Box flexGrow={1} bgcolor="#7ECFB3" />
        </Box>
    );
}
export default SignUp;