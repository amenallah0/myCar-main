import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { 
  FaFileDownload, 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaClipboardList,
  FaExclamationTriangle,
  FaComments
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HeaderFive from './HeaderFive';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/userContext';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

const ViewReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expertiseRequest, setExpertiseRequest] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchReport = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/expertise-requests/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        handleErrorResponse(response.status);
        return;
      }

      const data = await response.json();
      if (!data.report) {
        toast.error("Aucun rapport disponible pour cette demande");
        navigate('/my-expertise-requests');
        return;
      }

      setExpertiseRequest(data);
      setReport(data.report);
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Erreur lors du chargement du rapport');
      navigate('/my-expertise-requests');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleErrorResponse = (status) => {
    switch (status) {
      case 403:
        toast.error("Vous n'avez pas l'autorisation de voir ce rapport");
        break;
      case 404:
        toast.error("Rapport non trouvé");
        break;
      default:
        toast.error("Une erreur est survenue lors du chargement du rapport");
    }
    navigate('/my-expertise-requests');
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/expertise-requests/${id}/report/download`,
        { 
          headers: {
            'Accept': 'application/pdf,application/octet-stream,image/*',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement');
      }

      await downloadFile(response);
      toast.success('Rapport téléchargé avec succès');
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Erreur lors du téléchargement du rapport');
    }
  };

  const downloadFile = async (response) => {
    const blob = await response.blob();
    const contentType = response.headers.get('content-type');
    const filename = `rapport-expertise-${id}-${moment().format('YYYY-MM-DD')}${contentType.includes('pdf') ? '.pdf' : '.jpg'}`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!user) {
      toast.error("Veuillez vous connecter pour accéder à cette page");
      navigate('/login');
      return;
    }
    fetchReport();
  }, [user, fetchReport]);

  if (loading) {
    return (
      <>
        <HeaderFive />
        <Container className="py-5 text-center">
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3 text-muted">Chargement du rapport...</p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <HeaderFive />
      <Container className="py-5">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <Link to="/my-expertise-requests" className="return-button">
            <FaArrowLeft className="me-2" />
            Retour aux demandes
          </Link>
          <Badge className="report-badge">
            Rapport #{id}
          </Badge>
        </div>

        <Card className="report-viewer">
          <Card.Header className="text-white d-flex justify-content-between align-items-center header-gradient">
            <h4 className="mb-0">
              <FaClipboardList className="me-2" />
              Rapport d'expertise
            </h4>
            {expertiseRequest?.car && (
              <div className="car-info text-white">
                {expertiseRequest.car.make} {expertiseRequest.car.model} ({expertiseRequest.car.year})
              </div>
            )}
          </Card.Header>
          <Card.Body>
            {report ? (
              <>
                <Row className="mb-4">
                  <Col md={6}>
                    <div className="info-section">
                      <h5 className="section-title text-danger">
                        <FaClipboardList className="me-2" />
                        Informations générales
                      </h5>
                      <div className="info-content">
                        <p><strong>Titre:</strong> {report.title}</p>
                        <p>
                          <FaCalendarAlt className="me-2 text-danger" />
                          <strong>Date de création:</strong> {moment(report.createdAt).format('DD MMMM YYYY à HH:mm')}
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-section">
                      <h5 className="section-title text-danger">
                        <FaExclamationTriangle className="me-2" />
                        Données critiques
                      </h5>
                      <div className="critical-data">
                        {report.criticalData}
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="message-section mb-4">
                  <h5 className="section-title text-danger">
                    <FaComments className="me-2" />
                    Message de l'expert
                  </h5>
                  <div className="message-content">
                    {report.message}
                  </div>
                </div>

                {report.fileData && (
                  <div className="text-center mt-4">
                    <Button 
                      variant="danger" 
                      onClick={handleDownload}
                      className="download-button"
                      size="lg"
                    >
                      <FaFileDownload className="me-2" />
                      Télécharger le rapport complet
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-muted py-5">
                <FaClipboardList size={48} className="mb-3 text-danger" />
                <h5>Aucun rapport disponible</h5>
                <p>Le rapport pour cette demande d'expertise n'est pas encore disponible.</p>
              </div>
            )}
          </Card.Body>
        </Card>

        <style>{`
          .report-viewer {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            border: none;
            background: #ffffff;
          }

          .header-gradient {
            background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
            border-radius: 12px 12px 0 0;
          }

          .loading-spinner {
            min-height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .section-title {
            color: #2c3e50;
            font-weight: 600;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
          }

          .info-section {
            background-color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            height: 100%;
            border: 1px solid rgba(239, 68, 68, 0.1);
            transition: all 0.3s ease;
          }

          .info-section:hover {
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
            transform: translateY(-2px);
          }

          .critical-data {
            color: #ef4444;
            font-weight: 500;
          }

          .message-content {
            background-color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            line-height: 1.6;
            border: 1px solid rgba(239, 68, 68, 0.1);
          }

          .download-button {
            padding: 1rem 2rem;
            border-radius: 8px;
            transition: all 0.3s ease;
            font-weight: 500;
            background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
            border: none;
          }

          .download-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
          }

          .car-info {
            font-size: 0.9rem;
            opacity: 0.9;
            background: rgba(255, 255, 255, 0.1);
            padding: 0.5rem 1rem;
            border-radius: 20px;
          }

          .return-button {
            display: inline-flex;
            align-items: center;
            padding: 10px 20px;
            border-radius: 8px;
            color: #ef4444;
            background: transparent;
            border: 2px solid #ef4444;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .return-button:hover {
            color: white;
            border-color: transparent;
            background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
          }

          .return-button:active {
            transform: translateY(0);
          }

          .return-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: 0.5s;
          }

          .return-button:hover::before {
            left: 100%;
          }

          .report-badge {
            padding: 10px 20px;
            font-size: 0.95rem;
            font-weight: 500;
            color: white;
            background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
            border-radius: 20px;
            box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
            transition: all 0.3s ease;
          }

          .report-badge:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          }

          @media (max-width: 768px) {
            .info-section {
              margin-bottom: 1rem;
            }

            .return-button {
              padding: 8px 16px;
              font-size: 0.9rem;
            }

            .report-badge {
              padding: 8px 16px;
              font-size: 0.9rem;
            }
          }
        `}</style>
      </Container>
    </>
  );
};

export default ViewReport;