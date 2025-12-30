import { Container, Card, Table } from 'react-bootstrap';

export default function MyPaymentsPage() {
  return (
    <Container className="py-4">
      <Card className="p-4">
        <h3 className="mb-3">Pagos y suscripciones</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Concepto</th>
              <th>Estado</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="text-center">Sin registros aún.</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
