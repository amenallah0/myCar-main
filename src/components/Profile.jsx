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
import { getExpertRequestsForExpert, getUserProfile, updateUserProfile } from '../services/apiUserServices';
import ApiCarService from '../services/apiCarServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../contexts/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import apiExpertRequestService from '../services/apiExpertRequestServices';
import FlouciService from '../services/flouciService';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import axios from 'axios';
import TokenService from '../services/TokenService';

const Profile = () => {
  const { username } = useParams();
  const { user, logout, setUser } = useUser();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [expertFormData, setExpertFormData] = useState({
    specialization: '',
    experience: '',
    currentPosition: '',
    diploma: null,
  });
  const [isDisconnected, setIsDisconnected] = useState(false); // State for disconnect functionality
  const [error, setError] = useState(null);
  const [totalExpertiseRequests, setTotalExpertiseRequests] = useState(0);
  const [completedExpertises, setCompletedExpertises] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [reportsCount, setReportsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expertiseCountReceived, setExpertiseCountReceived] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (!username && user) {
          navigate(`/profile/${user.username}`, { replace: true });
          return;
        }
        // Charge le profil depuis le backend
        const profile = await getUserProfile();
        setUserProfile(profile);
        setEditedUser(profile);
        
        // Charge les voitures de l'utilisateur
        if (profile?.id) {
          const cars = await ApiCarService.getCarsByUserId(profile.id);
          setUserProfile(prev => ({
            ...prev,
            cars: cars
          }));
          console.log('Fetched cars from API:', cars);
        }
        
        setLoading(false);

        // Statistiques
        if (profile.role === 'ROLE_EXPERT') {
          fetchExpertiseStats(profile.id);
        }
        fetchReportsCount(profile.id, profile.role);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    loadUserProfile();
  }, [username, user]);

  // Fonction pour rafraîchir les voitures
  const refreshUserCars = async () => {
    try {
      setIsRefreshing(true);
      if (userProfile?.id) {
        const cars = await ApiCarService.getCarsByUserId(userProfile.id);
        setUserProfile((prev) => ({
          ...prev,
          cars: cars
        }));
        console.log('Refreshed cars from API:', cars);
        toast.success('Liste des véhicules mise à jour !');
      }
    } catch (error) {
      console.error('Error refreshing user cars:', error);
      toast.error('Erreur lors du rafraîchissement');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Rafraîchir les voitures quand le composant devient visible (retour depuis AddCar)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && userProfile?.id) {
        refreshUserCars();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Rafraîchir aussi quand le composant se monte
    if (userProfile?.id) {
      refreshUserCars();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [userProfile?.id]);

  // Exposer la fonction de rafraîchissement via un effet personnalisé
  useEffect(() => {
    // Stocker la fonction dans le contexte global si nécessaire
    window.refreshUserCars = refreshUserCars;
    
    return () => {
      delete window.refreshUserCars;
    };
  }, [refreshUserCars]);

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

  // Fonction pour naviguer vers les détails de la voiture
  const handleViewCarDetails = (carId) => {
    navigate(`/shop-details/${carId}`);
  };

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSaveClick = async (field) => {
    try {
      await updateUserProfile(userProfile.id, { [field]: editedUser[field] });

      if (field === 'email') {
        toast.success('Email modifié. Veuillez vous reconnecter.');
        logout();
        navigate('/signin');
        return;
      }

      toast.success('Profil mis à jour !');

      // Ensuite, tente de rafraîchir le profil
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const refreshedUser = await getUserProfile();
        setUserProfile(refreshedUser);
        setEditedUser(refreshedUser);
      setIsEditing((prev) => ({ ...prev, [field]: false }));
      } catch (refreshError) {
        console.error('Erreur lors du rafraîchissement du profil:', refreshError);
        toast.error('Erreur lors du rafraîchissement du profil');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await ApiCarService.deleteCar(carId);
      const updatedUser = {
        ...userProfile,
        cars: userProfile.cars.filter((car) => car.id !== carId),
      };
      setUserProfile(updatedUser);
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
      formData.append('userId', userProfile.id);

      await apiExpertRequestService.createRequest(formData);
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

  // Fonction pour gérer le clic sur le bouton d'expertise
  const handleExpertiseButton = () => {
    if (user.role === 'ROLE_EXPERT') {
      // Rediriger vers la page des demandes d'expertise
      navigate('/expertise-requests');
    } else {
      // Ouvrir le modal pour devenir expert
      setShowModal(true);
    }
  };

  const handleViewExpertRequests = () => {
    if (user?.role === 'ROLE_EXPERT') {
      navigate('/expertise-requests');
    }
  };

  const fetchExpertiseStats = async (userId) => {
    try {
      if (!userId) {
        console.log('No user ID available');
        return;
      }
      
      console.log('Fetching expertise stats for expert:', userId);
      console.log('User role:', user.role);
      console.log('User token:', TokenService.getLocalAccessToken());
      
      const requests = await getExpertRequestsForExpert(userId);
      console.log('Received expertise requests:', requests);
      
      if (Array.isArray(requests)) {
        // Nombre total de demandes
        const total = requests.length;
        console.log('Setting total requests to:', total);
        setTotalExpertiseRequests(total);
        
        // Nombre d'expertises complétées avec rapport
        const completed = requests.filter(req => {
          const isCompleted = req.status === 'COMPLETED';
          const hasReport = req.report != null;
          console.log('Analyzing request:', {
            id: req.id,
            status: req.status,
            isCompleted,
            hasReport,
            reportDetails: req.report
          });
          return isCompleted && hasReport;
        }).length;
        
        console.log('Setting completed expertises to:', completed);
        setCompletedExpertises(completed);
        
        // Vérification après la mise à jour
        setTimeout(() => {
          console.log('Current state values:', {
            totalRequests: totalExpertiseRequests,
            completedExpertises: completedExpertises
          });
        }, 0);
        
      } else {
        console.warn('Received invalid response format:', requests);
        console.log('Setting counts to 0');
        setTotalExpertiseRequests(0);
        setCompletedExpertises(0);
      }
    } catch (error) {
      console.error('Error fetching expertise stats:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setTotalExpertiseRequests(0);
      setCompletedExpertises(0);
    }
  };
  
  const fetchReportsCount = async (userId, role) => {
    try {
        if (!userId) {
            console.log('No user ID available');
            return;
        }
        console.log('Fetching reports for user:', userId);

        const response = await apiExpertRequestService.getUserRequests(userId);
        console.log('Raw response data:', response);
        
        // Vérification détaillée des données
        if (Array.isArray(response)) {
            response.forEach((request, index) => {
                console.log(`Request ${index + 1} details:`, {
                    id: request.id,
                    status: request.status,
                    expert: request.expert,
                    car: request.car,
                    report: request.report,
                    requestDate: request.requestDate
                });
            });
            
            const completedReports = response.filter(request => {
                const hasReport = request.report !== null && request.report !== undefined;
                const isCompleted = request.status === 'COMPLETED';
                
                console.log(`Request ${request.id} analysis:`, {
                    hasReport,
                    isCompleted,
                    status: request.status
                });
                
                return isCompleted && hasReport;
            });
            
            console.log('Completed reports:', completedReports);
            setReportsCount(completedReports.length);
        } else {
            console.warn('Response is not an array:', response);
        }
    } catch (error) {
        console.error('Error fetching reports count:', error);
        console.error('Full error object:', error);
        toast.error('Erreur lors du chargement du nombre de rapports');
    }
};

  const refreshReportsCount = async () => {
    try {
      const endpoint = user?.role === 'ROLE_EXPERT' 
        ? `http://localhost:8081/api/expertise-requests/expert/${user.id}`
        : `http://localhost:8081/api/expertise-requests/user/${user.id}`;
        
      const response = await axios.get(endpoint);
      
      // Log pour debug
      console.log('Reports data:', response.data);
      
      const completedReports = response.data.filter(request => {
        // Log pour debug
        console.log('Request status:', request.status);
        return request.status === 'COMPLETED' && request.report !== null;
      });
      
      // Log pour debug
      console.log('Completed reports count:', completedReports.length);
      
      setReportsCount(completedReports.length);
    } catch (error) {
      console.error('Error refreshing reports count:', error);
    }
  };
  const fetchExpertReceivedCount = async () => {
    try {
      if (user?.role === 'ROLE_EXPERT') {
        await fetchExpertiseStats(user.id);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du nombre de demandes reçues', error);
    }
};

  // Regroupement des champs par section pour une meilleure organisation
  const personalInfoFields = [
    { label: 'Prénom', value: userProfile?.firstName, field: 'firstName' },
    { label: 'Nom',  value: userProfile?.lastName,  field: 'lastName' },
    { label: 'Date de naissance', value: userProfile?.birthDate,  field: 'birthDate', type: 'date' },
    { label: 'Nom d\'utilisateur', value: userProfile?.username,  field: 'username' },
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
      console.log('Starting promotion process for car:', annonceId); // Debug log
      const amount = 5000;
      const paymentResponse = await FlouciService.generatePaymentLink(
        amount, 
        userProfile.id,
        annonceId
      );

      if (paymentResponse && paymentResponse.result && paymentResponse.result.link) {
        // Le carId sera maintenant inclus dans l'URL de succès via le service Flouci
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

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
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
            {user?.role === 'ROLE_EXPERT' && <span className="expert-badge" />}
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p>{user?.role === 'ROLE_EXPERT' ? 'Expert Automobile' : 'Membre'}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{userProfile?.cars?.length || 0}</span>
                <span className="stat-label">Véhicules</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {user?.role === 'ROLE_EXPERT' ? completedExpertises : '0'}
                </span>
                <span className="stat-label">Expertises</span>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            {user?.role === 'ROLE_EXPERT' ? (
              <>
                <button 
                  className="view-requests-btn" 
                  onClick={handleViewExpertRequests}
                >
                  Mes demandes d'expertise ({totalExpertiseRequests})
                </button>
                <button 
                  className="inbox-btn" 
                  onClick={() => navigate('/expert-inbox')}
                >
                  Boîte de réception {reportsCount > 0 && `(${reportsCount})`}
                </button>
              </>
            ) : (
              <>
                <button 
                  className="view-requests-btn" 
                  onClick={() => navigate('/my-sent-requests')}
                >
                  Mes demandes envoyées
                </button>
                {reportsCount > 0 && (
                  <button 
                    className="inbox-btn" 
                    onClick={() => navigate('/expert-inbox')}
                  >
                    Boîte de réception ({reportsCount})
                  </button>
                )}
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
                    <span>{userProfile ? userProfile[item.field] || '-' : '-'}</span>
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
            <div className="section-actions">
              <button 
                className={`refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
                onClick={refreshUserCars}
                disabled={isRefreshing}
                title="Rafraîchir la liste des véhicules"
              >
                <i className={`fas fa-sync-alt ${isRefreshing ? 'fa-spin' : ''}`}></i>
              </button>
              <button className="add-car-btn" onClick={() => navigate('/addcar')}>
                Ajouter un véhicule
              </button>
            </div>
          </div>
          <div className="vehicles-grid">
            {userProfile?.cars?.length > 0 ? (
              userProfile.cars.map((car) => (
                <div key={car?.id || 'no-id'} className={`vehicle-card ${car.available ? 'available' : 'unavailable'} ${car.promoted ? 'promoted' : ''}`}>
                  <div className="vehicle-image">
                    {car?.images && car.images[0]?.filename ? (
                      <img 
                        src={`http://localhost:8081/api/files/download/${car.images[0].filename}`}
                        alt={`${car?.make} ${car?.model}` || 'Car'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/img/no-car-image.png';
                        }}
                      />
                    ) : (
                      <div className="no-image">
                        <i className="fas fa-car"></i>
                        <span>Aucune image</span>
                      </div>
                    )}
                    {car.promoted && (
                      <div className="promoted-badge">
                        <i className="fas fa-star"></i>
                        <span>Promu</span>
                      </div>
                    )}
                    <div className="availability-badge">
                      <i className={`fas ${car.available ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                      <span>{car.available ? 'Visible' : 'Masqué'}</span>
                    </div>
                  </div>
                  <div className="vehicle-info">
                    <div className="vehicle-header">
                      <h3>{car?.make} {car?.model}</h3>
                      <div className="vehicle-year">{car?.year}</div>
                    </div>
                    
                    <div className="vehicle-details">
                      <div className="detail-item">
                        <i className="fas fa-palette"></i>
                        <span>{car?.color}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-road"></i>
                        <span>{car?.mileage?.toLocaleString()} km</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-euro-sign"></i>
                        <span>{car?.price?.toLocaleString()} €</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-tachometer-alt"></i>
                        <span>{car?.powerRating} CV</span>
                      </div>
                    </div>

                    <div className="availability-toggle">
                      <Form.Check
                        type="switch"
                        id={`availability-switch-${car.id}`}
                        label={
                          <span className={`availability-label ${car.available ? 'available' : 'unavailable'}`}>
                            <i className={`fas ${car.available ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            {car.available ? "Visible aux acheteurs" : "Masqué aux acheteurs"}
                          </span>
                        }
                        checked={car.available}
                        onChange={async (e) => {
                          const newAvailabilityStatus = e.target.checked;  // Stocke la nouvelle valeur
                          try {
                            await ApiCarService.updateAvailability(car.id, newAvailabilityStatus);
                            // Mettre à jour l'état local
                            const updatedCars = userProfile.cars.map(c => 
                              c.id === car.id ? {...c, available: newAvailabilityStatus} : c
                            );
                            setUserProfile((prev) => ({ ...prev, cars: updatedCars }));
                            
                            // Toast personnalisé selon le nouvel état
                            if (newAvailabilityStatus) {  // Si la voiture devient disponible
                              toast.success(
                                <div className="custom-toast">
                                  <div className="toast-icon">🚗</div>
                                  <div className="toast-content">
                                    <div className="toast-title">Véhicule disponible</div>
                                    <div className="toast-message">{car.make} {car.model} est maintenant visible aux acheteurs</div>
                                  </div>
                                </div>, 
                                {
                                  position: "top-right",
                                  autoClose: 4000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  className: "success-toast",
                                  bodyClassName: "success-toast-body",
                                  progressClassName: "success-progress"
                                }
                              );
                            } else {  // Si la voiture devient non disponible
                              toast.warning(
                                <div className="custom-toast">
                                  <div className="toast-icon">🔒</div>
                                  <div className="toast-content">
                                    <div className="toast-title">Véhicule masqué</div>
                                    <div className="toast-message">{car.make} {car.model} n'est plus visible aux acheteurs</div>
                                  </div>
                                </div>, 
                                {
                                  position: "top-right",
                                  autoClose: 4000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  className: "warning-toast",
                                  bodyClassName: "warning-toast-body",
                                  progressClassName: "warning-progress"
                                }
                              );
                            }
                          } catch (error) {
                            console.error('Error updating availability:', error);
                            toast.error(
                              <div className="custom-toast">
                                <div className="toast-icon">⚠️</div>
                                <div className="toast-content">
                                  <div className="toast-title">Erreur de mise à jour</div>
                                  <div className="toast-message">Impossible de modifier la disponibilité. Veuillez réessayer.</div>
                                </div>
                              </div>, 
                              {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                className: "error-toast",
                                bodyClassName: "error-toast-body",
                                progressClassName: "error-progress"
                              }
                            );
                            // En cas d'erreur, remettre le switch à son état précédent
                            const updatedCars = userProfile.cars.map(c => 
                              c.id === car.id ? {...c, available: !newAvailabilityStatus} : c
                            );
                            setUserProfile((prev) => ({ ...prev, cars: updatedCars }));
                          }
                        }}
                      />
                    </div>
                    <div className="vehicle-actions">
                      <div className="primary-actions">
                        <button 
                          onClick={() => handleViewCarDetails(car.id)} 
                          className="action-btn details-btn"
                          title="Voir les détails"
                        >
                          <i className="fas fa-info-circle"></i>
                          <span>Détails</span>
                        </button>
                        {!car.promoted && (
                          <button 
                            onClick={() => handlePromoteClick(car.id)}
                            className="action-btn promote-btn"
                            disabled={isLoading}
                            title="Promouvoir ce véhicule"
                          >
                            <i className="fas fa-star"></i>
                            <span>{isLoading ? 'Chargement...' : 'Promouvoir'}</span>
                          </button>
                        )}
                      </div>
                      <div className="secondary-actions">
                        <button 
                          onClick={() => handleDeleteCar(car.id)} 
                          className="action-btn delete-btn"
                          title="Supprimer ce véhicule"
                        >
                          <i className="fas fa-trash"></i>
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-cars-message">
                <p>Vous n'avez pas encore de véhicule enregistré.</p>
                <button className="add-car-btn" onClick={() => navigate('/addcar')}>
                  Ajouter un véhicule
                </button>
              </div>
            )}
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

        /* Styles pour les toasts personnalisés */
        :global(.custom-toast) {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0;
        }

        :global(.toast-icon) {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        :global(.toast-content) {
          flex: 1;
        }

        :global(.toast-title) {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 2px;
        }

        :global(.toast-message) {
          font-size: 0.85rem;
          opacity: 0.9;
          line-height: 1.3;
        }

        :global(.success-toast) {
          background: linear-gradient(135deg, #10b981, #059669) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3) !important;
        }

        :global(.warning-toast) {
          background: linear-gradient(135deg, #f59e0b, #d97706) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3) !important;
        }

        :global(.error-toast) {
          background: linear-gradient(135deg, #ef4444, #dc2626) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3) !important;
        }

        :global(.success-progress) {
          background: rgba(255, 255, 255, 0.3) !important;
        }

        :global(.warning-progress) {
          background: rgba(255, 255, 255, 0.3) !important;
        }

        :global(.error-progress) {
          background: rgba(255, 255, 255, 0.3) !important;
        }

        .vehicle-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
        }

        .vehicle-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }

        .vehicle-card.promoted {
          border-color: #fbbf24;
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2);
        }

        .vehicle-card.promoted:hover {
          box-shadow: 0 8px 30px rgba(251, 191, 36, 0.3);
        }

        .vehicle-card.unavailable {
          opacity: 0.7;
        }

        .vehicle-image {
          height: 200px;
          background: #f8f9fa;
          position: relative;
          overflow: hidden;
        }

        .vehicle-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .vehicle-card:hover .vehicle-image img {
          transform: scale(1.05);
        }

        .no-image {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
        }

        .no-image i {
          font-size: 2.5rem;
          margin-bottom: 8px;
          opacity: 0.6;
        }

        .no-image span {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .promoted-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
        }

        .promoted-badge i {
          font-size: 0.7rem;
        }

        .availability-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 6px 10px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
          backdrop-filter: blur(10px);
        }

        .vehicle-info {
          padding: 20px;
        }

        .vehicle-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .vehicle-header h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #1f2937;
          font-weight: 600;
        }

        .vehicle-year {
          background: #ef4444;
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .vehicle-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 15px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .detail-item i {
          color: #ef4444;
          width: 14px;
          text-align: center;
        }

        .detail-item span {
          font-weight: 500;
        }

        .vehicle-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #f1f5f9;
        }

        .primary-actions, .secondary-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .details-btn {
          background: #6366f1;
          color: white;
        }

        .details-btn:hover {
          background: #4f46e5;
          transform: translateY(-1px);
        }

        .promote-btn {
          background: #fbbf24;
          color: white;
        }

        .promote-btn:hover:not(:disabled) {
          background: #f59e0b;
          transform: translateY(-1px);
        }

        .promote-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .delete-btn {
          background: #ef4444;
          color: white;
        }

        .delete-btn:hover {
          background: #dc2626;
          transform: translateY(-1px);
        }

        .no-cars-message {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .no-cars-message p {
          font-size: 1.1rem;
          color: #6b7280;
          margin-bottom: 20px;
        }

        .availability-toggle {
          margin: 15px 0;
          padding: 12px 16px;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .availability-toggle:hover {
          background: linear-gradient(135deg, #e9ecef, #dee2e6);
          border-color: #d1d5db;
        }

        .availability-label {
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 4px 8px;
          border-radius: 6px;
          margin-left: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .availability-label.available {
          color: #059669;
        }

        .availability-label.unavailable {
          color: #dc2626;
        }

        .availability-label i {
          font-size: 0.9rem;
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

        .inbox-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .inbox-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .inbox-btn i {
          font-size: 1.1rem;
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

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .section-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .refresh-btn {
          background: #6b7280;
          color: white;
          border: none;
          padding: 10px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .refresh-btn:hover {
          background: #4b5563;
          transform: rotate(180deg);
        }

        .refresh-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
        }

        .refresh-btn.refreshing {
          background: #ef4444;
        }

        .refresh-btn.refreshing:hover {
          background: #ef4444;
          transform: none;
        }

        .refresh-btn i {
          transition: transform 0.3s ease;
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

        /* Style pour le switch */
        :global(.form-switch) {
          padding-left: 2.5em;
        }

        :global(.form-check-input) {
          cursor: pointer;
          width: 3em !important;
          height: 1.5em !important;
          margin-top: 0.25em;
          background-color: #dc3545;
          border-color: #dc3545;
          transition: all 0.3s ease !important;
        }

        :global(.form-check-input:checked) {
          background-color: #28a745 !important;
          border-color: #28a745 !important;
        }

        :global(.form-check-input:focus) {
          border-color: #28a745;
          outline: 0;
          box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
        }

        .profile-actions {
          margin-left: auto;
          display: flex;
          gap: 15px;
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
};

export default Profile;
