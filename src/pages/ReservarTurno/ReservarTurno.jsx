import { Container, Card, Form, Button } from 'react-bootstrap';

export default function ReservarTurno() {
  return (
    <Container className="py-4">
      <Card className="p-4">
        <h3 className="mb-3">Reservar turno</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Horario preferido</Form.Label>
            <Form.Control type="time" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Motivo</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Ej: consulta inicial, seguimiento, etc." />
          </Form.Group>
          <Button variant="dark">Enviar solicitud</Button>
        </Form>
      </Card>
    </Container>
  );
}
