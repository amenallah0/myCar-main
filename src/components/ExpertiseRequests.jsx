import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, Container, Row, Col, Alert, Image } from 'react-bootstrap';
import { useUser } from '../contexts/userContext';
import { toast } from 'react-toastify';
import { 
  FaCar, FaUser, FaCalendarAlt, FaCheck, FaTimes, 
  FaSpinner, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaTools, FaClipboardList, FaSync, FaArrowUp
} from 'react-icons/fa';
import moment from 'moment';
import HeaderFive from './HeaderFive';
import 'moment/locale/fr';
moment.locale('fr');

const ExpertiseRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      fetchRequests();
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user]);

  const handleScroll = () => {
    setShowScrollTop(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/expertise-requests/expert/${user.id}`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des demandes');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Erreur lors du chargement des demandes d\'expertise');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/expertise-requests/${requestId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Erreur lors de l\'acceptation');
      
      await fetchRequests();
      toast.success('Demande acceptée avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'acceptation de la demande');
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:8081/api/expertise-requests/${requestId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Erreur lors du refus');
      
      await fetchRequests();
      toast.success('Demande refusée');
    } catch (error) {
      toast.error('Erreur lors du refus de la demande');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { 
        bg: 'warning',
        icon: <FaSpinner className="status-icon spinning" />, 
        text: 'En attente',
        className: 'status-badge-pending'
      },
      ACCEPTED: { 
        bg: 'success',
        icon: <FaCheck className="status-icon" />, 
        text: 'Acceptée',
        className: 'status-badge-accepted'
      },
      REJECTED: { 
        bg: 'danger',
        icon: <FaTimes className="status-icon" />, 
        text: 'Refusée',
        className: 'status-badge-rejected'
      }
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    
    return (
      <div className={`status-badge ${config.className}`}>
        {config.icon}
        <span>{config.text}</span>
      </div>
    );
  };

  if (loading) return (
    <Container className="py-5">
      <div className="loading-container">
        <div className="loading-spinner">
          <FaSpinner className="spinner-icon" />
        </div>
        <p>Chargement des demandes...</p>
      </div>
    </Container>
  );

  return (
    <>
      <HeaderFive />
      <div className="expertise-dashboard">
        <Container fluid className="py-4 px-4">
          <div className="dashboard-header mb-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="header-left mb-3 mb-lg-0">
                <h2 className="dashboard-title">
                  <FaClipboardList className="me-2" />
                  Tableau de Bord Expert
                </h2>
                <p className="text-muted dashboard-subtitle">
                  Gérez vos demandes d'expertise automobile
                </p>
              </div>
              <div className="header-right d-flex gap-3">
                <div className="stats-card">
                  <div className="stats-icon">
                    <FaCar />
                  </div>
                  <div className="stats-info">
                    <h4>{requests.length}</h4>
                    <p>Demandes Totales</p>
                  </div>
                </div>
                <div className="stats-card">
                  <div className="stats-icon pending">
                    <FaSpinner />
                  </div>
                  <div className="stats-info">
                    <h4>{requests.filter(r => r.status === 'PENDING').length}</h4>
                    <p>En Attente</p>
                  </div>
                </div>
                <Button 
                  variant="outline-primary" 
                  className="refresh-button"
                  onClick={fetchRequests}
                >
                  <FaSync className="me-2" />
                  Actualiser
                </Button>
              </div>
            </div>
          </div>

          {requests.length === 0 ? (
            <Alert variant="info" className="text-center empty-state">
              <div className="empty-state-icon">
                <FaCar size={40} />
              </div>
              <h4>Aucune demande en attente</h4>
              <p className="mb-0">Vous n'avez pas de nouvelles demandes d'expertise à traiter.</p>
            </Alert>
          ) : (
            <div className="requests-container">
              {requests.map((request) => (
                <Card key={request.id} className="request-card mb-4">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="car-info">
                      <h5 className="mb-0 car-title">
                        {request.car?.make} {request.car?.model}
                      </h5>
                      <small className="text-muted">
                        {request.car?.year} - {request.car?.mileage} km
                      </small>
                    </div>
                    {getStatusBadge(request.status)}
                  </Card.Header>
                  <Card.Body>
                    <div className="client-info mb-3">
                      <div className="user-profile d-flex align-items-center mb-3">
                        <div className="user-avatar me-3">
                          {request.user?.profileImage ? (
                            <Image src={request.user.profileImage} roundedCircle />
                          ) : (
                            <div className="avatar-placeholder">
                              {request.user?.firstName?.[0]}{request.user?.lastName?.[0]}
                            </div>
                          )}
                        </div>
                        <div className="user-details">
                          <h6 className="mb-1">
                            {request.user?.firstName} {request.user?.lastName}
                          </h6>
                          <div className="user-contact">
                            <small className="text-muted d-flex align-items-center mb-1">
                              <FaEnvelope className="me-2" /> {request.user?.email}
                            </small>
                            {request.user?.phone && (
                              <small className="text-muted d-flex align-items-center">
                                <FaPhone className="me-2" /> {request.user?.phone}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="request-details p-3 bg-light rounded">
                        <div className="d-flex align-items-center mb-2">
                          <FaCalendarAlt className="me-2 text-primary" />
                          <small>
                            Demande reçue le {moment(request.requestDate).format('DD MMMM YYYY à HH:mm')}
                          </small>
                        </div>
                        {request.user?.address && (
                          <div className="d-flex align-items-center">
                            <FaMapMarkerAlt className="me-2 text-primary" />
                            <small>{request.user.address}</small>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="message-section">
                      <h6 className="mb-2">Message du client</h6>
                      <div className="message-content">
                        {request.message}
                      </div>
                    </div>
                    {request.status === 'PENDING' && (
                      <div className="action-buttons d-flex gap-2 mt-4">
                        <Button 
                          variant="success" 
                          className="flex-grow-1 d-flex align-items-center justify-content-center"
                          onClick={() => handleAccept(request.id)}
                        >
                          <FaCheck className="me-2" /> Accepter
                        </Button>
                        <Button 
                          variant="danger"
                          className="flex-grow-1 d-flex align-items-center justify-content-center"
                          onClick={() => handleReject(request.id)}
                        >
                          <FaTimes className="me-2" /> Refuser
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          {showScrollTop && (
            <button 
              className="scroll-to-top"
              onClick={scrollToTop}
              aria-label="Retour en haut"
            >
              <FaArrowUp />
            </button>
          )}

          <style jsx>{`
            .expertise-dashboard {
              background-color: #f8f9fa;
              min-height: calc(100vh - 80px);
              padding-top: 2rem;
              position: relative;
            }

            .dashboard-header {
              background: white;
              padding: 2rem;
              border-radius: 15px;
              box-shadow: 0 2px 15px rgba(0,0,0,0.05);
              margin-bottom: 2rem;
            }

            .dashboard-title {
              font-size: 1.8rem;
              color: #2c3e50;
              font-weight: 600;
              margin-bottom: 0.5rem;
              display: flex;
              align-items: center;
            }

            .dashboard-subtitle {
              font-size: 1rem;
              margin-bottom: 0;
            }

            .stats-card {
              background: white;
              padding: 1.2rem;
              border-radius: 12px;
              display: flex;
              align-items: center;
              gap: 1rem;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
              transition: all 0.3s ease;
            }

            .stats-card:hover {
              transform: translateY(-3px);
              box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }

            .stats-icon {
              width: 45px;
              height: 45px;
              border-radius: 12px;
              background: var(--bs-primary);
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.2rem;
            }

            .stats-icon.pending {
              background: #ffc107;
            }

            .stats-info h4 {
              margin: 0;
              font-size: 1.5rem;
              font-weight: 600;
              color: #2c3e50;
            }

            .stats-info p {
              margin: 0;
              font-size: 0.9rem;
              color: #6c757d;
            }

            .refresh-button {
              height: 100%;
              display: flex;
              align-items: center;
              padding: 0.8rem 1.5rem;
              font-weight: 500;
              transition: all 0.3s ease;
            }

            .refresh-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 2px 8px rgba(var(--bs-primary-rgb), 0.2);
            }

            .empty-state {
              padding: 3rem;
              border-radius: 12px;
            }

            .empty-state-icon {
              margin-bottom: 1.5rem;
              color: var(--bs-primary);
            }

            .request-card {
              border: none;
              border-radius: 12px;
              box-shadow: 0 2px 12px rgba(0,0,0,0.08);
              transition: all 0.3s ease;
            }

            .request-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 4px 20px rgba(0,0,0,0.12);
            }

            .car-title {
              font-size: 1.1rem;
              color: #2c3e50;
              font-weight: 600;
            }

            .status-badge {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 8px 16px;
              border-radius: 20px;
              font-weight: 500;
              font-size: 0.9rem;
            }

            .status-badge-pending {
              background-color: #fff3cd;
              color: #856404;
              border: 1px solid #ffeeba;
            }

            .status-badge-accepted {
              background-color: #d4edda;
              color: #155724;
              border: 1px solid #c3e6cb;
            }

            .status-badge-rejected {
              background-color: #f8d7da;
              color: #721c24;
              border: 1px solid #f5c6cb;
            }

            .status-icon {
              font-size: 1rem;
            }

            .spinning {
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .user-avatar {
              width: 50px;
              height: 50px;
              overflow: hidden;
            }

            .avatar-placeholder {
              width: 100%;
              height: 100%;
              background: var(--bs-primary);
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              border-radius: 50%;
            }

            .user-details {
              flex: 1;
            }

            .message-content {
              background-color: #f8f9fa;
              padding: 1rem;
              border-radius: 8px;
              font-size: 0.95rem;
              line-height: 1.5;
            }

            .request-details {
              background-color: rgba(var(--bs-primary-rgb), 0.05);
            }

            .action-buttons button {
              padding: 0.8rem;
              font-weight: 500;
            }

            .spinner-icon {
              animation: spin 1s linear infinite;
              font-size: 2rem;
            }

            .requests-container {
              max-height: calc(100vh - 200px);
              overflow-y: auto;
              padding-right: 10px;
              scrollbar-width: thin;
              scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
            }

            .requests-container::-webkit-scrollbar {
              width: 6px;
            }

            .requests-container::-webkit-scrollbar-track {
              background: transparent;
            }

            .requests-container::-webkit-scrollbar-thumb {
              background-color: rgba(0, 0, 0, 0.2);
              border-radius: 3px;
            }

            .requests-container::-webkit-scrollbar-thumb:hover {
              background-color: rgba(0, 0, 0, 0.3);
            }

            .scroll-to-top {
              position: fixed;
              bottom: 30px;
              right: 30px;
              width: 45px;
              height: 45px;
              background-color: var(--bs-primary);
              color: white;
              border: none;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s ease;
              opacity: 0.8;
              z-index: 1000;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }

            .scroll-to-top:hover {
              opacity: 1;
              transform: translateY(-3px);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }

            .scroll-to-top:active {
              transform: translateY(0);
            }

            @media (max-width: 768px) {
              .header-right {
                flex-direction: column;
                width: 100%;
              }

              .stats-card {
                width: 100%;
              }

              .refresh-button {
                width: 100%;
                justify-content: center;
              }

              .requests-container {
                max-height: calc(100vh - 150px);
              }

              .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
              }
            }
          `}</style>
        </Container>
      </div>
    </>
  );
};

export default ExpertiseRequests; 