// Pages/NotFoundPage.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container className="text-center py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">¡Ups! Página No Encontrada</h2>
          <p className="lead mb-4">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg">
            Volver al Inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;