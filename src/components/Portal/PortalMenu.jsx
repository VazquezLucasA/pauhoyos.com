import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const baseLinks = [
  { to: '/portal/account', label: 'Gestionar mi cuenta' },
  { to: '/portal/appointments', label: 'Mis turnos' },
  { to: '/portal/payments', label: 'Pagos y suscripciones' },
];

const psychologistLinks = [
  { to: '/portal/psychologist/appointments', label: 'Turnos del día' },
  { to: '/portal/psychologist/notes', label: 'Historia clínica' },
  { to: '/portal/psychologist/billings', label: 'Cobros' },
];

const adminLinks = [
  { to: '/portal/admin', label: 'Panel admin' },
];

export default function PortalMenu({ role }) {
  const links = [...baseLinks];
  const r = role?.toLowerCase();
  if (r === 'psychologist' || r === 'admin') links.push(...psychologistLinks);
  if (r === 'admin') links.push(...adminLinks);

  return (
    <Row className="mb-3">
      {links.map((link) => (
        <Col key={link.to} md={4} className="mb-3">
          <Card as={Link} to={link.to} className="p-3 h-100 text-decoration-none shadow-sm">
            <span className="fw-bold">{link.label}</span>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
