// Pages/Login/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { Form, Button, Alert, Card, Container } from 'react-bootstrap'; // Added Container
import authService from '../../services/auth.service'; // Import the service
import './Login.css';
import imagen from "../../assets/Marca-DOVANET-01.jpg";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '', // Changed from 'usuario' to 'username' to match backend
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = authService.getCurrentUserToken();
    if (token) {
      navigate('/dashboard'); // Or desired page after login
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authService.login(credentials);
      if (data.success && data.token) {
        // The service already stores the token and user data
        navigate('/dashboard'); // Navigate to dashboard or admin panel
      } else {
        setError(data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error de conexión o servidor.';
      setError(errorMessage);
      console.error("Login error:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="login-container d-flex align-items-center justify-content-center">
      <Card className="login-card shadow-lg">
        <Card.Body>
          <div className="text-center mb-4">
            <img src={imagen} alt="Logo DOVA" className="login-logo img-fluid" />
          </div>
          <h2 className="text-center mb-4 login-title">Inicio de Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder='Nombre de Usuario'
                type="text"
                name="username" // Name matches state and backend
                required
                value={credentials.username}
                onChange={handleChange}
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                placeholder='Contraseña'
                type="password"
                name="password" // Name matches state
                required
                value={credentials.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 login-button"
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </Button>
            <Button variant='secondary' className='w-100 mt-2 register-button' as={Link} to='/registro'>
              Registrarse
            </Button>
             <div className="mt-3 text-center">
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}