// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00897b',   // tono teal
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffb300',   // ámbar brillante
      contrastText: '#000',
    },
    info: {
      main: '#7e57c2',   // morado suave
      contrastText: '#fff',
    },
    success: {
      main: '#66bb6a',   // verde claro
      contrastText: '#fff',
    },
    background: {
      default: '#f3e5f5', // lila muy suave
      paper: '#fffde7',   // amarillo suave
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: '12px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: 'linear-gradient(45deg, #8e24aa 30%, #ff6e40 90%)',
          color: '#fff',
          fontWeight: 'bold',
        },
        body: {
          fontSize: 14,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;