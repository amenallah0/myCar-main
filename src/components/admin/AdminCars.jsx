import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrash, FaCarSide, FaSearch, FaFilter } from 'react-icons/fa';
import { DashboardCard, PageHeader, PageTitle, StyledTable, ActionButton, StatusBadge } from './styles/SharedStyles';
import { Form, InputGroup, Button, Pagination } from 'react-bootstrap';

const AdminCars = ({ cars = [], onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'make', direction: 'asc' });
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const itemsPerPage = 10;

  // Filtrage et tri des voitures
  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter(car => {
      const matchesSearch = 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm);
      
      const matchesAvailability = 
        availabilityFilter === 'all' || 
        (availabilityFilter === 'available' && car.available) ||
        (availabilityFilter === 'unavailable' && !car.available);

      return matchesSearch && matchesAvailability;
    });

    // Tri
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [cars, searchTerm, sortConfig, availabilityFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCars.length / itemsPerPage);
  const paginatedCars = filteredAndSortedCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortableHeader = ({ label, sortKey }) => (
    <th 
      onClick={() => handleSort(sortKey)}
      style={{ cursor: 'pointer' }}
    >
      {label}
      {sortConfig.key === sortKey && (
        <span className="ms-1">
          {sortConfig.direction === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </th>
  );

  return (
    <DashboardCard>
      <PageHeader>
        <PageTitle>
          <FaCarSide size={24} />
          Gestion des Voitures
        </PageTitle>
        <div className="d-flex gap-3">
          <InputGroup style={{ width: '300px' }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Rechercher une voiture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Form.Select
            style={{ width: '200px' }}
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="available">Disponibles</option>
            <option value="unavailable">Non disponibles</option>
          </Form.Select>
        </div>
      </PageHeader>

      <div className="table-responsive">
        <StyledTable>
          <thead>
            <tr>
              <th>Image</th>
              <SortableHeader label="Marque/Modèle" sortKey="make" />
              <SortableHeader label="Année" sortKey="year" />
              <SortableHeader label="Prix" sortKey="price" />
              <th>Disponibilité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCars.map((car) => (
              <tr key={car.id}>
                <td>
                  <img
                    src={`http://localhost:8081/api/files/download/${car.images[0]?.filename}`}
                    alt={`${car.make} ${car.model}`}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      transition: 'transform 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </td>
                <td>
                  <div style={{ fontWeight: '500' }}>{car.make} {car.model}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{car.mileage} km</div>
                </td>
                <td>{car.year}</td>
                <td>{car.price?.toLocaleString()} TND</td>
                <td>
                  <StatusBadge status={car.available ? 'available' : 'unavailable'}>
                    {car.available ? 'Disponible' : 'Non disponible'}
                  </StatusBadge>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <ActionButton 
                      variant="info" 
                      onClick={() => onEdit(car)}
                      title="Modifier"
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton 
                      variant="danger" 
                      onClick={() => onDelete(car.id)}
                      title="Supprimer"
                    >
                      <FaTrash />
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
            />
            <Pagination.Prev 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last 
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      <style jsx>{`
        .table-responsive {
          margin-top: 1rem;
          border-radius: 8px;
          overflow: hidden;
        }

        th {
          white-space: nowrap;
          padding: 1rem;
          background: #f8f9fa;
          border-bottom: 2px solid #dee2e6;
        }

        td {
          padding: 1rem;
          vertical-align: middle;
        }

        tr:hover {
          background-color: #f8f9fa;
        }

        .pagination {
          margin: 0;
        }

        .pagination-item {
          cursor: pointer;
        }
      `}</style>
    </DashboardCard>
  );
};

export default React.memo(AdminCars); 