import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { DashboardHeader, PageTitle, StatusBadge, StyledCard, StyledTable, ActionButton } from './AdminDashboard';

const AdminExperts = ({ experts, onDelete, onEdit }) => {
  return (
    <div className="experts-section">
      <DashboardHeader>
        <div>
          <PageTitle>Gestion des Experts</PageTitle>
          <p className="text-muted mb-0">Gérez les experts de la plateforme</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <StatusBadge className="success">
            {experts.length} Experts
          </StatusBadge>
        </div>
      </DashboardHeader>

      <StyledCard>
        <Card.Body>
          <div className="table-responsive">
            <StyledTable>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Expert</th>
                  <th>Spécialité</th>
                  <th>Contact</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {experts.map((expert) => (
                  <tr key={expert.id}>
                    <td>
                      <span className="id-badge">#{expert.id}</span>
                    </td>
                    <td>
                      <div className="expert-info">
                        <div className="expert-avatar">
                          {expert.nom ? expert.nom.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div className="expert-details">
                          <div className="expert-name">
                            {expert.nom} {expert.prenom}
                          </div>
                          <div className="expert-email">{expert.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="speciality-badge">
                        {expert.specialite || 'Non spécifié'}
                      </span>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-item">
                          <i className="fas fa-envelope"></i>
                          {expert.email}
                        </div>
                        <div className="contact-item">
                          <i className="fas fa-phone"></i>
                          {expert.telephone || 'Non spécifié'}
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge 
                        className={expert.status === 'ACTIVE' ? 'success' : 'warning'}
                      >
                        {expert.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                      </StatusBadge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <ActionButton
                          className="secondary"
                          onClick={() => onEdit(expert)}
                          title="Modifier"
                        >
                          <i className="fas fa-edit"></i>
                        </ActionButton>
                        <ActionButton
                          className="danger"
                          onClick={() => onDelete(expert.id)}
                          title="Supprimer"
                        >
                          <i className="fas fa-trash"></i>
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </div>
        </Card.Body>
      </StyledCard>

      <style jsx>{`
        .experts-section {
          animation: fadeIn 0.3s ease-in-out;
        }

        .id-badge {
          background: rgba(26, 35, 126, 0.1);
          color: #1a237e;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .expert-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .expert-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .expert-details {
          display: flex;
          flex-direction: column;
        }

        .expert-name {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.25rem;
        }

        .expert-email {
          font-size: 0.875rem;
          color: #6c757d;
        }

        .speciality-badge {
          background: rgba(255, 171, 0, 0.1);
          color: #ffab00;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          display: inline-block;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6c757d;
        }

        .contact-item i {
          color: #1a237e;
          font-size: 0.875rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-buttons button {
          width: 36px;
          height: 36px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminExperts; 