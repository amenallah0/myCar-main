import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  Form,
  Modal,
  Pagination,
  OverlayTrigger,
  Tooltip,
  Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import ApiService from '../services/apiUserServices';
import ApiCarService from '../services/apiCarServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import ApiExpertRequestService from '../services/apiExpertRequestServices';
import FlouciService from '../services/flouciService';

export default function ProfilePage() {
  const { user: contextUser, logout } = useUser();
  const navigate = useNavigate();
  const userId = contextUser?.id;

  const [user, setUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phone: false,
    mobile: false,
    address: false,
  });
  const [editedUser, setEditedUser] = useState({
    username: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    createdAt: '',
    role: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    profession: '',
    bio: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [expertFormData, setExpertFormData] = useState({
    specialization: '',
    experience: '',
    currentPosition: '',
    diploma: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(4); // Number of cars to display per page
  const [isDisconnected, setIsDisconnected] = useState(false); // State for disconnect functionality
  const [error, setError] = useState(null);
  const [expertiseCount, setExpertiseCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const userData = await ApiService.getUserById(userId);
          if (userData) {
            setUser(userData);
            setEditedUser(userData);
          } else {
            setError('User data not found');
            toast.error('User data not found');
            navigate('/');
          }
        } catch (error) {
          setError(error.message);
          console.error('Error fetching user data:', error);
          toast.error('Error loading user profile');
          navigate('/');
        }
      };

      fetchUserData();
    } else {
      setError('No user ID found');
      toast.error('Please login to view profile');
      navigate('/signin');
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (user?.id && user?.role === 'EXPERT') {
      fetchExpertiseCount();
    }
  }, [user]);

  const fetchCarDetails = async (carId) => {
    try {
      const response = await ApiCarService.getCarById(carId);
      setSelectedCar(response);
      toast.success('Car details fetched successfully');
    } catch (error) {
      console.error('Error fetching car details:', error);
      toast.error('Error fetching car details');
    }
  };

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSaveClick = async (field) => {
    try {
      const updatedUser = await ApiService.updateUser(userId, {
        [field]: editedUser[field],
      });
      setUser((prev) => ({ ...prev, [field]: editedUser[field] }));
      setEditedUser((prev) => ({ ...prev, [field]: updatedUser[field] }));
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await ApiCarService.deleteCar(carId);
      const updatedUser = {
        ...user,
        cars: user.cars.filter((car) => car.id !== carId),
      };
      setUser(updatedUser);
      toast.success('Car deleted successfully');
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Error deleting car');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpertFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'diploma') {
      setExpertFormData((prev) => ({ ...prev, diploma: files[0] }));
    } else {
      setExpertFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleExpertFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('specialization', expertFormData.specialization);
      formData.append('experience', expertFormData.experience);
      formData.append('currentPosition', expertFormData.currentPosition);
      formData.append('diploma', expertFormData.diploma);
      formData.append('userId', userId);

      await ApiExpertRequestService.createRequest(formData);
      setShowModal(false);
      toast.success('Votre demande d\'expert a été envoyée avec succès');
    } catch (error) {
      console.error('Error submitting expert request:', error);
      toast.error('Erreur lors de l\'envoi de la demande');
    }
  };

  const handleDisconnect = () => {
    logout();
    navigate('/');
  };

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = user?.cars ? user.cars.slice(indexOfFirstCar, indexOfLastCar) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fonction pour gérer le clic sur le bouton d'expertise
  const handleExpertiseButton = () => {
    if (user.role === 'EXPERT') {
      // Rediriger vers la page des demandes d'expertise
      navigate('/expertise-requests');
    } else {
      // Ouvrir le modal pour devenir expert
      setShowModal(true);
    }
  };

  const handleViewExpertRequests = () => {
    navigate('/my-expertise-requests');
  };

  const fetchExpertiseCount = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/expertise-requests/expert/${user.id}`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des expertises');
      }
      const data = await response.json();
      setExpertiseCount(data.length);
    } catch (error) {
      console.error('Error fetching expertise count:', error);
      toast.error('Erreur lors du chargement du nombre d\'expertises');
    }
  };

  // Regroupement des champs par section pour une meilleure organisation
  const personalInfoFields = [
    { label: 'Prénom', field: 'firstName' },
    { label: 'Nom', field: 'lastName' },
    { label: 'Date de naissance', field: 'birthDate', type: 'date' },
    { label: 'Nom d\'utilisateur', field: 'username' },
    { label: 'Profession', field: 'profession' },
  ];

  const contactInfoFields = [
    { label: 'Email', field: 'email', type: 'email' },
    { label: 'Téléphone fixe', field: 'phone' },
    { label: 'Mobile', field: 'mobile' },
    { label: 'Adresse', field: 'address' },
  ];

  const additionalInfoFields = [
    { label: 'Bio', field: 'bio', type: 'textarea' },
  ];

  const handlePromoteClick = async (annonceId) => {
    setIsLoading(true);
    try {
      const amount = 5000;
      const paymentResponse = await FlouciService.generatePaymentLink(
        amount, 
        contextUser.id,
        annonceId
      );

      console.log('Payment response:', paymentResponse);

      // Vérifier si nous avons un lien dans la réponse
      if (paymentResponse && paymentResponse.result && paymentResponse.result.link) {
        // Rediriger vers le lien de paiement Flouci
        window.location.href = paymentResponse.result.link;
      } else {
        console.error('Invalid payment response:', paymentResponse);
        toast.error("Erreur lors de la génération du lien de paiement");
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error.message || "Une erreur est survenue lors de l'initialisation du paiement");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <img 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" 
              alt="Profile" 
              className="profile-avatar"
            />
            {user?.role === 'EXPERT' && <span className="expert-badge" />}
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p>{user?.role === 'EXPERT' ? 'Expert Automobile' : 'Membre'}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{user?.cars?.length || 0}</span>
                <span className="stat-label">Véhicules</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{user?.role === 'EXPERT' ? expertiseCount : '0'}</span>
                <span className="stat-label">Expertises</span>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            {user?.role === 'EXPERT' ? (
              <button 
                className="view-requests-btn" 
                onClick={handleViewExpertRequests}
              >
                Mes demandes d'expertise ({expertiseCount})
              </button>
            ) : (
              <>
                <button 
                  className="view-requests-btn" 
                  onClick={() => navigate('/my-sent-requests')}
                >
                  Mes demandes envoyées
                </button>
                <button 
                  className="become-expert-btn" 
                  onClick={() => setShowModal(true)}
                >
                  Devenir expert
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        <div className="profile-section">
          <h2>Informations personnelles</h2>
          <div className="info-grid">
            {[
              { label: 'Prénom', value: user?.firstName, field: 'firstName' },
              { label: 'Nom', value: user?.lastName, field: 'lastName' },
              { label: 'Email', value: user?.email, field: 'email' },
              { label: 'Téléphone', value: user?.phone, field: 'phone' },
              { label: 'Adresse', value: user?.address, field: 'address' },
              { label: 'Profession', value: user?.profession, field: 'profession' }
            ].map((item) => (
              <div key={item.field} className="info-item">
                <label>{item.label}</label>
                {isEditing[item.field] ? (
                  <div className="edit-field">
                    <input
                      type="text"
                      value={editedUser[item.field] || ''}
                      onChange={(e) => handleChange({ target: { name: item.field, value: e.target.value }})}
                    />
                    <button onClick={() => handleSaveClick(item.field)} className="save-btn">
                      Sauvegarder
                    </button>
                  </div>
                ) : (
                  <div className="display-field">
                    <span>{item.value || '-'}</span>
                    <button onClick={() => handleEditClick(item.field)} className="edit-btn">
                      Modifier
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vehicles Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Mes véhicules</h2>
            <button className="add-car-btn" onClick={() => navigate('/addcar')}>
              Ajouter un véhicule
            </button>
          </div>
          <div className="vehicles-grid">
            {currentCars?.map((car) => (
              <div key={car?.id || 'no-id'} className="vehicle-card">
                <div className="vehicle-image">
                  {car?.images && car.images[0]?.filename ? (
                    <img 
                      src={`http://localhost:8081/api/files/download/${car.images[0].filename}`}
                      alt={car?.model || 'Car'}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'fallback-image-url';
                      }}
                    />
                  ) : (
                    <div className="no-image">Pas d'image</div>
                  )}
                </div>
                <div className="vehicle-info">
                  <h3>{car?.make} {car?.model}</h3>
                  <div className="vehicle-actions">
                    {!car.promoted && (
                      <Button 
                        onClick={() => handlePromoteClick(car.id)}
                        variant="primary"
                        className="promote-btn"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Chargement...' : 'Promouvoir'}
                      </Button>
                    )}
                    <button onClick={() => fetchCarDetails(car.id)}>Détails</button>
                    <button onClick={() => handleDeleteCar(car.id)} className="delete-btn">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .profile-hero {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          padding: 60px 20px;
          margin: 0 -20px;
          color: white;
          border-radius: 0 0 25px 25px;
        }

        .profile-header {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .profile-avatar-wrapper {
          position: relative;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid white;
          object-fit: cover;
        }

        .profile-info h1 {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .profile-info p {
          margin: 5px 0 20px;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          background: rgba(0, 0, 0, 0.2);
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: 500;
        }

        .profile-stats {
          display: flex;
          gap: 30px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 1.8rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .profile-content {
          padding: 40px 0;
        }

        .profile-section {
          margin-bottom: 40px;
        }

        .profile-section h2 {
          font-size: 1.5rem;
          margin-bottom: 30px;
          color: #1f2937;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .info-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .info-item label {
          display: block;
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .display-field {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .edit-field {
          display: flex;
          gap: 10px;
        }

        .edit-field input {
          flex: 1;
          padding: 8px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
        }

        .edit-btn, .save-btn {
          background: none;
          border: none;
          color: #6366f1;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .edit-btn:hover {
          color: #4f46e5;
        }

        .vehicles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .vehicle-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .vehicle-card:hover {
          transform: translateY(-2px);
        }

        .vehicle-image {
          height: 200px;
          background: #f3f4f6;
        }

        .vehicle-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .no-image {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .vehicle-info {
          padding: 20px;
        }

        .vehicle-info h3 {
          margin: 0 0 15px;
          font-size: 1.1rem;
          color: #1f2937;
        }

        .vehicle-actions {
          display: flex;
          gap: 10px;
        }

        .vehicle-actions button {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .vehicle-actions button:first-child {
          background: #6366f1;
          color: white;
        }

        .delete-btn {
          background: #ef4444 !important;
          color: white;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .add-car-btn {
          background: #6366f1;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .expert-badge {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 24px;
          height: 24px;
          background: #22c55e;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .become-expert-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 10px;
        }

        .become-expert-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .modal-blur-effect {
          backdrop-filter: blur(5px);
        }

        .profile-actions {
          margin-left: auto;
          display: flex;
          gap: 15px;
        }

        .view-requests-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .view-requests-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
          }

          .profile-actions {
            margin-left: 0;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>

      {/* Expert Form Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="modal-blur-effect"
        style={{ marginTop: '70px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Devenir Expert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleExpertFormSubmit}>
            <Form.Group controlId="formSpecialization" className="mt-1">
              <Form.Label>Spécialisation</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={expertFormData.specialization}
                onChange={handleExpertFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formExperience" className="mt-1">
              <Form.Label>Expérience (années)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={expertFormData.experience}
                onChange={handleExpertFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCurrentPosition" className="mt-1">
              <Form.Label>Poste actuel</Form.Label>
              <Form.Control
                type="text"
                name="currentPosition"
                value={expertFormData.currentPosition}
                onChange={handleExpertFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDiploma" className="mt-1">
              <Form.Label>Diplôme</Form.Label>
              <Form.Control
                type="file"
                name="diploma"
                onChange={handleExpertFormChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Soumettre
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
}
