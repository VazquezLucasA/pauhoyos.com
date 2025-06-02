// src/Pages/Register/Register.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Alert, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import './Register.css';

const bloodFactors = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    birthdate: '',
    dni: '',
    address: '',
    email_dova: '',
    email_alternative: '',
    phone: '',
    phone_alternative: '',
    phone_corporative: '',
    user_type: 'user',
    blood_factor: '',
    internal_number: '1',
    sucursal_id: 1,
    department_id: 1,
    position_id: 1,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            navigate('/login');
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [successMessage, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'username' || name === 'email_dova') {
      processedValue = value.toLowerCase();
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    if (!formData.blood_factor) {
      setError('Por favor, seleccione un factor sanguíneo.');
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      sucursal_id: 1,
      department_id: 1,
      position_id: 1,
      internal_number: '1'
    };

    // Eliminar campo de confirmación y limpiar valores opcionales
    delete payload.confirmPassword;
    
    ['address', 'email_alternative', 'phone_alternative', 'phone_corporative'].forEach(key => {
      if (payload[key] === '') payload[key] = null;
    });

    try {
      const response = await authService.register(payload);
      setSuccessMessage(response.data.message || '¡Registrado con éxito! Redireccionando al login...');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error en el registro. Por favor intente nuevamente.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (successMessage) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center mt-5" style={{ minHeight: '70vh' }}>
        <Alert variant="success" className="text-center shadow-sm">
          <Alert.Heading as="h2">{successMessage}</Alert.Heading>
          <hr />
          <p className="mb-0">Serás redirigido en {countdown} segundos...</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="register-container py-4 py-md-5">
      <Card className="register-card shadow-lg mx-auto" style={{ maxWidth: '800px' }}>
        <Card.Header as="h3" className="text-center form-header p-3">
          Registro de Nuevo Usuario
        </Card.Header>
        <Card.Body className="p-4 p-md-5">
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible className="error-message mb-4">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Sección Datos Personales */}
            <fieldset className="form-section mb-4 p-3 border rounded">
              <legend className="form-section-title h5">Datos Personales</legend>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formFullname">
                    <Form.Label>Nombre Completo *</Form.Label>
                    <Form.Control 
                      name="fullname" 
                      value={formData.fullname} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Nombre de Usuario *</Form.Label>
                    <Form.Control 
                      name="username" 
                      value={formData.username} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña *</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                      placeholder="Mín. 6 caracteres" 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirmar Contraseña *</Form.Label>
                    <Form.Control 
                      type="password" 
                      name="confirmPassword" 
                      value={formData.confirmPassword} 
                      onChange={handleChange} 
                      required 
                      placeholder="Repita la contraseña" 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBirthdate">
                    <Form.Label>Fecha de Nacimiento *</Form.Label>
                    <Form.Control 
                      type="date" 
                      name="birthdate" 
                      value={formData.birthdate} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formDni">
                    <Form.Label>DNI *</Form.Label>
                    <Form.Control 
                      name="dni" 
                      value={formData.dni} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      placeholder="Opcional" 
                    />
                  </Form.Group>
                </Col>
              </Row>
            </fieldset>

            {/* Sección Contacto */}
            <fieldset className="form-section mb-4 p-3 border rounded">
              <legend className="form-section-title h5">Información de Contacto</legend>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formEmailDova">
                    <Form.Label>Email Corporativo *</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email_dova" 
                      value={formData.email_dova} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formEmailAlternative">
                    <Form.Label>Email Alternativo</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email_alternative" 
                      value={formData.email_alternative} 
                      onChange={handleChange} 
                      placeholder="Opcional" 
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Teléfono *</Form.Label>
                    <Form.Control 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formPhoneAlternative">
                    <Form.Label>Teléfono Alternativo</Form.Label>
                    <Form.Control 
                      name="phone_alternative" 
                      value={formData.phone_alternative} 
                      onChange={handleChange} 
                      placeholder="Opcional" 
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formPhoneCorporative">
                    <Form.Label>Teléfono Corporativo</Form.Label>
                    <Form.Control 
                      name="phone_corporative" 
                      value={formData.phone_corporative} 
                      onChange={handleChange} 
                      placeholder="Opcional" 
                    />
                  </Form.Group>
                </Col>
              </Row>
            </fieldset>

            {/* Sección Laboral */}
            <fieldset className="form-section mb-4 p-3 border rounded">
              <legend className="form-section-title h5">Datos Laborales</legend>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formUserType">
                    <Form.Label>Tipo de Usuario *</Form.Label>
                    <Form.Select 
                      name="user_type" 
                      value={formData.user_type} 
                      onChange={handleChange}
                    >
                      <option value="user">Usuario</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBloodFactor">
                    <Form.Label>Factor Sanguíneo *</Form.Label>
                    <Form.Select 
                      name="blood_factor" 
                      value={formData.blood_factor} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Seleccione...</option>
                      {bloodFactors.map(factor => 
                        <option key={factor} value={factor}>{factor}</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </fieldset>

            <div className="text-center mt-4">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg" 
                className="register-submit-button px-5" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Registrando...</span>
                  </>
                ) : 'Registrar Usuario'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;