import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './SideBar';

const Author = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'grey.100'
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3 // Default padding
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Author;