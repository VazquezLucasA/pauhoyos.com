import { useEffect } from 'react';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ClientDashboard from '../../components/Dashboard/ClientDashboard';
import AdminDashboard from '../../components/Dashboard/AdminDashboard';
import PsychologistDashboard from '../../components/Dashboard/PsychologistDashboard';
import PortalMenu from '../../components/Portal/PortalMenu';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (!user) return null;

  const renderDashboard = () => {
    // Normalizar rol a minúsculas por si acaso, aunque el backend lo manda así
    const role = user.role?.toLowerCase();
    if (role === 'admin') return <AdminDashboard />;
    if (role === 'psychologist') return <PsychologistDashboard />;
    return <ClientDashboard />;
  };

  return (
    <Container className="py-4">
      <Card className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="mb-1">Hola, {user.full_name || user.email}</h2>
            <small>Rol: {user.role || '---'}</small>
          </div>
          <Button variant="outline-dark" onClick={() => navigate('/')}>Volver a inicio</Button>
        </div>
        <PortalMenu role={user.role} />
        {renderDashboard()}
      </Card>
    </Container>
  );
}
