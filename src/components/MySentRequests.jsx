import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { useUser } from '../contexts/userContext';
import ApiExpertRequestService from '../services/apiExpertRequestServices';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCheckCircle, faTimesCircle, faClock, faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import HeaderFive from './HeaderFive';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

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

// Composant StatusBadge amélioré
const StatusBadge = ({ status }) => {
  const statusStyles = {
    PENDING: { bg: 'warning', text: 'En attente', icon: faClock, pulse: true },
    ACCEPTED: { bg: 'success', text: 'Acceptée', icon: faCheckCircle },
    REJECTED: { bg: 'danger', text: 'Refusée', icon: faTimesCircle }
  };
  
  const style = statusStyles[status] || statusStyles.PENDING;
  
  return (
    <span className={`badge rounded-pill bg-${style.bg} p-2 d-inline-flex align-items-center`}>
      <FontAwesomeIcon 
        icon={style.icon} 
        className={style.pulse ? 'fa-pulse' : ''} 
        style={{width: '18px', height: '18px'}}
      />
      <span className="ms-2">{style.text}</span>
    </span>
  );
};

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

  useEffect(() => {
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
    <Container fluid className="my-4">
      <HeaderFive />
      
      <div className="container-lg">
        <h2 className="mb-4 text-center fw-bold display-5 gradient-text">
          Mes Demandes d'Expertise
        </h2>

        <div className="mb-5 mx-auto" style={{maxWidth: '600px'}}>
          <InputGroup className="search-bar-glass">
            <InputGroup.Text className="bg-transparent border-end-0">
              <FontAwesomeIcon icon={faSearch} className="text-primary" />
            </InputGroup.Text>
            <FormControl
              placeholder="Rechercher par marque ou modèle..."
              aria-label="Rechercher"
              className="border-start-0 bg-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        {loading ? (
          <Row xs={1} md={2} lg={3} className="g-4">
            {[...Array(6)].map((_, i) => <SkeletonLoader key={i} />)}
          </Row>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <FontAwesomeIcon icon={faInfoCircle} size="3x" className="text-muted" />
            </div>
            <h5 className="text-muted mb-3">Aucune demande trouvée</h5>
            <Button variant="outline-primary">Créer une nouvelle demande</Button>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredRequests.map((request) => (
              <Col key={request.id}>
                <Card className="shadow-sm h-100 card-hover">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary rounded-circle p-3 me-3">
                        <FontAwesomeIcon icon={faCar} className="text-white fa-lg" />
                      </div>
                      <div>
                        <Card.Title className="mb-0 fw-bold">
                          {request.car?.make} {request.car?.model}
                        </Card.Title>
                        <small className="text-muted">ID: {request.id}</small>
                      </div>
                    </div>

                    <div className="mb-3">
                      <StatusBadge status={request.status} />
                    </div>

                    <div className="mb-3 flex-grow-1">
                      <p className="text-truncate-3" style={{minHeight: '72px'}}>
                        {request.message || "Aucun message supplémentaire"}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center text-muted small mb-2">
                        <span>Créé le :</span>
                        <span>{formatRequestDate(request.requestDate)}</span>
                      </div>
                      <Button 
                        variant="outline-primary" 
                        className="w-100"
                        onClick={() => handleShow(request)}
                      >
                        Détails
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Modal amélioré */}
        <Modal show={showModal} onHide={handleClose} centered size="lg">
          <Modal.Header className="border-0 pb-0">
            <Modal.Title className="fw-bold">Détails de la demande</Modal.Title>
            <Button variant="link" onClick={handleClose} className="p-0">
              <span aria-hidden="true">&times;</span>
            </Button>
          </Modal.Header>
          
          <Modal.Body className="pt-1">
            {selectedRequest && (
              <div className="row g-4">
                <div className="col-md-6">
                  <h5 className="fw-bold mb-3 text-primary">Informations véhicule</h5>
                  <dl className="row small">
                    <dt className="col-5">Marque/Modèle</dt>
                    <dd className="col-7">{selectedRequest.car?.make} {selectedRequest.car?.model}</dd>

                    <dt className="col-5">Statut</dt>
                    <dd className="col-7"><StatusBadge status={selectedRequest.status} /></dd>

                    <dt className="col-5">Date création</dt>
                    <dd className="col-7">{formatRequestDate(selectedRequest.requestDate)}</dd>
                  </dl>
                </div>

                <div className="col-md-6">
                  <h5 className="fw-bold mb-3 text-primary">Message</h5>
                  <div className="bg-light rounded p-3 mb-4">
                    {selectedRequest.message || "Aucun message"}
                  </div>

                  {selectedRequest.expert && (
                    <>
                      <h5 className="fw-bold mb-3 text-primary">Expert assigné</h5>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary rounded-circle p-2 me-3">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-white" />
                        </div>
                        <div>
                          <div className="fw-bold">{selectedRequest.expert.firstName}</div>
                          <div className="text-muted small">{selectedRequest.expert.email}</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>

        <style>
          {`
            .gradient-text {
              background: linear-gradient(45deg, #007bff, #00d4ff);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .search-bar-glass {
              backdrop-filter: blur(8px);
              background-color: rgba(255,255,255,0.9);
              border-radius: 50px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease;
            }

            .search-bar-glass:focus-within {
              box-shadow: 0 8px 15px rgba(0, 123, 255, 0.2);
            }

            .card-hover {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              border: none;
            }

            .card-hover:hover {
              transform: translateY(-5px);
              box-shadow: 0 12px 24px rgba(0, 123, 255, 0.15);
            }

            .text-truncate-3 {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .modal-content {
              border-radius: 15px;
              border: none;
            }
          `}
        </style>
      </div>
    </Container>
  );
};

export default MySentRequests;