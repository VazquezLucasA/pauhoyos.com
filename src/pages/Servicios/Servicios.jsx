// src/pages/Servicios/Servicios.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Servicios.css';

const servicesData = [
  {
    icon: 'bi-book-half',
    title: 'Clases Particulares',
    description: 'Apoyo personalizado en materias de psicología para potenciar tu aprendizaje y aclarar todas tus dudas.',
  },
  {
    icon: 'bi-lightbulb',
    title: 'Análisis de Proyectos',
    description: 'Asesoría experta para tus trabajos académicos, investigaciones y proyectos finales de carrera.',
  },
  {
    icon: 'bi-clipboard2-check',
    title: 'Evaluación y Diagnóstico',
    description: 'Procesos de evaluación psicológica para comprender a fondo diversas situaciones y orientar el camino a seguir.',
  },
  {
    icon: 'bi-chat-left-quote',
    title: 'Terapia Psicoanalítica',
    description: 'Un espacio seguro para la exploración del inconsciente, el autoconocimiento y la resolución de conflictos internos.',
  },
];

const ServiceCard = ({ icon, title, description }) => (
  <Col md={6} lg={4} className="mb-4 d-flex align-items-stretch">
    <Card className="service-card text-center">
      <Card.Body>
        <div className="service-icon mb-3">
          <i className={icon}></i>
        </div>
        <Card.Title as="h4" className="service-title">{title}</Card.Title>
        <Card.Text className="service-description">{description}</Card.Text>
        <Button as={Link} to="/reservar-turno" variant="dark" style={{ backgroundColor: 'var(--jet)', borderColor: 'var(--jet)', color: 'var(--fawn)' }}>
          Consultar
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

export default function Servicios() {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 style={{ color: 'var(--jet)', fontWeight: 'bold' }}>Mis Servicios</h1>
        <p style={{ color: 'var(--battleship-gray)', fontSize: '1.2rem' }}>
          Un acompañamiento profesional y humano para cada etapa de tu camino.
        </p>
      </div>
      <Row>
        {servicesData.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </Row>
    </Container>
  );
}