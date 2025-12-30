import { Container, Card, Table } from 'react-bootstrap';

export default function BillingsPage() {
  return (
    <Container className="py-4">
      <Card className="p-4">
        <h3 className="mb-3">Cobros</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Paciente</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="text-center">Sin cobros aún.</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
