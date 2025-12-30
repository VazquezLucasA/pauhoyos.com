import { Container, Card, ListGroup, Button } from 'react-bootstrap';

export default function MyAppointmentsPage() {
  return (
    <Container className="py-4">
      <Card className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Mis turnos</h3>
          <Button variant="dark">Solicitar nuevo turno</Button>
        </div>
        <ListGroup>
          <ListGroup.Item>No hay turnos cargados todavía.</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}
