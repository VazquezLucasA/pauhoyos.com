// src/pages/Register/RegisterPage.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    email: '',
    phone: '',
    password: '',
  });
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
      setSuccess(response.message || 'Registro exitoso. Revisa tu email para confirmarlo.');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el registro. Revisa los datos o si el correo ya está en uso.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ backgroundColor: 'var(--seashell)', border: '1px solid var(--champagne-pink)' }}>
            <Card.Body className="p-4">
              <h2 className="text-center mb-4" style={{ color: 'var(--jet)' }}>Crear Cuenta</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label style={{ color: 'var(--battleship-gray)' }}>Nombre Completo</Form.Label>
                  <Form.Control type="text" name="fullName" placeholder="Ingresa tu nombre completo" onChange={handleChange} required />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formDni">
                      <Form.Label style={{ color: 'var(--battleship-gray)' }}>DNI (Opcional)</Form.Label>
                      <Form.Control type="text" name="dni" placeholder="Tu DNI" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formPhone">
                      <Form.Label style={{ color: 'var(--battleship-gray)' }}>Celular (Opcional)</Form.Label>
                      <Form.Control type="text" name="phone" placeholder="Ej: +54..." onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label style={{ color: 'var(--battleship-gray)' }}>Correo electrónico</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Ingresa tu email" onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
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
