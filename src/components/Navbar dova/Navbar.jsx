// Components/Navbar/Navbar.jsx
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap'; // Added NavDropdown
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service'; // Import the service
import logo from '../../assets/DOVA-ICON-1024x264.png';
import './Navbar.css';

export default function MainNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUserData();
    if (user) {
      setCurrentUser(user);
    }
    // Optional: listen for custom event if user logs in/out on another tab
    // window.addEventListener('storage', () => { ... });
    // return () => window.removeEventListener('storage', ...);
  }, []); // Runs once on mount

  // This effect listens for manual changes to localStorage (e.g. after login/logout)
  // and updates the navbar accordingly.
  useEffect(() => {
    const handleStorageChange = () => {
      const user = authService.getCurrentUserData();
      setCurrentUser(user);
    };
    // Create a custom event that can be dispatched after login/logout
    window.addEventListener('authChange', handleStorageChange);
    return () => {
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);


  const handleLogout = () => {
    authService.logout();
    setCurrentUser(undefined);
    setExpanded(false);
    window.dispatchEvent(new Event('authChange')); // Dispatch event
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      className="custom-navbar fixed-top shadow-sm" // Added fixed-top and shadow
      collapseOnSelect
      onToggle={(isOpen) => setExpanded(isOpen)}
      variant="dark" // Or "light" depending on your custom-navbar CSS
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

        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(exp => !exp)} />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center"> {/* align-items-center for vertical alignment */}
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => handleNavigation('/')}
              className='nav-link-custom' // Use a custom class for styling
              activeclassname="active" // Note: activeClassName is for NavLink from react-router-dom, not standard Nav.Link
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/preguntas-frecuentes"
              onClick={() => handleNavigation('/preguntas-frecuentes')}
              className='nav-link-custom'
            >
              Preguntas Frecuentes
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/contacto"
              onClick={() => handleNavigation('/contacto')}
              className='nav-link-custom'
            >
              Contacto
            </Nav.Link>

            {currentUser ? (
              <NavDropdown title={currentUser.fullname || currentUser.username} id="user-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/dashboard" onClick={() => handleNavigation('/dashboard')}>
                  Dashboard
                </NavDropdown.Item>
                
                {['admin', 'admin'].includes(currentUser.user_type) && (
                  <NavDropdown.Item
                  as={Link}
                  to="/usuariosviejos"
                  onClick={() => handleNavigation('/usuariosviejos')}>
                    Gestion Usuarios Viejos
                    </NavDropdown.Item>
                  )}

                 {['admin', 'preventas'].includes(currentUser.user_type) && (
                  <NavDropdown.Item
                  as={Link}
                  to="/preventas"
                  onClick={() => handleNavigation('/preventas')}>
                    Preventas
                    </NavDropdown.Item>
                  )}

                 {['admin', 'preventas'].includes(currentUser.user_type) && (
                  <NavDropdown.Item
                  as={Link}
                  to="/buscadorpreventas"
                  onClick={() => handleNavigation('/preventas')}>
                    Buscador preventas
                    </NavDropdown.Item>
                  )}

                  {['admin', 'callcenter'].includes(currentUser.user_type) && (
                  <NavDropdown.Item
                  as={Link}
                  to="/kpis"
                  onClick={() => handleNavigation('/kpis')}>
                    kpis
                    </NavDropdown.Item>
                  )}

                  {['admin', 'callcenter'].includes(currentUser.user_type) && (
                  <NavDropdown.Item
                  as={Link}
                  to="/callcenter"
                  onClick={() => handleNavigation('/callcenter')}>
                    Callcenter
                    </NavDropdown.Item>
                  )}
                  
                  {['admin', 'callcenter'].includes(currentUser.user_type) && (
                  <NavDropdown.Item
                  href='https://lookerstudio.google.com/reporting/0ddc0fb6-c98c-44c3-8a3b-04a275f79732'
                  target='_blank'>
                    Encuesta
                    </NavDropdown.Item>
                  )}

                  
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                variant="outline-light" // Or your custom CTA style
                as={Link}
                to="/login"
                onClick={() => handleNavigation('/login')}
                className="ms-lg-3 navbar-cta"
              >
                Ingresar
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}