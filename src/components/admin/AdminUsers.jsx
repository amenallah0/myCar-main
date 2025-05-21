import React from 'react';
import { FaEdit, FaTrash, FaUserPlus, FaUsers } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  color: #1a237e;
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  background: #f1f5f9;
  padding: 16px;
  text-align: left;
  color: #475569;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 2px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  color: #1e293b;
  font-size: 14px;
`;

const Tr = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8fafc;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  ${props => props.variant === 'primary' && `
    background: #4f46e5;
    color: white;
    &:hover {
      background: #4338ca;
    }
  `}

  ${props => props.variant === 'edit' && `
    background: #0ea5e9;
    color: white;
    &:hover {
      background: #0284c7;
    }
  `}

  ${props => props.variant === 'delete' && `
    background: #ef4444;
    color: white;
    &:hover {
      background: #dc2626;
    }
  `}
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const RoleBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => {
    switch (props.role?.toUpperCase()) {
      case 'ADMIN':
        return 'background: #fee2e2; color: #991b1b;';
      case 'USER':
        return 'background: #dbeafe; color: #1e40af;';
      default:
        return 'background: #e2e8f0; color: #475569;';
    }
  }}
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #991b1b;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  background: white;
  border-radius: 12px;
  
  h4 {
    color: #1e293b;
    margin-bottom: 8px;
  }
  
  p {
    color: #64748b;
  }
`;

const AdminUsers = ({ users = [], onDelete, onEdit, onCreate, loading, error }) => {
  if (loading) {
    return (
      <LoadingSpinner>
        <div className="spinner"></div>
      </LoadingSpinner>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        Error loading users: {error}
      </ErrorMessage>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaUsers size={24} />
          Users Management
        </Title>
      </Header>

      {users.length === 0 ? (
        <EmptyState>
          <h4>No users found</h4>
          <p>Start by adding a new user</p>
        </EmptyState>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <RoleBadge role={user.role}>
                    {user.role}
                  </RoleBadge>
                </Td>
                <Td>
                  <ActionGroup>
                    <Button variant="edit" onClick={() => onEdit(user)}>
                      <FaEdit />
                      Edit
                    </Button>
                    <Button variant="delete" onClick={() => onDelete(user.id)}>
                      <FaTrash />
                      Delete
                    </Button>
                  </ActionGroup>
                </Td>
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </Container>
  );
};

export default React.memo(AdminUsers); 