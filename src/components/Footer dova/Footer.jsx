// src/components/Footer/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container fluid="xxl">
        <Row className="py-5">
          {/* Columna de la Marca */}
          <Col lg={4} md={12} className="mb-4 mb-lg-0 footer-col">
            <h5 className="footer-brand">Paula - Psicología</h5>
            <p className="footer-text">
              Un espacio para el autoconocimiento, la reflexión y el crecimiento personal.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="https://linkedin.com" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href="https://facebook.com" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="https://wa.me/5493811234567" aria-label="Whatsapp"><i className="bi bi-whatsapp"></i></a>
            </div>
          </Col>

          {/* Columna de Navegación */}
          <Col lg={2} md={4} xs={6} className="mb-4 mb-lg-0 footer-col">
            <h6 className="footer-title">Navegación</h6>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Inicio</Link></li>
              <li><Link to="/sobre-mi" className="footer-link">Sobre Mí</Link></li>
              <li><Link to="/servicios" className="footer-link">Servicios</Link></li>
              <li><Link to="/contacto" className="footer-link">Contacto</Link></li>
            </ul>
          </Col>

          {/* Columna de Contacto */}
          <Col lg={3} md={4} xs={6} className="mb-4 mb-lg-0 footer-col">
            <h6 className="footer-title">Contacto</h6>
            <ul className="footer-links">
              <li><a href="tel:+5493811234567" className="footer-link">+54 9 381 123-4567</a></li>
              <li><a href="mailto:paula.psicologia@email.com" className="footer-link">paula.psicologia@email.com</a></li>
              <li><span>Tucumán, Argentina</span></li>
            </ul>
          </Col>

          {/* Columna Legal */}
          <Col lg={3} md={4} xs={12} className="footer-col">
            <h6 className="footer-title">Legal</h6>
            <ul className="footer-links">
              <li><Link to="/terminos" className="footer-link">Términos de servicio</Link></li>
              <li><Link to="/privacidad" className="footer-link">Política de privacidad</Link></li>
            </ul>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} Paula Psicología. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}