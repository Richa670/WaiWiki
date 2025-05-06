import { Box, Typography } from '@mui/material';
import SigninPage from "./signinpage";

const Index = () => {
  // Choose which page to show (either welcome or signin)
  const showSignInPage = true;

  if (showSignInPage) {
    return <SigninPage />;
  }

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        p: 3 // Add some padding
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

export default Index;