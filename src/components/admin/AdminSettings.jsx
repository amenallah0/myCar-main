import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AdminSettings = () => {
  return (
    <div>
      <h2 className="mb-4">Admin Settings</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Site Title</Form.Label>
          <Form.Control type="text" placeholder="Enter site title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control type="email" placeholder="Enter contact email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Maintenance Mode</Form.Label>
          <Form.Check type="switch" id="maintenance-mode" label="Enable maintenance mode" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Settings
        </Button>
      </Form>
    </div>
  );
};

export default AdminSettings; 