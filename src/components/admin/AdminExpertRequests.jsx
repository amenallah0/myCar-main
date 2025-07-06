import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCheckCircle, FaTimesCircle, FaFileAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const DashboardCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 24px;
  margin-bottom: 24px;
`;

const StyledTable = styled(Table)`
  margin: 0;
  
  th {
    background: #f8f9fa;
    padding: 16px;
    font-weight: 600;
    color: #2c3e50;
    border: none;
    white-space: nowrap;
  }

  td {
    padding: 16px;
    vertical-align: middle;
    border-bottom: 1px solid #eee;
    color: #444;
  }

  tbody tr {
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f8f9fa;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
  }
`;

const StyledBadge = styled(Badge)`
  padding: 8px 16px;
  font-size: 0.85em;
  font-weight: 500;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FileLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #2196f3;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    color: #1976d2;
    transform: translateY(-1px);
  }
`;

const ActionButton = styled(Button)`
  padding: 10px 18px;
  font-size: 0.85em;
  font-weight: 600;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-width: 110px;
  justify-content: center;
  
  &:not(:last-child) {
    margin-right: 10px;
  }

  &.approve-btn {
    background: linear-gradient(135deg, #10b981, #059669);
    border-color: #10b981;
    color: white;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #059669, #047857);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
      border-color: #059669;
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  &.reject-btn {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    border-color: #ef4444;
    color: white;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
      border-color: #dc2626;
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  svg {
    font-size: 1em;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const QuickActionBadge = styled.div`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3); }
    50% { box-shadow: 0 4px 16px rgba(99, 102, 241, 0.5); }
    100% { box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3); }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  color: #1a237e;
  margin: 0;
  font-weight: 600;
  font-size: 1.8rem;
`;

const RequestCount = styled.div`
  background: #e3f2fd;
  color: #1976d2;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '●';
    color: #1976d2;
  }
`;

const StatusBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  
  &.approved {
    background-color: #10b981;
    color: white;
  }
  
  &.pending {
    background-color: #f59e0b;
    color: white;
  }
  
  &.rejected {
    background-color: #ef4444;
    color: white;
  }
`;

const StatusIcon = styled(FaCheckCircle)`
  font-size: 16px;
`;

const AdminExpertRequests = ({ requests, onApprove, onReject }) => {
  const getStatusDetails = (status) => {
    switch (status) {
      case 'APPROVED':
        return { className: 'approved', icon: <StatusIcon /> };
      case 'PENDING':
        return { className: 'pending', icon: '?' };
      case 'REJECTED':
        return { className: 'rejected', icon: '×' };
      default:
        return { className: 'pending', icon: '?' };
    }
  };

  const pendingRequests = requests.filter(req => !req.status || req.status === 'PENDING');

  const handleApprove = async (requestId) => {
    try {
      // Appeler la fonction d'approbation
      await onApprove(requestId);
      
      // La demande sera automatiquement supprimée de la liste car elle sera
      // supprimée de la base de données et la liste sera rafraîchie
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      toast.error('Erreur lors de l\'approbation de la demande');
    }
  };

  return (
    <DashboardCard>
      <HeaderContainer>
        <Title>Demandes d'Expert</Title>
        <RequestCount>
          {pendingRequests.length} demande{pendingRequests.length !== 1 ? 's' : ''} en attente
        </RequestCount>
      </HeaderContainer>

      <StyledTable responsive hover>
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
          {requests.map((request) => {
            const statusDetails = getStatusDetails(request.status);
            return (
              <tr key={request.id}>
                <td>{request.username}</td>
                <td>{request.email}</td>
                <td>{request.specialization}</td>
                <td>{request.experience} ans</td>
                <td>{request.currentPosition}</td>
                <td>
                  <FileLink 
                    href={`http://localhost:8081/api/files/download/${request.diplomaUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FaFileAlt /> Voir le diplôme
                  </FileLink>
                </td>
                <td>
                  <StatusBadge className={statusDetails.className}>
                    {statusDetails.icon}
                  </StatusBadge>
                </td>
                <td>
                  {(!request.status || request.status === 'PENDING') ? (
                    <ActionButtonGroup>
                      <QuickActionBadge>Action requise</QuickActionBadge>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <ActionButton 
                          className="approve-btn"
                          onClick={() => handleApprove(request.id)}
                          title="Approuver cette demande d'expert"
                        >
                          <FaCheckCircle /> Approuver
                        </ActionButton>
                        <ActionButton 
                          className="reject-btn"
                          onClick={() => onReject(request.id)}
                          title="Rejeter cette demande d'expert"
                        >
                          <FaTimesCircle /> Rejeter
                        </ActionButton>
                      </div>
                    </ActionButtonGroup>
                  ) : (
                    <div style={{ 
                      textAlign: 'center', 
                      color: '#6b7280', 
                      fontStyle: 'italic',
                      fontSize: '0.9em'
                    }}>
                      {request.status === 'APPROVED' ? '✅ Approuvée' : '❌ Rejetée'}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </DashboardCard>
  );
};

export default AdminExpertRequests; 