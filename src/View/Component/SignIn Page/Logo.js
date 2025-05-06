import React from "react";
import { Typography, Box } from "@mui/material";
// import Vector from "../Image/Vector.png";

const Logo = () => {
  return (
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
  >
   
    {/* <img src={Vector} alt="Logo" /> */}

    <Typography 
      variant="h3" 
      component="div" 
      fontWeight="bold"
      mb={4}
    >
      <Box component="span" color="#2A2A48">[[]]Wai</Box>
      <Box component="span" color="#7ECFB3">Wiki</Box>
    </Typography>
    </Box>
  );
};

export default Logo;