import { Box, Typography } from '@mui/material';
import Forgotpage from "./Config";

const Inndex = () => { // Fixed typo in component name
  const showForgotpage = true; // Better naming convention

  if (showForgotpage) {
    return <Forgotpage/>; // Using the imported component
  }

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        p: 3
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: 600 }}>
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Welcome to Your Blank App
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Start building your amazing project here!
        </Typography>
      </Box>
    </Box>
  );
};

export default Inndex;