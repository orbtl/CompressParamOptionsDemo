import React from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar
} from '@mui/material';

import DemoTabs from './components/tabs/DemoTabs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ mt: 1 }}>
        <Box>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div">
                Compress Param Options Demo
              </Typography>
            </Toolbar>
          </AppBar>

          <Paper elevation={3} sx={{ p: 2 }}>
            <DemoTabs />
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;