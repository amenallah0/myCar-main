import React from 'react';
import { Table } from 'react-bootstrap';

const AdminSales = () => {
  return (
    <div>
      <h2 className="mb-4">Sales Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Car</th>
            <th>Buyer</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>BMW X5</td>
            <td>John Doe</td>
            <td>$50,000</td>
            <td>2024-03-20</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default AdminSales; 