import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';
import Logo from '../../assets/img/pph logo.png';

export default function CustomNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg fixed-top" style={{ backgroundColor: 'var(--fawn)' }}>
      <Container fluid="xxl">
        <Navbar.Brand as={Link} to="/" style={{ color: 'var(--jet)', fontWeight: 'bold' }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: '50px' }}
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
          <Nav className="align-items-center" style={{ gap: '1rem' }}>
            {user ? (
              <NavDropdown title={user.full_name || user.email} id="user-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/dashboard">Mi Panel</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login" style={{ color: 'var(--jet)', fontWeight: 'bold' }}>
                Ingresar
              </Nav.Link>
            )}
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
