// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import MainLayout from '../layouts/MainLayout';

// Servicios de autenticación
import authService from '../services/authService';

// Páginas Públicas
import Home from '../pages/Home/Home';
import SobreMi from '../pages/SobreMi/SobreMi';
import Servicios from '../pages/Servicios/Servicios';
import Contacto from '../pages/Contacto/Contacto';
import ReservarTurno from '../pages/ReservarTurno/ReservarTurno';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

// Páginas de Autenticación
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';

// Páginas Protegidas
import Psikipedia from '../pages/Psikipedia/Psikipedia';


// Componente de Ruta Protegida
const ProtectedRoute = ({ children, roles }) => {
  const currentUser = authService.getCurrentUserData();
  const token = authService.getCurrentUserToken();

  if (!token || !currentUser) {
    // Si no está logueado, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere roles específicos y el usuario no los tiene
  if (roles && roles.length > 0 && !roles.includes(currentUser.user_type)) {
    // Redirige a una página de "no autorizado" o al inicio
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function AppRouter() {
  return (
    <Router>
      <ScrollToTop /> 
      <Routes>
        {/* Rutas Públicas con Layout Principal */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/sobre-mi" element={<MainLayout><SobreMi /></MainLayout>} />
        <Route path="/contacto" element={<MainLayout><Contacto /></MainLayout>} />
        <Route path="/servicios" element={<MainLayout><Servicios /></MainLayout>} />
        <Route path="/reservar-turno" element={<MainLayout><ReservarTurno /></MainLayout>} />
        <Route path="/psiki" element={<MainLayout><Psikipedia /></MainLayout>} />
        
        {/* Rutas de Autenticación */}
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/registro" element={<MainLayout><RegisterPage /></MainLayout>} />


        {/* Ruta Protegida */}
        <Route 
          path="/psikipedia" 
          element={
            <ProtectedRoute roles={['student', 'admin']}>
              <MainLayout><Psikipedia /></MainLayout>
            </ProtectedRoute>
          } 
        />

        {/* Sección de Not Found */}
        <Route path="/not-found" element={<MainLayout><NotFoundPage /></MainLayout>} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
}