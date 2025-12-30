import { Container, Card, Form, Button } from 'react-bootstrap';

export default function ClinicalNotesPage() {
  return (
    <Container className="py-4">
      <Card className="p-4">
        <h3 className="mb-3">Historia clínica</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Paciente / turno</Form.Label>
            <Form.Control placeholder="Selecciona un turno" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notas</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Describe la consulta..." />
          </Form.Group>
          <Button variant="dark">Guardar nota</Button>
        </Form>
      </Card>
    </Container>
  );
}
