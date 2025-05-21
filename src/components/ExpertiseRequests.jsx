import React, { useEffect, useState } from 'react';
import { Card, Badge, Button, Container, Row, Col, Alert, Image } from 'react-bootstrap';
import { useUser } from '../contexts/userContext';
import { toast } from 'react-toastify';
import { 
  FaCar, FaUser, FaCalendarAlt, FaCheck, FaTimes, 
  FaSpinner, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaTools, FaClipboardList, FaSync, FaArrowUp, FaFileAlt
} from 'react-icons/fa';
import moment from 'moment';
import HeaderFive from './HeaderFive';
import 'moment/locale/fr';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../services/apiUserServices';
import ApiExpertRequestService from '../services/apiExpertRequestServices';
import ApiExpertiseService from '../services/apiExpertiseService';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faClock } from '@fortawesome/free-solid-svg-icons';

moment.locale('fr');

const ExpertiseDashboard = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding-top: 2rem;
  position: relative;
`;

const DashboardHeader = styled.div`
  background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
  padding: 3rem 2rem;
  border-radius: 0 0 25px 25px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`;

const HeaderTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatsContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
`;

const StatInfo = styled.div`
  h4 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
    color: white;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }
`;

const RequestCard = styled(Card)`
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  margin-bottom: 1.5rem;
  max-width: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.15);
  }

  .card-header {
    background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
    color: white;
    border: none;
    padding: 1rem 1.25rem;
  }

  .card-body {
    padding: 1.25rem;
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
  gap: 0.5rem;
  background: ${props => {
    switch (props.status) {
      case 'PENDING': return 'rgba(239, 68, 68, 0.1)';
      case 'ACCEPTED': return 'rgba(34, 197, 94, 0.1)';
      case 'REJECTED': return 'rgba(239, 68, 68, 0.2)';
      case 'COMPLETED': return 'rgba(59, 130, 246, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'PENDING': return '#ef4444';
      case 'ACCEPTED': return '#22c55e';
      case 'REJECTED': return '#ef4444';
      case 'COMPLETED': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const ActionButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 120px;
  
  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
    color: white;
    border: none;
    
    &:hover {
      background: linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%);
      transform: translateY(-2px);
      box-shadow: 0 3px 10px rgba(239, 68, 68, 0.2);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: white;
    color: #ef4444;
    border: 1px solid #ef4444;
    
    &:hover {
      background: rgba(239, 68, 68, 0.05);
      transform: translateY(-2px);
    }
  `}

  ${props => props.variant === 'approve' && `
    background: white;
    color: #22c55e;
    border: 1px solid #22c55e;
    
    &:hover {
      background: #22c55e;
      color: white;
      transform: translateY(-2px);
    }
  `}

  ${props => props.variant === 'reject' && `
    background: white;
    color: #ef4444;
    border: 1px solid #ef4444;
    
    &:hover {
      background: #ef4444;
      color: white;
      transform: translateY(-2px);
    }
  `}
`;

const ActionButtonBasic = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 120px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  ${props => props.variant === 'approve' && `
    background: white;
    color: #22c55e;
    border: 1px solid #22c55e;
    
    &:hover:not(:disabled) {
      background: #22c55e;
      color: white;
      transform: translateY(-2px);
    }
  `}

  ${props => props.variant === 'reject' && `
    background: white;
    color: #ef4444;
    border: 1px solid #ef4444;
    
    &:hover:not(:disabled) {
      background: #ef4444;
      color: white;
      transform: translateY(-2px);
    }
  `}
`;

const ButtonText = styled.span`
  font-size: 0.95rem;
  letter-spacing: 0.5px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  margin: 2rem auto;

  svg {
    font-size: 3rem;
    color: #ef4444;
    margin-bottom: 1.5rem;
  }

  h4 {
    color: #1f2937;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    color: #6b7280;
    margin-bottom: 0;
  }
`;

const RequestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
`;

const CarInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h5 {
    font-size: 1.1rem;
    margin: 0;
    font-weight: 600;
  }

  small {
    font-size: 0.85rem;
    opacity: 0.8;
  }
`;

const ClientInfo = styled.div`
  margin: 1rem 0;
  font-size: 0.9rem;
  
  .user-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    
    svg {
      color: #ef4444;
    }
  }
`;

const MessageSection = styled.div`
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  max-height: 80px;
  overflow-y: auto;
`;

const ExpertiseRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'ROLE_EXPERT') {
      navigate('/');
      return;
    }

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
      const data = await ApiExpertRequestService.getRequestsForExpert(user.id);
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Erreur lors du chargement des demandes d\'expertise');
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await ApiExpertRequestService.getRequestsForExpert(user.id);
      await ApiExpertiseService.approveRequest(requestId);
      await fetchRequests();
      toast.success('Demande acceptée avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'acceptation de la demande');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await ApiExpertiseService.rejectRequest(requestId);
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
      },
      COMPLETED: {
        bg: 'info',
        icon: <FaFileAlt className="status-icon" />,
        text: 'Rapport soumis',
        className: 'status-badge-completed'
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

  const formatDate = (date) => {
    if (Array.isArray(date)) {
      const [year, month, day, hour = 0, minute = 0] = date;
      return moment([year, month - 1, day, hour, minute]).format('DD MMMM YYYY à HH:mm');
    }
    return moment(date).format('DD MMMM YYYY à HH:mm');
  };

  useEffect(() => {
    const fetchRequests = async () => {
      if (user?.id) {
        const data = await ApiExpertRequestService.getRequestsForExpert(user.id);
        setRequests(data);
      }
    };
    fetchRequests();
  }, [user?.id]);

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
      <ExpertiseDashboard>
        <DashboardHeader>
          <Container>
            <HeaderTitle>
              <FaClipboardList />
              Tableau de Bord Expert
            </HeaderTitle>
            <p className="mb-0 opacity-75">
              Gérez vos demandes d'expertise automobile
            </p>

            <StatsContainer>
              <StatCard>
                <StatIcon>
                  <FaCar />
                </StatIcon>
                <StatInfo>
                  <h4>{requests.length}</h4>
                  <p>Demandes Totales</p>
                </StatInfo>
              </StatCard>

              <StatCard>
                <StatIcon>
                  <FaSpinner />
                </StatIcon>
                <StatInfo>
                  <h4>{requests.filter(r => r.status === 'PENDING').length}</h4>
                  <p>En Attente</p>
                </StatInfo>
              </StatCard>

              <StatCard>
                <StatIcon>
                  <FaFileAlt />
                </StatIcon>
                <StatInfo>
                  <h4>{requests.filter(r => r.status === 'COMPLETED').length}</h4>
                  <p>Rapports Soumis</p>
                </StatInfo>
              </StatCard>
            </StatsContainer>
          </Container>
        </DashboardHeader>

        <Container>
          {requests.length === 0 ? (
            <EmptyState>
              <FaCar />
              <h4>Aucune demande en attente</h4>
              <p>Vous n'avez pas de nouvelles demandes d'expertise à traiter.</p>
            </EmptyState>
          ) : (
            <RequestsGrid>
              {requests.map((request) => (
                <RequestCard key={request.id}>
                  <Card.Header>
                    <CarInfo>
                      <FaCar size={20} />
                      <div>
                        <h5>{request.car?.make} {request.car?.model}</h5>
                        <small>{request.car?.year} - {request.car?.mileage} km</small>
                      </div>
                    </CarInfo>
                  </Card.Header>
                  
                  <Card.Body>
                    <StatusBadge status={request.status}>
                      <FontAwesomeIcon 
                        icon={
                          request.status === 'ACCEPTED' ? faCheckCircle :
                          request.status === 'REJECTED' ? faTimesCircle :
                          faClock
                        }
                      />
                      {request.status === 'PENDING' ? 'En attente' :
                       request.status === 'ACCEPTED' ? 'Acceptée' :
                       'Refusée'}
                    </StatusBadge>

                    <ClientInfo>
                      <div className="user-details">
                        <FaUser />
                        <span>{request.user?.firstName} {request.user?.lastName}</span>
                      </div>
                      <div className="user-details">
                        <FaCalendarAlt />
                        <span>{formatDate(request.requestDate)}</span>
                      </div>
                    </ClientInfo>

                    <MessageSection>
                      {request.message}
                    </MessageSection>

                    <ActionButtonGroup>
                      {request.status === 'PENDING' && (
                        <>
                          <ActionButtonBasic
                            variant="approve"
                            onClick={() => handleAccept(request.id)}
                            disabled={request.status !== 'PENDING'}
                          >
                            <FaCheck size={14} />
                            <span>Approuver</span>
                          </ActionButtonBasic>

                          <ActionButtonBasic
                            variant="reject"
                            onClick={() => handleReject(request.id)}
                            disabled={request.status !== 'PENDING'}
                          >
                            <FaTimes size={14} />
                            <span>Refuser</span>
                          </ActionButtonBasic>
                        </>
                      )}

                      <ActionButton 
                        to={`/shop-details/${request.car?.id}`}
                        variant="secondary"
                      >
                        <FaCar size={14} />
                        <span>Voir l'annonce</span>
                      </ActionButton>

                      {request.status === 'ACCEPTED' && !request.report && (
                        <ActionButton 
                          to={`/expert-report/${request.id}`}
                          variant="primary"
                        >
                          <FaFileAlt size={14} />
                          <span>Rédiger le rapport</span>
                        </ActionButton>
                      )}
                    </ActionButtonGroup>
                  </Card.Body>
                </RequestCard>
              ))}
            </RequestsGrid>
          )}
        </Container>
      </ExpertiseDashboard>
    </>
  );
};

export default ExpertiseRequests; 