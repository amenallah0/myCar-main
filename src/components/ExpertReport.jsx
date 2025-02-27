import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { toast } from 'react-toastify';
import HeaderFive from './HeaderFive';
import { FaCar, FaFileAlt, FaUser, FaCalendarAlt } from 'react-icons/fa';

const ExpertReport = () => {
  const { requestId } = useParams();
  const { user } = useUser();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    criticalData: '',
    expertiseDate: new Date().toISOString().split('T')[0],
    message: '',
    expertName: user?.firstName + ' ' + user?.lastName || '',
    expertEmail: user?.email || '',
    expertPhone: user?.phone || ''
  });

  useEffect(() => {
    fetchRequestDetails();
  }, [requestId]);

  const fetchRequestDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/expertise-requests/${requestId}`);
      if (!response.ok) throw new Error('Failed to fetch request details');
      const data = await response.json();
      setCarDetails(data.car);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement des détails");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/expert-reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          requestId,
          carId: carDetails?.id,
          expertId: user?.id
        }),
      });

      if (!response.ok) throw new Error('Failed to submit report');
      
      toast.success("Rapport d'expertise envoyé avec succès");
      // Redirection vers la liste des demandes
      window.location.href = '/my-expertise-requests';
    } catch (error) {
      toast.error("Erreur lors de l'envoi du rapport");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <>
      <HeaderFive />
      <Container className="py-5">
        <div className="report-container">
          <h2 className="mb-4">
            <FaFileAlt className="me-2" />
            Rapport d'Expertise
          </h2>

          {carDetails && (
            <Card className="car-details mb-4">
              <Card.Header>
                <h3 className="mb-0">
                  <FaCar className="me-2" />
                  Détails du Véhicule
                </h3>
              </Card.Header>
              <Card.Body>
                <div className="car-info-grid">
                  <div className="info-item">
                    <span className="label">Marque:</span>
                    <span className="value">{carDetails.make}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Modèle:</span>
                    <span className="value">{carDetails.model}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Année:</span>
                    <span className="value">{carDetails.year}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Kilométrage:</span>
                    <span className="value">{carDetails.mileage} km</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          <Form onSubmit={handleSubmit} className="report-form">
            <Card>
              <Card.Header>
                <h3 className="mb-0">
                  <FaFileAlt className="me-2" />
                  Formulaire d'Expertise
                </h3>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Titre de l'expertise</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Expertise technique complète BMW Serie 3"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Données critiques du véhicule</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="criticalData"
                    value={formData.criticalData}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="État de la carrosserie, moteur, transmission, etc."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaCalendarAlt className="me-2" />
                    Date de l'expertise
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="expertiseDate"
                    value={formData.expertiseDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message détaillé</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Détails complets de l'expertise..."
                  />
                </Form.Group>

                <div className="expert-info-section">
                  <h4 className="mb-3">
                    <FaUser className="me-2" />
                    Informations de l'expert
                  </h4>
                  <div className="expert-info-grid">
                    <Form.Group>
                      <Form.Label>Nom complet</Form.Label>
                      <Form.Control
                        type="text"
                        name="expertName"
                        value={formData.expertName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="expertEmail"
                        value={formData.expertEmail}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Téléphone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="expertPhone"
                        value={formData.expertPhone}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button type="submit" variant="primary" className="submit-button">
                  <FaFileAlt className="me-2" />
                  Soumettre le rapport
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        </div>

        <style jsx>{`
          .report-container {
            max-width: 900px;
            margin: 0 auto;
          }

          .car-details {
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
          }

          .car-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
          }

          .info-item {
            display: flex;
            flex-direction: column;
          }

          .label {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 0.3rem;
          }

          .value {
            font-size: 1.1rem;
            font-weight: 500;
            color: #2c3e50;
          }

          .report-form {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .expert-info-section {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-top: 1.5rem;
          }

          .expert-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }

          .submit-button {
            padding: 0.8rem 2rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
          }

          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }

          @media (max-width: 768px) {
            .car-info-grid,
            .expert-info-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Container>
    </>
  );
};

export default ExpertReport; 