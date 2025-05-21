import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { toast } from 'react-toastify';
import HeaderFive from '../components/HeaderFive';
import { 
  FaCar, FaFileAlt, FaUser, FaCalendarAlt, 
  FaClipboardList, FaTools, FaTachometerAlt,
  FaCog, FaCheckCircle, FaCloudUploadAlt
} from 'react-icons/fa';
import apiExpertiseService from '../services/apiExpertiseService';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  max-width: 1200px;
  margin: 2rem auto;
`;

const StyledCard = styled(Card)`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  border: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledHeader = styled(Card.Header)`
  background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
  color: #fff;
  border-radius: 15px 15px 0 0;
  padding: 25px;
  border: none;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    font-size: 1.8rem;
  }
`;

const StyledBody = styled(Card.Body)`
  padding: 35px;
  background: #fff;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
    background: linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledForm = styled(Form)`
  .form-label {
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.8rem;
    font-size: 1rem;
  }

  .form-control {
    border-radius: 10px;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: #f8f9fa;
    
    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 0.2rem rgba(239, 68, 68, 0.15);
      background-color: #fff;
    }

    &:hover {
      border-color: #ef4444;
    }
  }

  textarea.form-control {
    min-height: 120px;
  }
`;

const SectionTitle = styled.h4`
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #ef4444;
  display: inline-block;
`;

const InfoCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 2rem;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #ef4444;
`;

const FileUploadSection = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  border: 2px dashed #ef4444;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(239, 68, 68, 0.05);
  }

  input[type="file"] {
    display: none;
  }

  .upload-icon {
    font-size: 2rem;
    color: #ef4444;
    margin-bottom: 1rem;
  }

  .file-name {
    margin-top: 1rem;
    font-weight: 500;
  }
`;

const ExpertReport = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { user } = useUser();
  const [carDetails, setCarDetails] = useState(null);
  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    criticalData: '',
    expertiseDate: new Date().toISOString().split('T')[0],
    message: '',
    expertName: '',
    expertEmail: user?.email || '',
    expertPhone: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchRequestDetails();
  }, [requestId]);

  const fetchRequestDetails = async () => {
    try {
      const data = await apiExpertiseService.getExpertiseRequest(requestId);
      setCarDetails(data.car);
      setRequestDetails(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement des détails");
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Ajout de l'ID de l'utilisateur et de la requête d'expertise
      formDataToSend.append('userId', requestDetails.user.id);
      formDataToSend.append('expertiseRequestId', requestId);
      
      // Reste des données du formulaire
      formDataToSend.append('title', formData.title);
      formDataToSend.append('criticalData', formData.criticalData);
      formDataToSend.append('expertiseDate', formData.expertiseDate);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('expertName', formData.expertName);
      formDataToSend.append('expertEmail', formData.expertEmail);
      formDataToSend.append('expertPhone', formData.expertPhone);
      
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }

      await apiExpertiseService.submitReport(requestId, formDataToSend);
      
      toast.success("Rapport d'expertise envoyé avec succès au client!");
      navigate(`/profile/${user.username}`);
      
    } catch (error) {
      toast.error("Erreur lors de l'envoi du rapport: " + (error.response?.data?.message || "Veuillez réessayer"));
      console.error('Detailed error:', error.response?.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="expert-report-page">
      <HeaderFive />
      <StyledContainer>
        {loading ? (
          <LoadingSpinner>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </LoadingSpinner>
        ) : (
          <StyledCard>
            <StyledHeader>
              <FaFileAlt />
              Rapport d'Expertise Automobile
            </StyledHeader>
            <StyledBody>
              {carDetails && (
                <InfoCard>
                  <Row>
                    <Col md={6}>
                      <SectionTitle>
                        <FaCar className="me-2" />
                        Détails du Véhicule
                      </SectionTitle>
                      <p><strong>Marque:</strong> {carDetails.make}</p>
                      <p><strong>Modèle:</strong> {carDetails.model}</p>
                      <p><strong>Année:</strong> {carDetails.year}</p>
                    </Col>
                    <Col md={6}>
                      <SectionTitle>
                        <FaUser className="me-2" />
                        Informations du Demandeur
                      </SectionTitle>
                      {requestDetails?.user && (
                        <>
                          <p><strong>Nom:</strong> {requestDetails.user.firstName} {requestDetails.user.lastName}</p>
                          <p><strong>Email:</strong> {requestDetails.user.email}</p>
                          {requestDetails.user.phone && (
                            <p><strong>Téléphone:</strong> {requestDetails.user.phone}</p>
                          )}
                          <p><strong>Date de la demande:</strong> {new Date(requestDetails.createdAt).toLocaleDateString('fr-FR')}</p>
                        </>
                      )}
                    </Col>
                  </Row>
                </InfoCard>
              )}

              <StyledForm onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FaFileAlt className="me-2" />
                        Titre du Rapport
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Titre du rapport d'expertise"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FaClipboardList className="me-2" />
                        Données Critiques
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="criticalData"
                        value={formData.criticalData}
                        onChange={handleChange}
                        required
                        placeholder="Données critiques du véhicule..."
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FaCalendarAlt className="me-2" />
                        Date d'Expertise
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="expertiseDate"
                        value={formData.expertiseDate}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        <FaFileAlt className="me-2" />
                        Message Détaillé
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Message détaillé de l'expertise..."
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-4">
                      <FileUploadSection>
                        <label htmlFor="file-upload">
                          <FaCloudUploadAlt className="upload-icon" />
                          <div>Cliquez ou glissez un fichier ici</div>
                          <div className="text-muted">(PDF ou Image)</div>
                          {selectedFile && (
                            <div className="file-name">
                              Fichier sélectionné: {selectedFile.name}
                            </div>
                          )}
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          accept=".pdf,image/*"
                          onChange={handleFileChange}
                        />
                      </FileUploadSection>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-end mt-4">
                  <StyledButton type="submit">
                    <FaCheckCircle className="me-2" />
                    Soumettre le Rapport
                  </StyledButton>
                </div>
              </StyledForm>
            </StyledBody>
          </StyledCard>
        )}
      </StyledContainer>

      <style jsx>{`
        .expert-report-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .expert-report-content {
          flex: 1;
          padding-top: 120px; /* Ajustez cette valeur en fonction de la hauteur de votre header */
        }
      `}</style>
    </div>
  );
};

export default ExpertReport; 