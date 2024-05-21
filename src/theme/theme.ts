import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '2rem',
          marginTop: '2rem',
        },
      },
    },
  },
});

export default theme;
