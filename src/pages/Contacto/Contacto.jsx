// src/pages/Contacto/Contacto.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Contacto.css';

export default function Contacto() {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 style={{ color: 'var(--jet)', fontWeight: 'bold' }}>Ponte en Contacto</h1>
        <p style={{ color: 'var(--battleship-gray)', fontSize: '1.2rem' }}>
          Estoy aquí para escucharte. Encuéntrame en las siguientes plataformas o en mi consultorio.
        </p>
      </div>

      <Row>
        {/* Información de Contacto */}
        <Col md={5} className="mb-4">
          <Card className="contact-card h-100">
            <Card.Body>
              <h3 className="contact-card-title">Información</h3>
              <ul className="list-unstyled contact-info">
                <li>
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>Tucumán, Argentina</span>
                </li>
                <li>
                  <i className="bi bi-telephone-fill"></i>
                  <a href="tel:+5493811234567">+54 9 381 123-4567</a>
                </li>
                <li>
                  <i className="bi bi-envelope-fill"></i>
                  <a href="mailto:paula.psicologia@email.com">paula.psicologia@email.com</a>
                </li>
              </ul>
              <h4 className="contact-card-subtitle">Sígueme en Redes</h4>
              <div className="social-links-contacto">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
                <a href="https://wa.me/5493811234567" target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp"></i></a>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Mapa */}
        <Col md={7}>
          <div className="map-responsive">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113926.31481231885!2d-65.29296229342407!3d-26.832993420330386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94223792d6c56903%3A0xf88d5b92b5c56527!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1672532412345!5m2!1ses-419!2sar"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación">
            </iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
}