import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Card, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/userContext';
import { FaUser, FaEnvelope, FaStar, FaTools, FaCar } from 'react-icons/fa';
import ApiExpertService from '../services/apiExpertServices';
import { axiosInstance } from '../services/apiUserServices';

const ExpertContactForm = ({ show, handleClose, carId }) => {
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (show) {
      loadExperts();
    }
  }, [show]);

  const loadExperts = async () => {
    try {
      const expertsData = await ApiExpertService.getAllExperts();
      setExperts(expertsData);
    } catch (error) {
      console.error('Error loading experts:', error);
      toast.error('Erreur lors du chargement des experts');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExpert || !message.trim()) {
      toast.error('Veuillez sélectionner un expert et écrire un message');
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        userId: user.id,
        expertId: parseInt(selectedExpert),
        carId: carId,
        message: message
      };

      const response = await axiosInstance.post('/expertise-requests', requestData);

      toast.success('Demande d\'expertise envoyée avec succès');
      handleClose();
      setMessage('');
      setSelectedExpert('');
    } catch (error) {
      console.error('Error sending expertise request:', error);
      toast.error('Erreur lors de l\'envoi de la demande d\'expertise');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-custom text-white border-0">
        <Modal.Title className="d-flex align-items-center">
          <FaStar className="me-2" size={20} />
          Demande d'Expertise Automobile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h5 className="mb-3 d-flex align-items-center">
              <FaTools className="me-2" />
              Sélectionnez votre expert
            </h5>
            <div className="expert-grid">
              {experts.map((expert) => (
                <Card 
                  key={expert.id}
                  className={`expert-card ${selectedExpert === expert.id.toString() ? 'selected' : ''}`}
                  onClick={() => setSelectedExpert(expert.id.toString())}
                >
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="expert-avatar me-3">
                        <FaUser size={20} />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 d-flex justify-content-between align-items-center">
                          {expert.firstName} {expert.lastName}
                          <Badge bg="primary" className="expertise-badge">Expert</Badge>
                        </h6>
                        <small className="text-muted d-flex align-items-center">
                          <FaEnvelope className="me-1" size={12} />
                          {expert.email}
                        </small>
                        {expert.specialization && (
                          <div className="mt-2">
                            <Badge bg="light" text="dark" className="specialization-badge">
                              <FaCar className="me-1" size={12} />
                              {expert.specialization}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label className="d-flex align-items-center">
              <h5 className="mb-0">
                <FaEnvelope className="me-2" />
                Votre Message
              </h5>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Décrivez en détail votre besoin d'expertise..."
              required
              className="message-input"
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button 
              variant="outline-secondary" 
              onClick={handleClose}
              className="px-4 btn-cancel"
            >
              Annuler
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
              className="px-4 btn-submit"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Envoi en cours...
                </>
              ) : (
                'Envoyer la demande'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>

      <style jsx>{`
        .expert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .expert-card {
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          border-radius: 10px;
        }

        .expert-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.1);
        }

        .expert-card.selected {
          border-color: #ef4444;
          background-color: rgba(239, 68, 68, 0.05);
        }

        .expert-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ef4444;
        }

        .message-input {
          border-radius: 10px;
          resize: vertical;
          min-height: 120px;
          padding: 1rem;
          border: 1px solid #dee2e6;
          transition: all 0.3s ease;
        }

        .message-input:focus {
          box-shadow: 0 0 0 0.25rem rgba(239, 68, 68, 0.15);
          border-color: #ef4444;
        }

        .expertise-badge {
          font-size: 0.7rem;
          padding: 0.3em 0.6em;
          border-radius: 20px;
          background-color: #ef4444 !important;
        }

        .specialization-badge {
          font-size: 0.75rem;
          padding: 0.4em 0.8em;
          border-radius: 20px;
          background-color: #f8f9fa;
          border: 1px solid #ef4444;
          color: #ef4444 !important;
          display: inline-flex;
          align-items: center;
        }

        .btn-cancel:hover {
          background-color: #f8f9fa;
          color: #ef4444;
          border-color: #ef4444;
        }

        .btn-submit {
          min-width: 150px;
          background-color: #ef4444 !important;
          border-color: #ef4444 !important;
        }

        .btn-submit:hover {
          background-color: #dc2626 !important;
          border-color: #dc2626 !important;
        }

        h5 {
          color: #2c3e50;
          font-weight: 600;
        }

        .modal-content {
          border-radius: 15px;
          overflow: hidden;
        }

        :global(.modal-header) {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%) !important;
        }

        :global(.btn-primary) {
          background-color: #ef4444 !important;
          border-color: #ef4444 !important;
        }

        :global(.btn-primary:hover) {
          background-color: #dc2626 !important;
          border-color: #dc2626 !important;
        }

        :global(.badge-primary) {
          background-color: #ef4444 !important;
        }
      `}</style>
    </Modal>
  );
};

export default ExpertContactForm; 