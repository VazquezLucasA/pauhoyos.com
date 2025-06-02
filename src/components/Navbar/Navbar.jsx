import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/img/pph logo.png'; // Adjust the path as necessary

export default function CustomNavbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: 'var(--fawn)' }}>
      <Container fluid="xxl">
        <Navbar.Brand as={Link} to="/" style={{ color: 'var(--jet)', fontWeight: 'bold' }}>
          <img
            src={Logo}  
            alt="Logo"
            style={{ width: '50px'}}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav className="mx-auto" style={{ gap: '1rem' }}>
            <Nav.Link as={Link} to="/" style={{ color: 'var(--jet)' }}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/sobre-mi" style={{ color: 'var(--jet)' }}>Sobre mí</Nav.Link>
            <Nav.Link as={Link} to="/servicios" style={{ color: 'var(--jet)' }}>Servicios</Nav.Link>
            <Nav.Link as={Link} to="/contacto" style={{ color: 'var(--jet)' }}>Contacto</Nav.Link>
            <Nav.Link as={Link} to="/psikipedia" style={{ color: 'var(--jet)' }}>psikipedia</Nav.Link>
          </Nav>
          <Nav>
            <Button
              as={Link}
              to="/reservar-turno"
              variant="dark"
              style={{
                backgroundColor: 'var(--jet)',
                borderColor: 'var(--jet)',
                color: 'var(--fawn)',
                borderRadius: '0.5rem',
              }}
            >
              Reservar turno
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
