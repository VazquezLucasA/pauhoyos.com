import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import logo from '../../assets/DOVA-ICON-1024x264.png';
import './Navbar.css';

export default function MainNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUserData());
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => setCurrentUser(authService.getCurrentUserData());
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(undefined);
    setExpanded(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setExpanded(false);
  };

  const displayName = currentUser ? `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() : '';

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      className="custom-navbar fixed-top shadow-sm"
      collapseOnSelect
      onToggle={(isOpen) => setExpanded(isOpen)}
      variant="dark"
    >
      <Container fluid="xxl">
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
          <img
            src={logo}
            className="d-inline-block align-top navbar-logo"
            alt="Dovanet logo"
            loading="lazy"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded((exp) => !exp)} />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" onClick={() => handleNavigation('/')} className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/contacto" onClick={() => handleNavigation('/contacto')} className="nav-link-custom">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/servicios" onClick={() => handleNavigation('/servicios')} className="nav-link-custom">Servicios</Nav.Link>
            <Nav.Link as={Link} to="/psikipedia" onClick={() => handleNavigation('/psikipedia')} className="nav-link-custom">Psikipedia</Nav.Link>
            <Nav.Link as={Link} to="/reservar-turno" onClick={() => handleNavigation('/reservar-turno')} className="nav-link-custom">Reservar</Nav.Link>

            {currentUser ? (
              <>
                <NavDropdown title={displayName || 'Mi cuenta'} id="user-dropdown" align="end">
                  <NavDropdown.Item as={Link} to="/dashboard" onClick={() => handleNavigation('/dashboard')}>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/portal/account" onClick={() => handleNavigation('/portal/account')}>
                    Mi cuenta
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/portal/appointments" onClick={() => handleNavigation('/portal/appointments')}>
                    Mis turnos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown>
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  className="ms-lg-2 navbar-cta"
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  as={Link}
                  to="/login"
                  onClick={() => handleNavigation('/login')}
                  className="ms-lg-3 navbar-cta"
                >
                  Ingresar
                </Button>
                <Button
                  variant="light"
                  as={Link}
                  to="/registro"
                  onClick={() => handleNavigation('/registro')}
                  className="ms-lg-2 navbar-cta"
                >
                  Crear cuenta
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
