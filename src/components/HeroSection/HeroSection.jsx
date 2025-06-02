import { Container, Row, Col } from 'react-bootstrap';
import './HeroSection.css';
import heroImage from '../../assets/img/example.jpg'; // cambialo por tu imagen real

export default function HeroSection() {
  return (
    <section className="hero-section">
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-section">
            <p className="greeting">Hola,</p>
            <h1 className="main-title">Me llamo Paula<br />y soy psicóloga,</h1>
            <p className="subtitle">además de una apasionada de la vida y de las personas.</p>
            <div className="hero-text">
              <p><i>Ser <strong>diferente</strong> no es algo malo.</i></p>
              <p>Es genial ver cómo cada uno es capaz de adaptar el mundo a sus necesidades y no al revés.</p>
              <p>Sin tener que encajar en la cuadratura del círculo. Simplemente reconociéndose, entendiéndose y sintiéndose completamente libre de ser quien es.</p>
              <p>Si cada uno de nosotros mejoramos nuestra autoestima y seguridad en nosotros mismos el mundo funcionará mucho mejor.</p>
              <p>Seremos más empáticos, responsables y desarrollaremos la compasión por el otro y por el mundo que nos rodea.</p>
            </div>
          </Col>
          <Col md={6} className="image-section text-center mt-4 mt-md-0">
            <img src={heroImage} alt="Psicóloga Ana" className="img-fluid rounded" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
