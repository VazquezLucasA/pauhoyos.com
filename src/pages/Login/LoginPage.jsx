// src/pages/Login/LoginPage.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.login({ username: email, password });
      navigate('/psikipedia'); // Redirige a la página protegida tras el login
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card style={{ backgroundColor: 'var(--seashell)', border: '1px solid var(--champagne-pink)' }}>
            <Card.Body className="p-4">
              <h2 className="text-center mb-4" style={{ color: 'var(--jet)' }}>Iniciar Sesión</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: 'var(--battleship-gray)' }}>Correo electrónico</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: 'var(--battleship-gray)' }}>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Button variant="dark" type="submit" disabled={loading} className="w-100" style={{ backgroundColor: 'var(--jet)', borderColor: 'var(--jet)' }}>
                  {loading ? 'Ingresando...' : 'Ingresar'}
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <span style={{ color: 'var(--jet)' }}>¿No tienes una cuenta? </span>
                <Link to="/registro" style={{ color: 'var(--fawn)', fontWeight: 'bold' }}>Regístrate aquí</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}