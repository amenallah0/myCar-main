import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
`;

const AdminExpertRequests = ({ requests, onApprove, onReject }) => {
  return (
    <div>
      <h2 className="mb-4">Demandes d'Expert en Attente</h2>
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Email</th>
            <th>Spécialisation</th>
            <th>Expérience</th>
            <th>Poste Actuel</th>
            <th>Diplôme</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.username}</td>
              <td>{request.email}</td>
              <td>{request.specialization}</td>
              <td>{request.experience} ans</td>
              <td>{request.currentPosition}</td>
              <td>
                <a 
                  href={`http://localhost:8081/api/files/download/${request.diplomaUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-danger"
                >
                  Voir le diplôme
                </a>
              </td>
              <td>
                <Badge bg={
                  request.status === 'PENDING' ? 'warning' : 
                  request.status === 'APPROVED' ? 'success' : 'danger'
                }>
                  {request.status === 'PENDING' ? 'En attente' : 
                   request.status === 'APPROVED' ? 'Approuvé' : 'Rejeté'}
                </Badge>
              </td>
              <td>
                {request.status === 'PENDING' && (
                  <>
                    <Button 
                      variant="success" 
                      size="sm" 
                      className="me-2"
                      onClick={() => onApprove(request.id)}
                    >
                      APPROUVER
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => onReject(request.id)}
                    >
                      REJETER
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default AdminExpertRequests; 