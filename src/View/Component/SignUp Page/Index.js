import React from "react";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, InputAdornment, IconButton }
 from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PlannerLogo from "../../Universal/Logo";


const SignUp = () => {
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
                    <PlannerLogo />

                    <Typography variant="h4" fontWeight="bold">
                        <span style={{ color: "#333" }}>WAI</span>
                        <span style={{ color: "#a3c13b" }}>WIKI</span>
                    </Typography>
                </Box>

                {/* Title */}
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={3}>
                    Stap into succes
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
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: "#2d3523",
                        '&:hover': { backgroundColor: "#1f2518" },
                        py: 1.5
                    }}
                >
                    Login now
                </Button>

                {/* Footer */}
                <Typography variant="caption" align="center" mt={40}>
                    © 2025, Jankoti. All Rights Reserved.
                </Typography>
            </Box>

            {/* Right section */}
            <Box flexGrow={1} bgcolor="#eff0e4" />
        </Box>
    );
}
export default SignUp;