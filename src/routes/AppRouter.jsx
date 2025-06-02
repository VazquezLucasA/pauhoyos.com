// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import Home from '../pages/Home/Home';
import MainLayout from '../layouts/MainLayout';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import Psikipedia from '../pages/Psikipedia/Psikipedia';
import Servicios from '../pages/Servicios/Servicios';
import Contacto from '../pages/Contacto/Contacto';
import SobreMi from '../pages/SobreMi/SobreMi';
import ReservarTurno from '../pages/ReservarTurno/ReservarTurno';

// ProtectedRoute component
const ProtectedRoute = ({ children, roles }) => {
  const currentUser = authService.getCurrentUserData();
  const token = authService.getCurrentUserToken();

  if (!token || !currentUser) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(currentUser.user_type)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppRouter() {
  return (
    <Router>
      <ScrollToTop /> 
        <Routes>
          {/* Rutas Publicas */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/inicio" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/sobre-mi" element={<MainLayout><SobreMi/></MainLayout>} />
          <Route path="/contacto" element={<MainLayout><Contacto/></MainLayout>} />
          <Route path="/servicios" element={<MainLayout><Servicios/></MainLayout>} />
          <Route path="/reservar-turno" element={<MainLayout><ReservarTurno/></MainLayout>} />
          <Route path="/psikipedia" element={<MainLayout><Psikipedia/></MainLayout>} />
          <Route path="/login" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/registro" element={<MainLayout><Home /></MainLayout>} />


          {/* Not Found section */}
          <Route path="/not-found" element={<MainLayout><NotFoundPage/></MainLayout>} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />


          {/* 
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/sobre-mi" element={<ContactForm />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/terminos" element={<div>Página de Términos y Condiciones</div>} /> 
          <Route path="/privacidad" element={<div>Página de Política de Privacidad</div>} /> 
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
           */}
      

{/* 
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <br /><br /><br /><br /><br />
                <DashboardA/>

              </ProtectedRoute>
            }
          />
          <Route
            path="/usuariosviejos"
            element={
              <ProtectedRoute roles={['admin']}> 
                <br /><br /><br /><br /><br />
                <GestionUsuariosViejos />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/callcenter"
            element={
              <ProtectedRoute roles={['admin','callcenter','preventas']}>
                <CallcenterPage/>
              </ProtectedRoute>
            }
          />


          <Route
            path="/preventas"
            element={
              <ProtectedRoute roles={['admin', 'preventas']}> 
                <br /><br /><br /><br /><br />
                <PreventasKpiDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kpis"
            element={
              <ProtectedRoute roles={['admin']}>
                <Kpis/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/buscadorpreventas"
            element={
              <ProtectedRoute roles={['admin','preventas']}> {
                <PreventasListPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Encuesta"
            element={
              <ProtectedRoute roles={['admin']}>
                <Kpis/>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
    </Router>
  );
}

export default AppRouter;