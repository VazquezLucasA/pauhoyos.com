import { Container, Card, ListGroup, Form, Row, Col } from 'react-bootstrap';

export default function PsychologistAppointmentsPage() {
  return (
    <Container className="py-4">
      <Card className="p-4">
        <h3 className="mb-3">Agenda de turnos</h3>
        <Form className="mb-3">
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Buscar paciente</Form.Label>
                <Form.Control placeholder="Nombre o DNI" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <ListGroup>
          <ListGroup.Item>No hay turnos cargados para el día.</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}
