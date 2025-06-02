// Pages/Login/ForgotPasswordPage.jsx
import { useState } from 'react';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from '../../services/auth.service';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.data.message || 'Si el email está registrado, recibirás un enlace para restablecer tu contraseña.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px' }} className="shadow-lg">
        <Card.Body>
          <h3 className="text-center mb-4">Restablecer Contraseña</h3>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Corporativo Registrado</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email dova"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Enlace de Restablecimiento'}
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

export default ForgotPasswordPage;