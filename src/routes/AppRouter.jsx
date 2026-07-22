import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Invitation from '../pages/Invitation/Invitation';
import ProfessionalSite from '../pages/ProfessionalSite';
import CourseDetailPage from '../pages/Psikipedia/CourseDetailPage';
import Psikipedia from '../pages/Psikipedia/Psikipedia';

function ProfessionalShell() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<ProfessionalShell />}>
        <Route path="/" element={<ProfessionalSite />} />
        <Route path="/psikipedia" element={<Psikipedia />} />
        <Route path="/psikipedia/:slug" element={<CourseDetailPage />} />
        <Route path="/servicios" element={<Navigate to="/#servicios" replace />} />
        <Route path="/sobre-mi" element={<Navigate to="/#sobre-mi" replace />} />
        <Route path="/contacto" element={<Navigate to="/#contacto" replace />} />
        <Route path="/reservar-turno" element={<Navigate to="/#contacto" replace />} />
      </Route>
      <Route path="/mis-15+10" element={<Invitation />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
