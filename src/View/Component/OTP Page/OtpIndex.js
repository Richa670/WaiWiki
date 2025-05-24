import React from "react";
import { Box, Typography } from "@mui/material";
import OtpVerification from "./Otpverify";

const OtpIndex = () => {
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
        backgroundColor: 'background.paper'
      }}>
        <Box sx={{ 
          width: "100%",
          maxWidth: 500
        }}>
          <OtpVerification />  
        </Box>

     
      </Box>

      {/* Right side - Background */}
      <Box sx={{
        display: { xs: "none", lg: "block" },
        width: "50%",
        bgcolor: "#7ECFB3",
        position: 'relative'
      }} />
    </Box>
  );
};

export default OtpIndex;