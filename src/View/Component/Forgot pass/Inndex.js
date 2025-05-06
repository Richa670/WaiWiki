import { ThemeProvider } from '@mui/material/styles';
import theme from './Config';
import ForgotPasswordPage from "./Forgotpass";


const Inndex = () => {
  return (
    <ThemeProvider theme={theme}>
    <ForgotPasswordPage />
  </ThemeProvider>

  
  );
};

export default Inndex;