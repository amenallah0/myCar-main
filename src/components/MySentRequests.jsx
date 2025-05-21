import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Card, Button, Spinner, Alert, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { useUser } from '../contexts/userContext';
import ApiExpertRequestService from '../services/apiExpertRequestServices';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCheckCircle, faTimesCircle, faClock, faSearch, faInfoCircle, faCalendar, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import HeaderFive from './HeaderFive';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding: 2rem 0;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch; // Pour une meilleure prise en charge sur iOS
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
  padding: 3rem 0;
  margin-bottom: 3rem;
  border-radius: 0 0 25px 25px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h2`
  text-align: center;
  font-weight: 800;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: -1.5rem auto 3rem;
  position: relative;
  z-index: 2;
`;

const StyledInputGroup = styled(InputGroup)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.2);
    transform: translateY(-2px);
  }

  .form-control {
    border: none;
    padding: 1.2rem 1.5rem;
    font-size: 1.1rem;
    background: transparent;

    &:focus {
      box-shadow: none;
    }
  }

  .input-group-text {
    background: transparent;
    border: none;
    color: #ef4444;
    padding-left: 1.5rem;
  }
`;

const RequestCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.15);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
  color: white;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const StatusBadge = styled.span`
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
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'PENDING': return '#ef4444';
      case 'ACCEPTED': return '#22c55e';
      case 'REJECTED': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const DetailModal = styled(Modal)`
  .modal-content {
    border-radius: 20px;
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
    color: white;
    border-radius: 20px 20px 0 0;
    border: none;
    padding: 1.5rem;
  }

  .modal-body {
    padding: 2rem;
  }

  .modal-title {
    font-weight: 600;
    font-size: 1.4rem;
  }

  .btn-close {
    color: white;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

const InfoSection = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f1f3f5;
    transform: translateY(-2px);
  }

  h5 {
    color: #ef4444;
    font-weight: 600;
    margin-bottom: 1.2rem;
  }
`;

const ActionButton = styled(Button)`
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  background: ${props => props.variant === 'outline-primary' ? 'transparent' : 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)'};
  color: ${props => props.variant === 'outline-primary' ? '#ef4444' : 'white'};
  border: ${props => props.variant === 'outline-primary' ? '2px solid #ef4444' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
    background: ${props => props.variant === 'outline-primary' ? 'rgba(239, 68, 68, 0.1)' : 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)'};
    color: ${props => props.variant === 'outline-primary' ? '#dc2626' : 'white'};
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  margin: 0 auto;

  svg {
    color: #ef4444;
    margin-bottom: 1.5rem;
    font-size: 3rem;
  }

  h4 {
    color: #1f2937;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    color: #6b7280;
    margin-bottom: 2rem;
  }
`;

const DateBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.5rem 0;
  border-top: 1px solid #e5e7eb;

  svg {
    color: #ef4444;
  }
`;

// Composant Skeleton Loader
const SkeletonLoader = () => (
  <Col>
    <Card className="shadow-sm h-100">
      <Card.Body className="placeholder-glow">
        <div className="placeholder col-7 mb-3" style={{height: '28px'}}></div>
        <div className="placeholder col-4 mb-2"></div>
        <div className="placeholder col-6 mb-2"></div>
        <div className="placeholder col-10 mb-3" style={{height: '72px'}}></div>
        <div className="placeholder col-5" style={{height: '38px'}}></div>
      </Card.Body>
    </Card>
  </Col>
);

// Fonction de formatage de date
const formatRequestDate = (dateArray) => {
  if (!dateArray || dateArray.length !== 6) return 'Date inconnue';
  const [year, month, day, hour, minute] = dateArray;
  return format(new Date(year, month - 1, day, hour, minute), 'dd MMM yyyy - HH:mm', { locale: frLocale });
};

const MySentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useUser();

  // Ajoutez cette fonction pour désactiver le comportement par défaut
  const handleScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    // Ajoutez l'écouteur d'événements
    window.addEventListener('scroll', handleScroll, { passive: false });

    const fetchRequests = async () => {
      try {
        const userRequests = await ApiExpertRequestService.getUserRequests(user.id);
        setRequests(userRequests);
      } catch (error) {
        toast.error('Erreur lors du chargement des demandes');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

    // Nettoyez l'écouteur d'événements
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user]);

  const filteredRequests = requests.filter(request =>
    request.car?.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.car?.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShow = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <PageWrapper>
      <HeaderFive />
      
      <HeroSection>
        <Container>
          <PageTitle>
            Suivi de mes Demandes d'Expertise
          </PageTitle>
        </Container>
      </HeroSection>

      <Container>
        <SearchContainer>
          <StyledInputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <FormControl
              placeholder="Rechercher une demande..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </StyledInputGroup>
        </SearchContainer>

        <AnimatePresence>
          {loading ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {[...Array(6)].map((_, i) => (
                <Col key={i}>
                  <RequestCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <div className="placeholder-glow">
                      <div className="placeholder col-7 mb-3" style={{height: '28px'}}></div>
                      <div className="placeholder col-4 mb-2"></div>
                      <div className="placeholder col-6 mb-2"></div>
                      <div className="placeholder col-10 mb-3" style={{height: '72px'}}></div>
                      <div className="placeholder col-5" style={{height: '38px'}}></div>
                    </div>
                  </RequestCard>
                </Col>
              ))}
            </Row>
          ) : filteredRequests.length === 0 ? (
            <EmptyState
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <h4>Aucune demande trouvée</h4>
              <p>Vous n'avez pas encore fait de demande d'expertise.</p>
              <ActionButton 
                as={Link}
                to="/create-request"
              >
                Créer une nouvelle demande
              </ActionButton>
            </EmptyState>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredRequests.map((request, index) => (
                <Col key={request.id}>
                  <RequestCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CardHeader>
                      <div className="d-flex align-items-center gap-3">
                        <FontAwesomeIcon icon={faCar} size="lg" />
                        <div>
                          <h5 className="mb-0">{request.car?.make} {request.car?.model}</h5>
                          <small className="opacity-75">ID: {request.id}</small>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardBody>
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

                      <p className="my-3 text-muted">
                        {request.message?.slice(0, 100)}
                        {request.message?.length > 100 ? '...' : ''}
                      </p>

                      <DateBadge>
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{formatRequestDate(request.requestDate)}</span>
                      </DateBadge>

                      <ActionButton
                        variant="outline-primary"
                        className="w-100 mt-3"
                        onClick={() => handleShow(request)}
                      >
                        Voir les détails
                      </ActionButton>
                    </CardBody>
                  </RequestCard>
                </Col>
              ))}
            </Row>
          )}
        </AnimatePresence>

        <DetailModal
          show={showModal}
          onHide={handleClose}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Détails de la Demande</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            {selectedRequest && (
              <div className="row g-4">
                <div className="col-md-6">
                  <InfoSection>
                    <h5 className="mb-4">Informations Véhicule</h5>
                    <div className="d-flex flex-column gap-3">
                      <div>
                        <small className="text-muted d-block">Marque & Modèle</small>
                        <strong>{selectedRequest.car?.make} {selectedRequest.car?.model}</strong>
                      </div>
                      <div>
                        <small className="text-muted d-block">Statut</small>
                        <StatusBadge status={selectedRequest.status}>
                          <FontAwesomeIcon 
                            icon={
                              selectedRequest.status === 'ACCEPTED' ? faCheckCircle :
                              selectedRequest.status === 'REJECTED' ? faTimesCircle :
                              faClock
                            }
                          />
                          {selectedRequest.status === 'PENDING' ? 'En attente' :
                           selectedRequest.status === 'ACCEPTED' ? 'Acceptée' :
                           'Refusée'}
                        </StatusBadge>
                      </div>
                      <div>
                        <small className="text-muted d-block">Date de création</small>
                        <span>{formatRequestDate(selectedRequest.requestDate)}</span>
                      </div>
                    </div>
                  </InfoSection>
                </div>

                <div className="col-md-6">
                  <InfoSection>
                    <h5 className="mb-4">Message</h5>
                    <p className="mb-0">{selectedRequest.message || "Aucun message"}</p>
                  </InfoSection>

                  {selectedRequest.expert && (
                    <InfoSection>
                      <h5 className="mb-4">Expert Assigné</h5>
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary rounded-circle p-3">
                          <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                        </div>
                        <div>
                          <h6 className="mb-1">{selectedRequest.expert.firstName}</h6>
                          <div className="d-flex align-items-center text-muted">
                            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                            {selectedRequest.expert.email}
                          </div>
                        </div>
                      </div>
                    </InfoSection>
                  )}
                </div>
              </div>
            )}
          </Modal.Body>
        </DetailModal>
      </Container>
    </PageWrapper>
  );
};

export default MySentRequests;