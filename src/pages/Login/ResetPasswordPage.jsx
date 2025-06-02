// Pages/Login/ResetPasswordPage.jsx
import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import authService from '../../services/auth.service';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);


  useEffect(() => {
    if (redirecting && message.includes('éxito')) { // Only countdown on success
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            navigate('/login');
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [redirecting, message, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await authService.resetPassword(token, password);
      setMessage(response.data.message || 'Contraseña restablecida con éxito. Serás redirigido al login.');
      setRedirecting(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al restablecer la contraseña. El token puede ser inválido o haber expirado.');
    } finally {
      setLoading(false);
    }
  };

  if (redirecting && message.includes('éxito')) {
     return (
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Alert variant="success" className="text-center">
            <h3>{message}</h3>
            <p>Redireccionando en {countdown} segundos...</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px' }} className="shadow-lg">
        <Card.Body>
          <h3 className="text-center mb-4">Ingresar Nueva Contraseña</h3>
          {message && !redirecting && <Alert variant="info">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Actualizando...' : 'Restablecer Contraseña'}
            </Button>
          </Form>
           <div className="mt-3 text-center">
            <Link to="/login">Volver al Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ResetPasswordPage;