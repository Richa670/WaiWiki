import React from "react";
import { Box } from "@mui/material";
import Logo from "./Logo";
import SigninForm from "./signinform";

const SigninPage = () => {
  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh",
      flexDirection: { xs: "column", lg: "row" }
    }}>
      {/* Left side - Form */}
      <Box sx={{
        width: { xs: "100%", lg: "50%" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        backgroundColor: 'background.paper' // Better for theme consistency
      }}>
        <Box sx={{ 
          maxWidth: "md", 
          width: "100%",
          maxWidth: 500
        }}>
          <Logo />
          <SigninForm />
        </Box>
      </Box>

     

      {/* Right side - Background */}
      <Box sx={{
        display: { xs: "none", lg: "block" },
        width: "50%",
        bgcolor: "#7ECFB3",
        position: 'relative' // For potential overlay content
      }} />
    </Box>

    
  );
};

export default SigninPage;