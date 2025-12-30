import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Container, Card, Alert, Spinner, Button } from 'react-bootstrap';
import authService from '../../services/auth.service';

export default function ConfirmEmailPage() {
  const { token: tokenParam } = useParams();
  const [searchParams] = useSearchParams();
  const token = tokenParam || searchParams.get('token');
  const [status, setStatus] = useState({ loading: true, error: '', success: '' });

  useEffect(() => {
    const confirm = async () => {
      try {
        const data = await authService.verifyEmail(token);
        setStatus({ loading: false, error: '', success: data.message || 'Email confirmado. Ya puedes iniciar sesión.' });
      } catch (err) {
        setStatus({
          loading: false,
          error: err.response?.data?.error || 'Token inválido o expirado.',
          success: '',
        });
      }
    };
    confirm();
  }, [token]);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px' }} className="shadow-lg">
        <Card.Body className="text-center">
          <h3 className="mb-4">Confirmar correo</h3>
          {status.loading && <Spinner animation="border" role="status" />}
          {status.success && <Alert variant="success">{status.success}</Alert>}
          {status.error && <Alert variant="danger">{status.error}</Alert>}
          {!status.loading && (
            <Button as={Link} to="/login" variant="dark" className="w-100 mt-3">
              Ir al login
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
