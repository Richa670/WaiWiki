import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import OtpVerification from './Otpverify';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1A237E',
    },
    secondary: {
      main: '#8BD0BD',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

const OTP = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OtpVerification />
    </ThemeProvider>
  );
};

export default OTP;