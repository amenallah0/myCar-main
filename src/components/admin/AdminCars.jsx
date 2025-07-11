import React, { useState, useMemo, useEffect } from 'react';
import { FaEdit, FaTrash, FaCarSide, FaSearch, FaFilter } from 'react-icons/fa';
import { DashboardCard, PageHeader, PageTitle, StyledTable, ActionButton, StatusBadge } from './styles/SharedStyles';
import { Form, InputGroup, Button, Pagination } from 'react-bootstrap';
import { getImageUrl } from '../../config/apiConfig';

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
        car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year?.toString().includes(searchTerm);
      
      const matchesAvailability = 
        availabilityFilter === 'all' || 
        (availabilityFilter === 'available' && car.available) ||
        (availabilityFilter === 'unavailable' && !car.available);

      return matchesSearch && matchesAvailability;
    });

    // Tri
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        // Gestion des valeurs null/undefined
        if (aVal == null) aVal = '';
        if (bVal == null) bVal = '';
        
        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [cars, searchTerm, sortConfig, availabilityFilter]);

  // Reset à la page 1 quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, availabilityFilter, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCars.length / itemsPerPage);
  const paginatedCars = filteredAndSortedCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Vérifier que la page actuelle est valide
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Génération intelligente des numéros de page
  const getPaginationItems = () => {
    const delta = 2; // Nombre de pages à afficher de chaque côté de la page courante
    const items = [];
    
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      items.push(i);
    }
    
    return items;
  };

  const SortableHeader = ({ label, sortKey }) => (
    <th 
      onClick={() => handleSort(sortKey)}
      style={{ cursor: 'pointer', userSelect: 'none' }}
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
          Gestion des Voitures ({filteredAndSortedCars.length} voiture{filteredAndSortedCars.length !== 1 ? 's' : ''})
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset explicite à la page 1
              }}
            />
          </InputGroup>
          <Form.Select
            style={{ width: '200px' }}
            value={availabilityFilter}
            onChange={(e) => {
              setAvailabilityFilter(e.target.value);
              setCurrentPage(1); // Reset explicite à la page 1
            }}
          >
            <option value="all">Tous les statuts</option>
            <option value="available">Disponibles</option>
            <option value="unavailable">Non disponibles</option>
          </Form.Select>
        </div>
      </PageHeader>

      {filteredAndSortedCars.length === 0 ? (
        <div className="text-center py-5">
          <FaCarSide size={48} className="text-muted mb-3" />
          <h5 className="text-muted">Aucune voiture trouvée</h5>
          <p className="text-muted">Essayez de modifier vos critères de recherche.</p>
        </div>
      ) : (
        <>
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
                      {car.images && car.images.length > 0 ? (
                        <img
                          src={getImageUrl(car.images[0]?.filename)}
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
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          backgroundColor: '#f8f9fa',
                          display: car.images && car.images.length > 0 ? 'none' : 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '8px',
                          border: '1px solid #dee2e6'
                        }}
                      >
                        <FaCarSide size={24} className="text-muted" />
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '500' }}>{car.make} {car.model}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{car.mileage || 0} km</div>
                    </td>
                    <td>{car.year || '-'}</td>
                    <td>{car.price ? `${car.price.toLocaleString()} TND` : '-'}</td>
                    <td>
                      <StatusBadge status={car.available ? 'available' : 'unavailable'}>
                        {car.available ? 'Disponible' : 'Non disponible'}
                      </StatusBadge>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <ActionButton 
                          variant="danger" 
                          onClick={() => onDelete && onDelete(car.id)}
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

          {/* Pagination moderne */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-info">
                <span className="result-count">
                  {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedCars.length)} 
                  <span className="text-muted"> sur {filteredAndSortedCars.length}</span>
                </span>
              </div>
              <div className="pagination-controls">
                <button 
                  className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"></polyline>
                  </svg>
                  Précédent
                </button>
                
                <div className="page-indicator">
                  <span className="current-page">{currentPage}</span>
                  <span className="page-separator">/</span>
                  <span className="total-pages">{totalPages}</span>
                </div>
                
                <button 
                  className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
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

        .pagination-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .pagination-info {
          color: white;
        }

        .result-count {
          font-size: 14px;
          font-weight: 500;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .pagination-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 25px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .pagination-btn:hover:not(.disabled) {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .pagination-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: rgba(255, 255, 255, 0.1);
        }

        .page-indicator {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 8px 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .current-page {
          color: white;
          font-size: 18px;
          font-weight: 700;
          min-width: 24px;
          text-align: center;
        }

        .page-separator {
          color: rgba(255, 255, 255, 0.7);
          margin: 0 8px;
          font-size: 16px;
        }

        .total-pages {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .pagination-container {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          .pagination-btn {
            padding: 8px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </DashboardCard>
  );
};

export default React.memo(AdminCars); 