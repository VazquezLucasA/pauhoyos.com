// src/pages/SobreMi/SobreMi.jsx
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import profileImage from '../../assets/img/example.jpg'; // Reemplaza con tu foto
import './SobreMi.css';

export default function SobreMi() {
  return (
    <div className="sobre-mi-page">
      <Container className="py-5">
        <Row className="align-items-center">
          <Col lg={5} className="text-center mb-4 mb-lg-0">
            <Image src={profileImage} roundedCircle fluid className="profile-image" />
          </Col>
          <Col lg={7}>
            <h1 className="sobre-mi-title">Un poco sobre mí...</h1>
            <p className="sobre-mi-text">
              ¡Hola! Soy Paula. Desde siempre, he sentido una profunda curiosidad por la mente humana y las complejas formas en que nos relacionamos. Esta pasión me llevó a estudiar psicología, un viaje que me ha permitido no solo adquirir conocimientos, sino también crecer como persona.
            </p>
            <p className="sobre-mi-text">
              Creo firmemente que el autoconocimiento es la herramienta más poderosa que poseemos. Mi objetivo es acompañarte en tu propio proceso de descubrimiento, brindándote un espacio de escucha y confianza donde puedas ser tú mismo, sin juicios.
            </p>
          </Col>
        </Row>
        
        {/* Sección de video (opcional) */}
        <Row className="my-5 justify-content-center">
          <Col md={10} lg={8}>
            <div className="video-responsive">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // URL de ejemplo, cámbiala
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </Col>
        </Row>

        <Row className="text-center mt-5">
          <Col>
            <blockquote className="motivational-quote">
              "La vida no examinada no vale la pena ser vivida."
              <footer>— Sócrates</footer>
            </blockquote>
            <div className="social-links-sobre-mi mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}