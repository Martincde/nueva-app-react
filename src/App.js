// src/App.js
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Container, Typography, Button,
  Box, Fade, Grid,
  Card, CardContent, CardActions,
  IconButton
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
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
      {/* HEADER */}
      <Box
        sx={{
          textAlign: 'center', py: 2,
          background: 'linear-gradient(60deg,rgb(210, 159, 6),hsl(0, 88.80%, 45.70%))',
          color: '#fff', mb: 1
        }}
      >
        <Box
          component="img" src={logo} alt="Logo Empresa"
          sx={{
            height: 350, mb: 3,
            filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.3))',
            '&:hover': { transform: 'scale(0.50)' }
          }}
        />

        <Typography
          variant="h3"
          sx={{
            background: 'linear-gradient(45deg, #ffe53b, #ff2525)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          Visor de Precios
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>
          Escanea o ingresa el código
        </Typography>
      </Box>

      <Container maxWidth="md">
        {/* UPLOAD + SCAN */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant="contained" component="label" color="secondary"
            startIcon={<UploadFileIcon />}
          >
            Cargar Excel
            <input hidden type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
          </Button>
          <input
            type="text" placeholder="Escanear código"
            value={scannedCode}
            onChange={e => setScannedCode(e.target.value)}
            style={{
              flex: 1, padding: '12px', borderRadius: '8px',
              border: `2px solid ${theme.palette.primary.main}`
            }}
          />
        </Box>

        {/* RESULTADO ESCANEO */}
        {scannedCode && (
          filtered ? (
            <Fade in timeout={400}>
              <Card sx={{ mb: 4, p: 2, backgroundColor: theme.palette.background.paper }}>
                <CardContent>
                  <Typography variant="h5" color="primary">{filtered.nombre}</Typography>
                  <Typography variant="body1" gutterBottom>{filtered.descripcion}</Typography>
                  <Typography variant="h6" color="success">
                    ${filtered.precio}
                  </Typography>
                </CardContent>
                <CardActions>
                  {filtered.stock > 0
                    ? <CheckCircleIcon color="success" />
                    : <ErrorIcon color="error" />
                  }
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {filtered.stock != null
                      ? `${filtered.stock} unidad${filtered.stock !== 1 ? 'es' : ''} en stock`
                      : 'Stock desconocido'}
                  </Typography>
                </CardActions>
              </Card>
            </Fade>
          ) : (
            <Typography color="error" sx={{ mb: 4 }}>Producto no encontrado</Typography>
          )
        )}

        {/* GRID DE PRODUCTOS */}
        <Typography variant="h6" gutterBottom>Productos</Typography>
        <Grid container spacing={2}>
          {products.map((p, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Fade in timeout={500 + i * 100}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {p.categoria === 'oferta'
                        ? <LocalOfferIcon color="secondary" sx={{ mr: 1 }} />
                        : <CategoryIcon color="info" sx={{ mr: 1 }} />
                      }
                      <Typography variant="h6">{p.nombre}</Typography>
                    </Box>
                    <Typography variant="body2" gutterBottom>{p.descripcion}</Typography>
                    <Typography variant="subtitle1" color="primary">
                      ${p.precio}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="info">Ver</Button>
                    <Button size="small" color="success">Comprar</Button>
                  </CardActions>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FOOTER CON WAVE + MINI-LOGO */}
      <Box component="footer" sx={{ position: 'relative', mt: 6 }}>
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          sx={{
            position: 'absolute', top: '-1px', left: 0,
            width: '100%', height: 80
          }}
        >
          <path
            fill={theme.palette.background.default}
            d="M0,96L48,117.3C96,139,192,181,288,202.7C384,224,480,224,576,218.7C672,213,768,203,864,192C960,181,1056,171,1152,165.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            pt: 6, pb: 4, textAlign: 'center'
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Mini logo"
            sx={{ height: 50, mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} MarSoft. Todos los derechos reservados.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;