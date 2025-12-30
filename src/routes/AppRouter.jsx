// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import MainLayout from '../layouts/MainLayout';
import authService from '../services/auth.service';

// Páginas públicas
import Home from '../pages/Home/Home';
import SobreMi from '../pages/SobreMi/SobreMi';
import Servicios from '../pages/Servicios/Servicios';
import Contacto from '../pages/Contacto/Contacto';
//import ReservarTurno from '../pages/ReservarTurno/ReservarTurno';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

// Auth
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import ForgotPasswordPage from '../pages/Login/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Login/ResetPasswordPage';
import ConfirmEmailPage from '../pages/Login/ConfirmEmailPage';

// Protegidas
import Psikipedia from '../pages/Psikipedia/Psikipedia';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import ReservarTurno from '../pages/ReservarTurno/ReservarTurno';
import AccountPage from '../pages/Account/AccountPage';
import MyAppointmentsPage from '../pages/Account/MyAppointmentsPage';
import MyPaymentsPage from '../pages/Account/MyPaymentsPage';
import PsychologistAppointmentsPage from '../pages/Psychologist/PsychologistAppointmentsPage';
import ClinicalNotesPage from '../pages/Psychologist/ClinicalNotesPage';
import BillingsPage from '../pages/Psychologist/BillingsPage';
import AdminOverviewPage from '../pages/Admin/AdminOverviewPage';

import { useAuth } from '../context/AuthContext';
import { Spinner, Container } from 'react-bootstrap';

const ProtectedRoute = ({ children, roles }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && roles.length > 0) {
    const userRole = user.role?.toLowerCase();
    // Normalizar roles requeridos a minúsculas para comparar
    const requiredRoles = roles.map(r => r.toLowerCase());

    // Mapear 'client' a 'user' si es necesario, o asegurar que las rutas usen 'user'
    // El backend usa 'user', 'psychologist', 'admin'.
    // En las rutas actuales veo 'CLIENT', 'ADMIN', 'PSYCHOLOGIST'.
    // Asumiremos que 'CLIENT' equivale a 'user'.
    const hasPermission = requiredRoles.some(role => {
      if (role === 'client') return userRole === 'user';
      return role === userRole;
    });

    if (!hasPermission) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/sobre-mi" element={<MainLayout><SobreMi /></MainLayout>} />
        <Route path="/contacto" element={<MainLayout><Contacto /></MainLayout>} />
        <Route path="/servicios" element={<MainLayout><Servicios /></MainLayout>} />

        {/* Auth */}
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/registro" element={<MainLayout><RegisterPage /></MainLayout>} />
        <Route path="/forgot-password" element={<MainLayout><ForgotPasswordPage /></MainLayout>} />
        <Route path="/reset-password" element={<MainLayout><ResetPasswordPage /></MainLayout>} />
        <Route path="/confirm-email" element={<MainLayout><ConfirmEmailPage /></MainLayout>} />
        <Route path="/psiki" element={<Navigate to="/psikipedia" replace />} />

        {/* Protegidas */}
        <Route
          path="/psikipedia"
          element={
            <ProtectedRoute roles={['CLIENT', 'ADMIN', 'PSYCHOLOGIST']}>
              <MainLayout><Psikipedia /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservar-turno"
          element={
            <ProtectedRoute roles={['CLIENT', 'ADMIN', 'PSYCHOLOGIST']}>
              <MainLayout><ReservarTurno /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={['CLIENT', 'ADMIN', 'PSYCHOLOGIST']}>
              <MainLayout><DashboardPage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/account"
          element={
            <ProtectedRoute roles={['CLIENT', 'ADMIN', 'PSYCHOLOGIST']}>
              <MainLayout><AccountPage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/appointments"
          element={
            <ProtectedRoute roles={['CLIENT', 'ADMIN', 'PSYCHOLOGIST']}>
              <MainLayout><MyAppointmentsPage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/payments"
          element={
            <ProtectedRoute roles={['CLIENT', 'ADMIN', 'PSYCHOLOGIST']}>
              <MainLayout><MyPaymentsPage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/psychologist/appointments"
          element={
            <ProtectedRoute roles={['PSYCHOLOGIST', 'ADMIN']}>
              <MainLayout><PsychologistAppointmentsPage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/psychologist/notes"
          element={
            <ProtectedRoute roles={['PSYCHOLOGIST', 'ADMIN']}>
              <MainLayout><ClinicalNotesPage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/psychologist/billings"
          element={
            <ProtectedRoute roles={['PSYCHOLOGIST', 'ADMIN']}>
              <MainLayout><BillingsPage /></MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal/admin"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <MainLayout><AdminOverviewPage /></MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Not Found */}
        <Route path="/not-found" element={<MainLayout><NotFoundPage /></MainLayout>} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
}
