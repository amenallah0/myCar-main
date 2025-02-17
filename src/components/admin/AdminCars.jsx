import React, { useMemo } from 'react';
import { FaEdit, FaTrash, FaCarSide, FaPlus } from 'react-icons/fa';
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

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => {
    switch (props.status?.toLowerCase()) {
      case 'available':
        return 'background: #dcfce7; color: #166534;';
      case 'rented':
        return 'background: #fee2e2; color: #991b1b;';
      case 'maintenance':
        return 'background: #fef3c7; color: #92400e;';
      default:
        return 'background: #e2e8f0; color: #475569;';
    }
  }}
`;

const AdminCars = ({ cars = [], onDelete, onEdit }) => {
  const columns = useMemo(() => [
    { key: 'id', label: 'ID' },
    { key: 'make', label: 'Brand' },
    { key: 'model', label: 'Model' },
    { key: 'year', label: 'Year' },
    { key: 'price', label: 'Price' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' }
  ], []);

  return (
    <Container>
      <Header>
        <Title>
          <FaCarSide size={24} />
          Cars Management
        </Title>
        <Button variant="primary" onClick={() => onEdit(null)}>
          <FaPlus />
          Add New Car
        </Button>
      </Header>

      <StyledTable>
        <thead>
          <tr>
            {columns.map(column => (
              <Th key={column.key}>{column.label}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <Tr key={car.id}>
              <Td>{car.id}</Td>
              <Td>{car.make}</Td>
              <Td>{car.model}</Td>
              <Td>{car.year}</Td>
              <Td>${car.price?.toLocaleString()}</Td>
              <Td>
                <StatusBadge status={car.status}>
                  {car.status}
                </StatusBadge>
              </Td>
              <Td>
                <ActionGroup>
                  <Button variant="edit" onClick={() => onEdit(car)}>
                    <FaEdit />
                    Edit
                  </Button>
                  <Button variant="delete" onClick={() => onDelete(car.id)}>
                    <FaTrash />
                    Delete
                  </Button>
                </ActionGroup>
              </Td>
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default React.memo(AdminCars); 