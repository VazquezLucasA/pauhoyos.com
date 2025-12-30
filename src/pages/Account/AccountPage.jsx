import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

export default function AccountPage() {
  return (
    <Container className="py-4">
      <Card className="p-4">
        <h3 className="mb-3">Mi cuenta</h3>
        <p>Puedes actualizar tus datos básicos.</p>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control placeholder="..." />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control placeholder="..." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="..." disabled />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control placeholder="..." />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="dark">Guardar</Button>
        </Form>
      </Card>
    </Container>
  );
}
