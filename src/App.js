
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './View/Component/SignIn Page/Index';
import Inndex from './View/Component/Forgot pass/Inndex';
import OTP from './View/Component/OTP Page/Otp';
import SetPassword from './View/Component/Set Pass Page/Index';


function App() {
  return (
    <Router>
      <Routes>                                        
      <Route path="/" element={<Index />} />
      <Route path="/forgot-password" element={<Inndex />} />
      <Route path="/otp" element={<OTP/>} />
      <Route path="/setpass" element={<SetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;















// App.js
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Index from './View/Component/SignIn Page/Index';

// const theme = createTheme();

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Index />
//     </ThemeProvider>
//   );
// }

// export default App;