import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, Container, Row, Col, Alert, Image } from 'react-bootstrap';
import { useUser } from '../contexts/userContext';
import { toast } from 'react-toastify';
import { 
  FaCar, FaUser, FaCalendarAlt, FaCheck, FaTimes, 
  FaSpinner, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaTools, FaClipboardList, FaSync
} from 'react-icons/fa';
import moment from 'moment';
import HeaderFive from './HeaderFive';
import 'moment/locale/fr';
moment.locale('fr');

const ExpertiseRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      fetchRequests();
    }
  }, [user]);

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
      PENDING: { bg: 'warning', icon: <FaSpinner className="me-1" />, text: 'En attente' },
      ACCEPTED: { bg: 'success', icon: <FaCheck className="me-1" />, text: 'Acceptée' },
      REJECTED: { bg: 'danger', icon: <FaTimes className="me-1" />, text: 'Refusée' }
    };
    const config = statusConfig[status] || statusConfig.PENDING;
    return (
      <Badge bg={config.bg} className="status-badge">
        {config.icon} {config.text}
      </Badge>
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
            <Row>
              {requests.map((request) => (
                <Col key={request.id} md={6} lg={4} className="mb-4">
                  <Card className="request-card h-100">
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
                </Col>
              ))}
            </Row>
          )}

          <style jsx>{`
            .expertise-dashboard {
              background-color: #f8f9fa;
              min-height: calc(100vh - 80px);
              padding-top: 2rem;
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
              padding: 0.6em 1em;
              font-size: 0.8rem;
              border-radius: 20px;
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
              font-size: 0.9rem;
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

            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
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
            }
          `}</style>
        </Container>
      </div>
    </>
  );
};

export default ExpertiseRequests; 