// src/pages/Register/RegisterPage.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await authService.register(formData);
      setSuccess(response.message || '¡Registro exitoso! Redirigiendo al login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Error en el registro. El correo ya podría estar en uso.');
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
              <h2 className="text-center mb-4" style={{ color: 'var(--jet)' }}>Crear Cuenta</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label style={{ color: 'var(--battleship-gray)' }}>Nombre</Form.Label>
                  <Form.Control type="text" name="name" placeholder="Ingresa tu nombre" onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: 'var(--battleship-gray)' }}>Correo electrónico</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Ingresa tu email" onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: 'var(--battleship-gray)' }}>Contraseña</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                </Form.Group>

                <Button variant="dark" type="submit" disabled={loading} className="w-100" style={{ backgroundColor: 'var(--jet)', borderColor: 'var(--jet)' }}>
                  {loading ? 'Creando cuenta...' : 'Registrarse'}
                </Button>
              </Form>
               <div className="mt-3 text-center">
                <span style={{ color: 'var(--jet)' }}>¿Ya tienes una cuenta? </span>
                <Link to="/login" style={{ color: 'var(--fawn)', fontWeight: 'bold' }}>Inicia sesión</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}