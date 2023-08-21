import React from 'react';
import RealTimeStocks from './components/RealTimeStocks';
import Watchlist from './components/Watchlist';
import { CssBaseline, Container, Typography, createTheme, ThemeProvider } from '@mui/material';

// Define a custom font for the title
const titleFont = "'Montserrat', sans-serif";

// Define a dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    h3: {
      fontFamily: titleFont,
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Real-time Stock Market Dashboard
        </Typography>
        <RealTimeStocks sx={{ marginBottom: '2rem' }} />
        <Watchlist />
      </Container>
    </ThemeProvider>
  );
}

export default App;
