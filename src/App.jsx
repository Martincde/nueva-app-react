// src/App.js
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Container, Typography, Button,
  Table, TableBody, TableCell, TableHead,
  TableRow, Paper, Box
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import * as XLSX from 'xlsx';
import theme from './theme';
import logo from './assets/logo.png';

function App() {
  const [products, setProducts] = useState([]);
  const [scannedCode, setScannedCode] = useState('');

  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = evt => {
      const data = new Uint8Array(evt.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      setProducts(XLSX.utils.sheet_to_json(sheet));
    };
    reader.readAsArrayBuffer(file);
  };

  const filtered = products.find(p => String(p.codigo) === scannedCode);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
          background: 'linear-gradient(60deg,rgb(212, 246, 41),rgb(213, 6, 6))',
          color: '#fff',
          mb: 3,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo Empresa"
          sx={{
            height: 1500,               // más grande
            mb: 5.5,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
            '&:hover': { transform: 'scale(1.05)' }
          }}
        />

        <Typography
          variant="h3"
          sx={{
            background: 'linear-gradient(45deg,rgb(58, 3, 3), #ff2525)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          Visor de Precios
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>
          Escanea o ingresa el código
        </Typography>
      </Box>

      <Container maxWidth="md">
        {/* … resto igual que antes … */}
      </Container>
    </ThemeProvider>
  );
}

export default App;