import React from 'react';
import { Table, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
`;

const AdminExperts = ({ experts, onDelete, onEdit }) => {
  return (
    <div>
      <h2 className="mb-4">Gestion des Experts</h2>
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Spécialité</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experts.map((expert) => (
            <tr key={expert.id}>
              <td>{expert.id}</td>
              <td>{expert.nom}</td>
              <td>{expert.prenom}</td>
              <td>{expert.specialite}</td>
              <td>{expert.email}</td>
              <td>{expert.telephone}</td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => onEdit(expert)}
                >
                  Modifier
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => onDelete(expert.id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default AdminExperts; 