'use-client';

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom'
import {
  Container,
  Box,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { Classes, AddClass } from './pages/Class';
import { Teachers } from './pages/Teacher';
import { AddTeacher } from './pages/Teacher/AddTeacher';
import NavBar from './components/NavBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#135BB4'
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Inter',
    },
  },
})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box sx={{
          backgroundColor: '#F7F7F7',
          minHeight: '100vh',
        }}
        >
          <NavBar />
          <Container maxWidth='false'
            sx={{
              paddingBottom: '1.5rem'
            }}
          >
            <Routes>
              <Route path='/' element={<Navigate to='/class' replace={true} />} />
              <Route path='class' element={<Outlet />} >
                <Route index element={<Classes />} />
                <Route path='add' element={<AddClass />} />
              </Route>
              <Route path='teacher' element={<Outlet />} >
                <Route index element={<Teachers />} />
                <Route path='add' element={<AddTeacher />} />
              </Route>
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
