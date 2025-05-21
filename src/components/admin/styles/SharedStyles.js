import styled from 'styled-components';

export const DashboardCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 24px;
  margin-bottom: 24px;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const PageTitle = styled.h2`
  color: #1a237e;
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.8rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  th {
    background: #f1f5f9;
    padding: 16px;
    text-align: left;
    color: #475569;
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid #e2e8f0;
  }

  td {
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;
    color: #1e293b;
    font-size: 14px;
    vertical-align: middle;
  }

  tbody tr {
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f8fafc;
      transform: translateY(-1px);
    }
  }
`;

export const ActionButton = styled.button`
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

  ${props => {
    switch(props.variant) {
      case 'primary':
        return `
          background: #4f46e5;
          color: white;
          &:hover { background: #4338ca; }
        `;
      case 'success':
        return `
          background: #10b981;
          color: white;
          &:hover { background: #059669; }
        `;
      case 'danger':
        return `
          background: #ef4444;
          color: white;
          &:hover { background: #dc2626; }
        `;
      case 'info':
        return `
          background: #0ea5e9;
          color: white;
          &:hover { background: #0284c7; }
        `;
      default:
        return `
          background: #e5e7eb;
          color: #374151;
          &:hover { background: #d1d5db; }
        `;
    }
  }}
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  ${props => {
    switch(props.status) {
      case 'available':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'unavailable':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      case 'pending':
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      default:
        return `
          background: #e2e8f0;
          color: #475569;
        `;
    }
  }}

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
`;
