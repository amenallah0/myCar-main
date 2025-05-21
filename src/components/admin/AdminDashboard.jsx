// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Nav, Modal, Form, Button, Table, Card, ListGroup, Toast, Badge } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import AdminOverview from './AdminOverview';
import AdminUsers from './AdminUsers';
import AdminCars from './AdminCars';
import AdminSales from './AdminSales';
import AdminSettings from './AdminSettings';
import AdminExpertRequests from './AdminExpertRequests';
import ApiCarService from '../../services/apiCarServices';
import ApiUserService from '../../services/apiUserServices';
import ApiExpertService from '../../services/apiExpertServices';
import ApiExpertRequestService from '../../services/apiExpertRequestServices';
import ApiAnnonceService from '../../services/apiAnnonceServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAnnonces from './AdminAnnonces';
import { useUser } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import AnnonceCarousel from '../AnnonceCarousel';
import ApiNotificationService from '../../services/apiNotificationServices';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { useNotification } from '../../contexts/NotificationContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import moment from "moment";

// Styled Components optimisés
const StyledDashboard = styled.div`
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const StyledSidebar = styled(Col)`
  background: linear-gradient(180deg, #1a237e 0%, #283593 100%);
  min-height: 100vh;
  padding: 20px;
  box-shadow: 4px 0 10px rgba(0,0,0,0.1);
  position: fixed;
  width: 250px;
  z-index: 1000;
`;

const StyledContent = styled(Col)`
  margin-left: 250px;
  padding: 2rem;
  background: #f0f2f5;
  min-height: 100vh;
  
  .card {
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }
  }
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: #1a237e;
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: #1a237e;
    border-radius: 2px;
  }
`;

const ActionButton = styled(Button)`
  padding: ${props => props.icon ? '0.5rem' : '0.75rem 1.5rem'};
  font-weight: 500;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &.primary {
    background: #1a237e;
    border: none;
    
    &:hover {
      background: #283593;
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    color: #424242;
    
    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const StyledTable = styled(Table)`
  background: white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border-radius: 15px;
  overflow: hidden;

  th {
    background: #1a237e;
    color: white;
    font-weight: 500;
    padding: 1rem;
    border: none;
  }

  td {
    vertical-align: middle;
    padding: 1rem;
    border-bottom: 1px solid #f0f2f5;
  }

  tbody tr {
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

const StyledCard = styled(Card)`
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 1rem;
  overflow: hidden;
  
  .card-header {
    background: #1a237e;
    color: white;
    border: none;
    padding: 1rem 1.5rem;
  }
  
  .card-body {
    padding: 1.5rem;
  }
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  
  &.success {
    background: rgba(46, 213, 115, 0.1);
    color: #2ed573;
    
    &::before {
      background: #2ed573;
    }
  }
  
  &.warning {
    background: rgba(255, 171, 0, 0.1);
    color: #ffab00;
    
    &::before {
      background: #ffab00;
    }
  }
  
  &.danger {
    background: rgba(255, 71, 87, 0.1);
    color: #ff4757;
    
    &::before {
      background: #ff4757;
    }
  }
`;

const NotificationCard = styled(Card)`
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 1rem;
  
  .notification-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #f0f2f5;
    
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background: rgba(26, 35, 126, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1a237e;
    }
  }
  
  .notification-body {
    padding: 1.5rem;
  }
  
  .notification-footer {
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const NotificationList = ({ notifications, onDelete }) => (
  <Row>
    {notifications.map(notification => (
      <Col md={4} key={notification.id}>
        <NotificationCard notification={notification} />
        <Button variant="danger" onClick={() => onDelete(notification.id)}>
          Supprimer
        </Button>
      </Col>
    ))}
  </Row>
);

const AnimatedCard = ({ children }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    {children}
  </motion.div>
);

const AdminPromotedCars = ({ promotedCars, setPromotedCars }) => {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      try {
        setLoading(true);
        await ApiCarService.deleteCar(carId);
        setPromotedCars(prev => prev.filter(car => car.id !== carId));
        toast.success('Voiture supprimée avec succès');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error deleting car:', error);
        toast.error('Erreur lors de la suppression de la voiture');
      }
    }
  };

  const handleEditCar = (car) => {
    console.log('Editing car:', car);
    // Implémentez la logique d'édition ici
  };

  return (
    <div className="promoted-cars-section">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="view-toggle">
          <ActionButton 
            className={viewMode === 'grid' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('grid')}
            title="Vue grille"
          >
            <i className="fas fa-th-large"></i>
          </ActionButton>
          <ActionButton 
            className={viewMode === 'table' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('table')}
            title="Vue liste"
          >
            <i className="fas fa-list"></i>
          </ActionButton>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : promotedCars.length === 0 ? (
        <EmptyState />
      ) : viewMode === 'table' ? (
        <StyledCard>
          <Card.Body>
            <div className="table-responsive">
              <StyledTable>
          <thead>
            <tr>
                    <th style={{ width: '180px' }}>Véhicule</th>
                    <th>Informations</th>
                    <th style={{ width: '140px' }}>Prix</th>
                    <th style={{ width: '180px' }}>Date de promotion</th>
                    <th style={{ width: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotedCars.map((car) => (
              <tr key={car.id}>
                      <td>
                        <div className="car-image-wrapper">
                  <img
                    src={`http://localhost:8081/api/files/download/${car.images[0]?.filename}`}
                    alt={`${car.make} ${car.model}`}
                            className="car-thumbnail"
                  />
                          <div className="promotion-badge">
                            <i className="fas fa-star"></i>
                          </div>
                        </div>
                </td>
                <td>
                        <div className="car-info">
                          <h6 className="car-name">{car.make} {car.model}</h6>
                          <div className="car-details">
                            <span><i className="fas fa-calendar"></i> {car.year}</span>
                            <span><i className="fas fa-road"></i> {car.mileage} km</span>
                            <span><i className="fas fa-gas-pump"></i> {car.fuelType}</span>
                          </div>
                          <div className="creation-date">
                            <i className="fas fa-clock"></i> Créé le: {moment(car.created_at).format("DD/MM/YYYY")}
                          </div>
                        </div>
                </td>
                <td>
                        <div className="price-badge">
                          <span className="amount">{car.price}</span>
                          <span className="currency">TND</span>
                        </div>
                </td>
                <td>
                        <div className="promotion-date">
                          <i className="far fa-calendar-check"></i>
                          {car.updated_at ? moment(car.updated_at).format("DD/MM/YYYY") : "Non définie"}
                        </div>
                </td>
                <td>
                        <div className="action-buttons">
                          {/* <ActionButton 
                            className="secondary"
                      onClick={() => handleEditCar(car)}
                            title="Modifier"
                    >
                      <i className="fas fa-edit"></i>
                          </ActionButton> */}
                          <ActionButton 
                            className="danger"
                      onClick={() => handleDeleteCar(car.id)}
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
      ) : (
        <div className="grid-view">
          <Row className="g-4">
          {promotedCars.map((car) => (
              <Col key={car.id} lg={4} md={6}>
                <AnimatedCard>
                  <StyledCard className="car-card h-100">
                    <div className="car-image-container">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8081/api/files/download/${car.images[0]?.filename}`}
                        className="car-image"
                  />
                      <div className="promotion-tag">
                        <i className="fas fa-star"></i>
                        Promue
                  </div>
                </div>
                <Card.Body>
                      <div className="car-header">
                        <h5 className="car-title">{car.make} {car.model}</h5>
                        <div className="price-tag">
                          <span className="amount">{car.price}</span>
                          <span className="currency">TND</span>
                    </div>
                  </div>
                      <div className="car-specs">
                        <div className="spec-item">
                          <i className="fas fa-calendar-alt"></i>
                          <span>{car.year}</span>
                        </div>
                        <div className="spec-item">
                          <i className="fas fa-tachometer-alt"></i>
                          <span>{car.mileage} km</span>
                        </div>
                        <div className="spec-item">
                          <i className="fas fa-gas-pump"></i>
                          <span>{car.fuelType}</span>
                        </div>
                      </div>
                      <div className="creation-date">
                        <i className="fas fa-clock"></i>
                        <span>Créé le: {moment(car.created_at).format("DD/MM/YYYY")}</span>
                      </div>
                      <div className="promotion-info">
                        <i className="far fa-calendar-check"></i>
                        <span>Promue le: {moment(car.created_at).format("DD/MM/YYYY")}</span>
                      </div>
                    </Card.Body>
                    <Card.Footer>
                      <div className="action-buttons">
                        {/* <ActionButton 
                          className="secondary flex-grow-1"
                        onClick={() => handleEditCar(car)}
                      >
                        <i className="fas fa-edit"></i>
                          Modifier
                        </ActionButton> */}
                        <ActionButton 
                          className="danger flex-grow-1"
                        onClick={() => handleDeleteCar(car.id)}
                      >
                        <i className="fas fa-trash"></i>
                          Supprimer
                        </ActionButton>
                    </div>
                    </Card.Footer>
                  </StyledCard>
                </AnimatedCard>
              </Col>
            ))}
          </Row>
        </div>
      )}

      <style>{`
        .promoted-cars-section {
          animation: fadeIn 0.3s ease-in-out;
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
        }

        .car-image-wrapper {
          position: relative;
          width: 150px;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
        }

        .car-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .car-thumbnail:hover {
          transform: scale(1.05);
        }

        .promotion-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #ffd700;
          color: #1a237e;
          padding: 4px;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .car-info {
          padding: 0.5rem 0;
        }

        .car-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .car-details {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          color: #6c757d;
        }

        .car-details span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-badge {
          background: rgba(26, 35, 126, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .amount {
          font-weight: 600;
          color: #1a237e;
        }

        .currency {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .promotion-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          font-size: 0.875rem;
        }

        .grid-view {
          padding: 1rem 0;
        }

        .car-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .car-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .car-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .car-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .car-image:hover {
          transform: scale(1.05);
        }

        .promotion-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #ffd700;
          color: #1a237e;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .car-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .car-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .car-specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 1rem 0;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          font-size: 0.875rem;
        }

        .promotion-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          font-size: 0.875rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .creation-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }

        .creation-date i {
          font-size: 0.875rem;
          color: #1a237e;
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

const LoadingSpinner = () => (
  <div className="text-center py-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Chargement...</span>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-5 bg-light rounded">
    <i className="fas fa-car fa-3x text-muted mb-3"></i>
    <h4>Aucune voiture promue</h4>
    <p className="text-muted">Les voitures promues apparaîtront ici</p>
  </div>
);

const StyledModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  
  .modal-header {
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
    padding: 1.5rem;
    
    .modal-title {
      color: #1a237e;
      font-weight: 600;
    }
    
    .btn-close {
      transition: transform 0.2s ease;
      
      &:hover {
        transform: rotate(90deg);
      }
    }
  }
  
  .modal-body {
    padding: 2rem;
  }
  
  .form-label {
    font-weight: 500;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .form-control {
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    padding: 0.75rem;
    transition: all 0.2s ease;
    
    &:focus {
      border-color: #1a237e;
      box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
    }
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    border-radius: 10px;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

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

      <style>{`
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

const AdminDashboard = () => {
  // Fonction utilitaire pour formater les dates des notifications
  const formatNotificationDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    const date = moment(dateString);
    return date.isValid() ? date.fromNow() : 'Date inconnue';
  };

  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [promotedCars, setPromotedCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER'
  });

  // Add stats state with default values
  const [stats, setStats] = useState({
    totalUsers: 0,
    userGrowth: 0,
    totalCars: 0,
    carGrowth: 0,
    totalSales: 0,
    salesGrowth: 0,
    totalExperts: 0,
    expertGrowth: 0,
    availableCars: 0,
    pendingRequests: 0,
    activeExperts: 0,
    monthlySales: 0,
    recentActivities: []
  });

  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [expertRequests, setExpertRequests] = useState([]);

  const [annonces, setAnnonces] = useState([]);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [showAnnonceModal, setShowAnnonceModal] = useState(false);
  const [annonceFormData, setAnnonceFormData] = useState({
    titre: '',
    description: '',
    image: '',
    dateDebut: '',
    dateExpiration: ''
  });

  const [notifications, setNotifications] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const { addNotification } = useNotification();

  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showCarModal, setShowCarModal] = useState(false);

  useEffect(() => {
    if (!user || (user.role !== 'ADMIN' && user.role !== 'ROLE_ADMIN')) {
      toast.error('Accès refusé. Vous devez être un administrateur pour accéder à cette page.');
      navigate('/signin');
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('Fetching data...');
    fetchUsers();
    fetchCars();
    fetchExperts();
    fetchExpertRequests();
    fetchAnnonces();
    fetchPromotedCars();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await ApiUserService.getAllUsers();
      console.log('Users fetched:', response);
      
      // Vérifier si response est un tableau
      const usersArray = Array.isArray(response) ? response : [];
      setUsers(usersArray);
      
      // Mise à jour des stats
      setStats(prevStats => ({
        ...prevStats,
        totalUsers: usersArray.length,
        userGrowth: calculateGrowth(usersArray)
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setStats(prevStats => ({
        ...prevStats,
        totalUsers: 0,
        userGrowth: 0
      }));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await ApiUserService.deleteUser(userId);
        fetchUsers();
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };

  const handleEditUser = async (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      password: '' // Password field empty for security
    });
    setShowModal(true);
  };

  const fetchCars = async () => {
    try {
      const response = await ApiCarService.getAllCars();
      setCars(response);
      console.log('Cars fetched:', response);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      try {
        setLoading(true);
        await ApiCarService.deleteCar(carId);
        await fetchCars(); // Rafraîchir la liste
        toast.success('Voiture supprimée avec succès');
      } catch (error) {
        console.error('Error deleting car:', error);
        toast.error('Erreur lors de la suppression de la voiture');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCar = async (car) => {
    try {
      setSelectedCar(car);
      setShowCarModal(true);
    } catch (error) {
      console.error('Error preparing car edit:', error);
      toast.error('Erreur lors de la préparation de l\'édition');
    }
  };

  const updateStats = () => {
    // Calculer les statistiques à partir des données disponibles
    const availableCars = cars.filter(car => car.available).length;
    const promotedCars = cars.filter(car => car.promoted);
    const activeExperts = experts.filter(expert => expert.status === 'ACTIVE').length;
    const pendingRequests = expertRequests.filter(req => req.status === 'PENDING').length;
    
    // Calculer les ventes du mois
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthlySales = cars
      .filter(car => car.status === 'SOLD' && new Date(car.saleDate) >= firstDayOfMonth)
      .reduce((total, car) => total + car.price, 0);

    // Générer les activités récentes
    const recentActivities = [
      ...cars.filter(car => car.status === 'SOLD' && car.saleDate).slice(0, 5).map(car => ({
        type: 'sale',
        message: `Vente d'une ${car.make} ${car.model} pour ${car.price} TND`,
        date: car.saleDate
      })),
      ...expertRequests.filter(req => req.created_at).slice(0, 5).map(req => ({
        type: 'expert',
        message: `Nouvelle demande d'expert: ${req.username}`,
        date: req.created_at
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

    const filteredActivities = recentActivities.filter(act => !!act.date);

    setStats(prevStats => ({
      ...prevStats,
      availableCars,
      activeExperts,
      pendingRequests,
      monthlySales,
      recentActivities: filteredActivities,
      totalExperts: experts.length,
      expertGrowth: calculateGrowth(experts),
      totalCars: cars.length,
      carGrowth: calculateGrowth(cars),
      promotedCars
    }));
  };

  const calculateGrowth = (data) => {
    if (!Array.isArray(data) || data.length === 0) return 0;
    
    // Obtenir la date d'il y a un mois
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    // Compter les nouveaux utilisateurs ce mois-ci
    const newUsers = data.filter(user => {
      const userDate = new Date(user.created_at);
      return userDate > oneMonthAgo;
    }).length;
    
    // Calculer le pourcentage de croissance
    const oldCount = data.length - newUsers;
    if (oldCount === 0) return 100; // Si tous sont nouveaux
    return Math.round((newUsers / oldCount) * 100);
  };

  const calculateTotalSales = (cars) => {
    // Calculate total sales from cars data
    return cars.reduce((total, car) => {
      return car.status === 'SOLD' ? total + car.price : total;
    }, 0);
  };

  // Mettre à jour les stats quand les données changent
  useEffect(() => {
    updateStats();
  }, [users, cars, experts, expertRequests]);

  const fetchExperts = async () => {
    try {
      const response = await ApiExpertService.getAllExperts();
      console.log('Experts fetched:', response);
      
      // Formater les données si nécessaire
      const formattedExperts = response.map(expert => ({
        id: expert.id,
        nom: expert.nom || expert.username?.split(' ')[0] || '',
        prenom: expert.prenom || expert.username?.split(' ')[1] || '',
        specialite: expert.specialization || expert.specialite,
        email: expert.email,
        telephone: expert.phone || expert.telephone || '',
        status: expert.status
      }));

      setExperts(formattedExperts);
    } catch (error) {
      console.error('Error fetching experts:', error);
      setExperts([]);
    }
  };

  const handleDeleteExpert = async (expertId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet expert ?')) {
      try {
        await ApiExpertService.deleteExpert(expertId);
        fetchExperts(); // Rafraîchir la liste
        alert('Expert supprimé avec succès');
      } catch (error) {
        console.error('Error deleting expert:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleEditExpert = (expert) => {
    setSelectedExpert(expert);
    setShowModal(true);
  };

  const fetchExpertRequests = async () => {
    try {
      const response = await ApiExpertRequestService.getAllRequests();
      setExpertRequests(response);
    } catch (error) {
      console.error('Error fetching expert requests:', error);
    }
  };

  const handleApproveExpert = async (requestId) => {
    try {
      const request = expertRequests.find(req => req.id === requestId);
      if (!request) {
        toast.error('Demande non trouvée');
        return;
      }

      // Approuver la demande (cela va aussi la supprimer)
      await ApiExpertRequestService.approveRequest(requestId);
      
      // Créer un nouvel expert
      const newExpert = {
        id: request.id,
        nom: request.username.split(' ')[0] || '',
        prenom: request.username.split(' ')[1] || '',
        specialite: request.specialization,
        email: request.email,
        telephone: request.phone || '',
        status: 'ACTIVE'
      };

      // Ajouter le nouvel expert à la liste
      setExperts(prev => [...prev, newExpert]);
      
      // Supprimer la demande de la liste locale
      setExpertRequests(prev => prev.filter(req => req.id !== requestId));
      
      toast.success('Expert approuvé avec succès');
      
      // Rafraîchir la liste des experts
      await fetchExperts();
    } catch (error) {
      console.error('Error approving expert:', error);
      toast.error('Erreur lors de l\'approbation');
    }
  };

  const handleRejectExpert = async (requestId) => {
    try {
      await ApiExpertRequestService.rejectRequest(requestId);
      
      // Mettre à jour le statut localement
      setExpertRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId 
            ? { ...req, status: 'REJECTED' }
            : req
        )
      );
      
      toast.success('Demande rejetée avec succès');
      await fetchExpertRequests();
    } catch (error) {
      console.error('Error rejecting expert:', error);
      toast.error('Erreur lors du rejet');
    }
  };

  const fetchAnnonces = async () => {
    try {
      const response = await ApiAnnonceService.getAllAnnonces(user.token);
      setAnnonces(response);
    } catch (error) {
      console.error('Error fetching annonces:', error);
      toast.error('Erreur lors de la récupération des annonces');
    }
  };

  const handleCreateAnnonce = async (formData) => {
    try {
      // Vérification des données reçues
      console.log('Données reçues dans handleCreateAnnonce:', formData);
      
      // S'assurer que toutes les propriétés nécessaires sont présentes
      if (!formData.titre || !formData.description || !formData.dateDebut || !formData.dateExpiration) {
        throw new Error('Données d\'annonce incomplètes');
      }

      const annonceData = {
        ...formData,
        dateDebut: new Date(formData.dateDebut).toISOString(),
        dateExpiration: new Date(formData.dateExpiration).toISOString()
      };

      await ApiAnnonceService.createAnnonce(annonceData);
      await fetchAnnonces();  // Rafraîchir la liste des annonces
      toast.success('Annonce créée avec succès');
    } catch (error) {
      console.error('Error creating annonce:', error);
      toast.error('Erreur lors de la création de l\'annonce');
    }
  };

  const handleEditAnnonce = async (annonceId, formData) => {
    try {
      await ApiAnnonceService.updateAnnonce(annonceId, formData);
      await fetchAnnonces();
      toast.success('Annonce mise à jour avec succès');
    } catch (error) {
      console.error('Error updating annonce:', error);
      toast.error('Erreur lors de la mise à jour de l\'annonce');
    }
  };

  const handleDeleteAnnonce = async (annonceId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await ApiAnnonceService.deleteAnnonce(annonceId);
        await fetchAnnonces();
        toast.success('Annonce supprimée avec succès');
      } catch (error) {
        console.error('Error deleting annonce:', error);
        toast.error('Erreur lors de la suppression de l\'annonce');
      }
    }
  };

  const handleShowModal = () => {
    setAnnonceFormData({
      titre: '',
      description: '',
      image: '',
      dateDebut: '',
      dateExpiration: ''
    });
    setShowAnnonceModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnonceFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (base64String.length > 10000000) { // 10MB limit
          toast.error("L'image est trop volumineuse. Veuillez choisir une image plus petite.");
          return;
        }
        setAnnonceFormData(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateAnnonce(annonceFormData);
  };

  const fetchNotifications = async () => {
    try {
      const response = await ApiNotificationService.getAllNotifications();
      console.log('Notifications fetched:', response); // Ajoutez ce log pour vérifier la réponse
      setNotifications(response);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCreateNotification = async (e) => {
    e.preventDefault();
    try {
      await ApiNotificationService.createNotification({ message: notificationMessage });
      addNotification({ message: notificationMessage });
      toast.success('Notification créée avec succès');
      setNotificationMessage('');
      setShowCreateForm(false);
      fetchNotifications();
    } catch (error) {
      console.error('Error creating notification:', error);
      toast.error('Erreur lors de la création de la notification');
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) {
      const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké
      console.log(token); // Vérifiez que le token est bien récupéré
      try {
        await ApiNotificationService.deleteNotification(notificationId);
        fetchNotifications(); // Rafraîchir la liste des notifications
        toast.success('Notification supprimée avec succès');
      } catch (error) {
        console.error('Error deleting notification:', error);
        toast.error('Erreur lors de la suppression de la notification');
      }
    }
  };

  const handleUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        if (response.status === 404) {
          // Gérer le cas où l'utilisateur n'existe pas
          console.error(`L'utilisateur avec l'ID ${userId} n'existe pas`);
          // Afficher un message à l'utilisateur
          // Par exemple avec une notification toast
          return;
        }
        throw new Error('Erreur lors de la récupération de l\'utilisateur');
      }
      const userData = await response.json();
      // Traiter les données de l'utilisateur
    } catch (error) {
      console.error('Erreur:', error);
      // Gérer l'erreur
    }
  };

  const fetchPromotedCars = async () => {
    try {
      const response = await ApiCarService.getPromotedCars();
      setPromotedCars(response || []);
    } catch (error) {
      console.error("Error fetching promoted cars:", error);
      setPromotedCars([]);
    }
  };

  return (
    <StyledDashboard>
      <ToastContainer />
      <Container fluid>
        <Row>
          <StyledSidebar md={2}>
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </StyledSidebar>
          
          <StyledContent md={10}>
            <DashboardHeader>
              <div>
                <PageTitle>
                  {activeTab === 'overview' && 'Tableau de bord'}
                  {activeTab === 'users' && 'Gestion des Utilisateurs'}
                  {activeTab === 'cars' && (
                    <>
                      Gestion des Voitures
                      <div className="d-flex align-items-center gap-3 mt-2">
                        <StatusBadge className="success">
                          {cars.length} Voitures
                        </StatusBadge>
                      </div>
                    </>
                  )}
                  {activeTab === 'promoted-cars' && (
                    <>
                      Voitures Promues
                    </>
                  )}
                  {activeTab === 'expert-requests' && (
                    <>
                      Demandes d'Expert
                      <div className="d-flex align-items-center gap-3 mt-2">
                      </div>
                    </>
                  )}
                  {activeTab === 'experts' && (
                    <>
                      Gestion des Experts
                      <div className="d-flex align-items-center gap-3 mt-2">
                        <StatusBadge className="success">
                          {experts.length} Experts
                        </StatusBadge>
                      </div>
                    </>
                  )}
                  {activeTab === 'notifications' && (
                    <>
                      Notifications
                    </>
                  )}
                </PageTitle>
                <p className="text-muted mb-0">
                  {activeTab === 'overview' && 'Vue d\'ensemble de votre tableau de bord'}
                  {activeTab === 'users' && 'Gérez les utilisateurs de la plateforme'}
                  {activeTab === 'cars' && 'Gérez votre inventaire de véhicules'}
                  {activeTab === 'promoted-cars' && 'Gérez vos véhicules en promotion'}
                  {activeTab === 'expert-requests' && 'Gérez les demandes d\'expertise en attente'}
                  {activeTab === 'experts' && 'Gérez les experts de la plateforme'}
                  {activeTab === 'notifications' && 'Gérez les notifications système'}
                </p>
              </div>
            </DashboardHeader>

            {activeTab === 'overview' && <AdminOverview stats={stats} />}
            {activeTab === 'users' && (
              <AdminUsers 
                users={users}
                onDelete={handleDeleteUser}
                onEdit={handleEditUser}
                onCreate={() => setShowModal(true)}
              />
            )}
            {activeTab === 'cars' && (
              <div className="cars-section">
                <AdminCars 
                  cars={cars}
                  onDelete={handleDeleteCar}
                  onEdit={handleEditCar}
                />
              </div>
            )}
            {activeTab === 'sales' && <AdminSales />}
            {activeTab === 'settings' && <AdminSettings />}
            {activeTab === 'experts' && (
              <div className="experts-section">
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
                                    onClick={() => handleEditExpert(expert)}
                                    title="Modifier"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </ActionButton>
                                  <ActionButton
                                    className="danger"
                                    onClick={() => handleDeleteExpert(expert.id)}
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
              </div>
            )}
            {activeTab === 'expert-requests' && (
              <AdminExpertRequests 
                requests={expertRequests}
                onApprove={handleApproveExpert}
                onReject={handleRejectExpert}
              />
            )}
            {activeTab === 'annonces' && (
              <>
                <AdminAnnonces 
                    annonces={annonces}
                    onDelete={handleDeleteAnnonce}
                    onEdit={handleEditAnnonce}
                    onCreate={handleCreateAnnonce}
                />
                {annonces && annonces.length > 0 && (
                  <div className="mt-4">
                    <Swiper
                      modules={[Autoplay, Pagination, Navigation]}
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      className="mySwiper"
                    >
                      {annonces.map((annonce) => (
                        <SwiperSlide key={annonce.id}>
                          <AnnonceCarousel annonces={[annonce]} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </>
            )}
            {activeTab === 'promoted-cars' && (
              <AdminPromotedCars 
                promotedCars={promotedCars}
                setPromotedCars={setPromotedCars}
              />
            )}
            {activeTab === 'notifications' && (
              <div className="notifications-section">
                <StyledCard>
                  <Card.Body>
                    <Form onSubmit={handleCreateNotification}>
                      <Form.Group controlId="formNotificationMessage">
                        <Form.Label>Message de la Notification</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Entrez le message de la notification"
                          value={notificationMessage}
                          onChange={(e) => setNotificationMessage(e.target.value)}
                          required
                          className="notification-input"
                        />
                      </Form.Group>
                      <div className="mt-3 text-end">
                        <Button 
                          variant="secondary" 
                          className="me-2"
                          onClick={() => setShowCreateForm(false)}
                        >
                          Annuler
                        </Button>
                        <Button 
                          variant="primary" 
                          type="submit"
                        >
                          <i className="fas fa-paper-plane me-2"></i>
                          Envoyer
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </StyledCard>

                <StyledCard>
                  <Card.Header className="d-flex justify-content-between align-items-center bg-white py-3">
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0">Liste des Notifications</h5>
                      <Badge bg="primary" className="ms-2">
                        {notifications.length}
                      </Badge>
                    </div>
                  </Card.Header>
                  <ListGroup variant="flush">
                    {notifications.length === 0 ? (
                      <ListGroup.Item className="text-center py-5">
                        <div className="empty-state">
                          <FaBell size={40} className="text-muted mb-3" />
                          <h5>Aucune notification</h5>
                          <p className="text-muted">Les notifications apparaîtront ici</p>
                        </div>
                      </ListGroup.Item>
                    ) : (
                      notifications.map(notification => (
                        <ListGroup.Item 
                          key={notification.id} 
                          className="notification-item"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="notification-icon">
                                <FaBell />
                              </div>
                              <div className="notification-content">
                                <p className="notification-message mb-0">
                                  {notification.message}
                                </p>
                                <small className="text-muted">
                                  <i className="far fa-clock me-1"></i>
                                  {moment(notification.created_at).isValid() 
                                    ? moment(notification.created_at).format('DD/MM/YYYY HH:mm')
                                    : 'Date inconnue'
                                  }
                                </small>
                              </div>
                            </div>
                            <ActionButton
                              className="danger"
                              onClick={() => handleDeleteNotification(notification.id)}
                              title="Supprimer"
                            >
                              <FaTrash />
                            </ActionButton>
                          </div>
                        </ListGroup.Item>
                      ))
                    )}
                  </ListGroup>
                </StyledCard>
              </div>
            )}
          </StyledContent>
        </Row>


        <StyledModal 
          show={showAnnonceModal} 
          onHide={() => setShowAnnonceModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedAnnonce ? 'Modifier l\'annonce' : 'Créer une nouvelle annonce'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formTitre">
                <Form.Label>Titre de l'annonce</Form.Label>
                <Form.Control
                  type="text"
                  name="titre"
                  placeholder="Entrez le titre"
                  value={annonceFormData.titre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Décrivez votre annonce"
                  value={annonceFormData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!selectedAnnonce}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formDateDebut">
                <Form.Label>Date de début</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dateDebut"
                  value={annonceFormData.dateDebut}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formDateExpiration">
                <Form.Label>Date d'expiration</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dateExpiration"
                  value={annonceFormData.dateExpiration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <FormActions>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setShowAnnonceModal(false)}
                >
                  Annuler
                </Button>
                <Button variant="primary" type="submit">
                  {selectedAnnonce ? 'Mettre à jour' : 'Créer l\'annonce'}
                </Button>
              </FormActions>
            </Form>
          </Modal.Body>
        </StyledModal>
      </Container>
    </StyledDashboard>
  );
};

export default AdminDashboard;