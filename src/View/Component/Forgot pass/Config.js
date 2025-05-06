import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#283B67', // waiwiki navy
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8FD9BB', // waiwiki mint
      contrastText: '#000000',
    },
    background: {
      default: '#F7F8F9', // waiwiki gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#283B67',
    },
    sidebar: {
      main: '#FFFFFF',
      contrastText: '#283B67',
    },
  },
  shape: {
    borderRadius: 8, // Default border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;