import { Container, Card, Row, Col, ListGroup } from 'react-bootstrap';

export default function AdminOverviewPage() {
  return (
    <Container className="py-4">
      <Card className="p-4">
        <h3 className="mb-3">Panel Admin</h3>
        <Row>
          <Col md={6}>
            <h5>Usuarios</h5>
            <ListGroup>
              <ListGroup.Item>Gestionar roles y accesos.</ListGroup.Item>
              <ListGroup.Item>Revisar sesiones activas.</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <h5>Cursos y pagos</h5>
            <ListGroup>
              <ListGroup.Item>Configurar precios y suscripciones.</ListGroup.Item>
              <ListGroup.Item>Revisar pagos recientes.</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
