import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ApiExpertService from '../services/apiExpertServices';
import ApiMessageService from '../services/apiMessageServices';

const ExpertContactForm = ({ show, handleClose, carId }) => {
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadExperts();
  }, []);

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
      await ApiMessageService.sendMessage({
        expertId: selectedExpert,
        carId: carId,
        message: message
      });
      toast.success('Message envoyé avec succès');
      handleClose();
      setMessage('');
      setSelectedExpert('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contacter un Expert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Sélectionner un Expert</Form.Label>
            <Form.Select
              value={selectedExpert}
              onChange={(e) => setSelectedExpert(e.target.value)}
              required
            >
              <option value="">Choisir un expert...</option>
              {experts.map((expert) => (
                <option key={expert.id} value={expert.id}>
                  {expert.username} - {expert.email}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Votre Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message ici..."
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExpertContactForm; 