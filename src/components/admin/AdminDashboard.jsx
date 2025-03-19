// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Nav, Modal, Form, Button, Table, Card, ListGroup, Toast } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import AdminOverview from './AdminOverview';
import AdminUsers from './AdminUsers';
import AdminCars from './AdminCars';
import AdminSales from './AdminSales';
import AdminSettings from './AdminSettings';
import AdminExperts from './AdminExperts';
import AdminExpertRequests from './AdminExpertRequests';
import ApiUserService from '../../services/apiUserServices';
import ApiCarService from '../../services/apiCarServices';
import ApiService from '../../services/apiUserServices';
import ApiExpertService from '../../services/apiExpertServices';
import ApiExpertRequestService from '../../services/apiExpertRequestServices';
import ApiAnnonceService from '../../services/apiAnnonceServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAnnonces from './AdminAnnonces';
import { useUser } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import AnnonceCarousel from '../AnnonceCarousel';
import ApiNotificationService from '../../services/apiNotificationServices';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { useNotification } from '../../contexts/NotificationContext';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import moment from "moment";

// Register Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

// Styled Components
const StyledDashboard = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const StyledSidebar = styled(Col)`
  background: #2c3e50;
  min-height: 100vh;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
`;

const StyledContent = styled(Col)`
  padding: 2rem;
  background: #f8f9fa;
  
  .card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    overflow: hidden;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  .modal-header {
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
    padding: 1.5rem;
  }
  
  .modal-body {
    padding: 2rem;
  }
  
  .form-label {
    font-weight: 500;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .form-control {
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    padding: 0.75rem;
    transition: all 0.2s ease;
    
    &:focus {
      border-color: #2196f3;
      box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    }
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    border-radius: 8px;
  }
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: #1a237e;
  margin: 0;
  font-weight: 600;
`;

const ActionButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &.primary {
    background: #2196f3;
    border: none;
    
    &:hover {
      background: #1976d2;
      transform: translateY(-2px);
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const StyledTable = styled(Table)`
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;

  th {
    background: #2c3e50;
    color: white;
  }

  td {
    vertical-align: middle;
  }
`;

const StyledCard = styled(Card)`
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const NotificationCard = ({ notification }) => (
  <StyledCard>
    <Card.Body>
      <Card.Title>{notification.message}</Card.Title>
      <Card.Text>
        {notification.createdAt ? new Date(notification.createdAt).toLocaleString() : 'N/A'}
      </Card.Text>
    </Card.Body>
  </StyledCard>
);

const NotificationList = ({ notifications, onDelete }) => (
  <Row>
    {notifications.map(notification => (
      <Col md={4} key={notification.id}>
        <NotificationCard notification={notification} />
        <Button variant="danger" onClick={() => onDelete(notification.id)}>
          Supprimer
        </Button>
      </Col>
    ))}
  </Row>
);

const AnimatedCard = ({ children }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    {children}
  </motion.div>
);

const AdminPromotedCars = () => {
  const [promotedCars, setPromotedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'table'

  const handleEditCar = (car) => {
    console.log('Editing car:', car);
    // Implémentez la logique d'édition ici
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      try {
        await ApiCarService.deleteCar(carId);
        // Rafraîchir la liste des voitures promues
        const response = await ApiCarService.getPromotedCars();
        setPromotedCars(response);
        toast.success('Voiture supprimée avec succès');
      } catch (error) {
        console.error('Error deleting car:', error);
        toast.error('Erreur lors de la suppression de la voiture');
      }
    }
  };

  useEffect(() => {
    const fetchPromotedCars = async () => {
      try {
        const response = await ApiCarService.getPromotedCars();
        setPromotedCars(response);
      } catch (error) {
        console.error("Error fetching promoted cars:", error);
        toast.error("Erreur lors de la récupération des voitures promues");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotedCars();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="promoted-cars-section">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Voitures Promues</h2>
          <p className="text-muted mb-0">Gérez vos voitures en promotion</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-primary fs-6">
            {promotedCars.length} voitures
          </span>
          <div className="btn-group">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th-large"></i>
            </Button>
            <Button
              variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('table')}
            >
              <i className="fas fa-list"></i>
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : promotedCars.length === 0 ? (
        <div className="text-center py-5 bg-light rounded">
          <i className="fas fa-car fa-3x text-muted mb-3"></i>
          <h4>Aucune voiture promue</h4>
          <p className="text-muted">Les voitures promues apparaîtront ici</p>
        </div>
      ) : viewMode === 'table' ? (
        // Vue tableau
        <StyledTable striped bordered hover className="mb-5">
          <thead>
            <tr>
              <th>Image</th>
              <th>Détails</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotedCars.map((car) => (
              <tr key={car.id}>
                <td style={{ width: '150px' }}>
                  <img
                    src={`http://localhost:8081/api/files/download/${car.images[0]?.filename}`}
                    alt={`${car.make} ${car.model}`}
                    className="img-fluid rounded"
                    style={{ height: '80px', objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <h6 className="mb-1">{car.make} {car.model}</h6>
                  <small className="text-muted">ID: {car.id}</small>
                </td>
                <td>
                  <h6 className="mb-0">{car.price} €</h6>
                </td>
                <td>
                  <span className="badge bg-success">Promue</span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEditCar(car)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteCar(car.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      ) : (
        // Vue grille
        <div className="row g-4">
          {promotedCars.map((car) => (
            <div key={car.id} className="col-md-4">
              <Card className="h-100 shadow-sm hover-shadow">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8081/api/files/download/${car.images[0]?.filename}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-success">Promue</span>
                  </div>
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <Card.Title className="mb-0">{car.make} {car.model}</Card.Title>
                      <small className="text-muted">ID: {car.id}</small>
                    </div>
                    <h5 className="text-primary mb-0">{car.price} €</h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <small className="text-muted">
                      Promue le: {moment(car.promotionStartDate).format("DD/MM/YYYY")}
                    </small>
                    <div className="btn-group">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditCar(car)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteCar(car.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER'
  });

  // Add stats state with default values
  const [stats, setStats] = useState({
    totalUsers: 0,
    userGrowth: 0,
    totalCars: 0,
    carGrowth: 0,
    totalSales: 0,
    salesGrowth: 0
  });

  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [expertRequests, setExpertRequests] = useState([]);

  const [annonces, setAnnonces] = useState([]);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [showAnnonceModal, setShowAnnonceModal] = useState(false);
  const [annonceFormData, setAnnonceFormData] = useState({
    titre: '',
    description: '',
    image: '',
    dateDebut: '',
    dateExpiration: ''
  });

  const [notifications, setNotifications] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const { addNotification } = useNotification();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      toast.error('Accès refusé. Vous devez être un administrateur pour accéder à cette page.');
      navigate('/signin');
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('Fetching data...');
    fetchUsers();
    fetchCars();
    fetchExperts();
    fetchExpertRequests();
    fetchAnnonces();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await ApiService.getAllUsers();
      console.log('Users fetched:', response);
      
      // Vérifier si response est un tableau
      const usersArray = Array.isArray(response) ? response : [];
      setUsers(usersArray);
      
      // Mise à jour des stats
      setStats(prevStats => ({
        ...prevStats,
        totalUsers: usersArray.length,
        userGrowth: calculateGrowth(usersArray)
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setStats(prevStats => ({
        ...prevStats,
        totalUsers: 0,
        userGrowth: 0
      }));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await ApiUserService.deleteUser(userId);
        fetchUsers(); // Refresh users list
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };

  const handleEditUser = async (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      password: '' // Password field empty for security
    });
    setShowModal(true);
  };

  const fetchCars = async () => {
    try {
      const response = await ApiCarService.getAllCars();
      setCars(response);
      console.log('Cars fetched:', response);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await ApiCarService.deleteCar(carId);
        fetchCars(); // Refresh cars list
        alert('Car deleted successfully');
      } catch (error) {
        console.error('Error deleting car:', error);
        alert('Error deleting car');
      }
    }
  };

  const handleEditCar = (car) => {
    // Implement car editing logic here
    console.log('Editing car:', car);
  };

  const updateStats = () => {
    // Update stats based on users and cars data
    setStats({
      totalUsers: users.length,
      userGrowth: calculateGrowth(users),
      totalCars: cars.length,
      carGrowth: calculateGrowth(cars),
      totalSales: calculateTotalSales(cars),
      salesGrowth: 0 // Implement sales growth calculation
    });
  };

  const calculateGrowth = (data) => {
    if (!Array.isArray(data) || data.length === 0) return 0;
    
    // Obtenir la date d'il y a un mois
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    // Compter les nouveaux utilisateurs ce mois-ci
    const newUsers = data.filter(user => {
      const userDate = new Date(user.created_at);
      return userDate > oneMonthAgo;
    }).length;
    
    // Calculer le pourcentage de croissance
    const oldCount = data.length - newUsers;
    if (oldCount === 0) return 100; // Si tous sont nouveaux
    return Math.round((newUsers / oldCount) * 100);
  };

  const calculateTotalSales = (cars) => {
    // Calculate total sales from cars data
    return cars.reduce((total, car) => {
      return car.status === 'SOLD' ? total + car.price : total;
    }, 0);
  };

  // Update stats whenever users or cars change
  useEffect(() => {
    updateStats();
  }, [users, cars]);

  const fetchExperts = async () => {
    try {
      const response = await ApiExpertService.getAllExperts();
      console.log('Experts fetched:', response);
      
      // Formater les données si nécessaire
      const formattedExperts = response.map(expert => ({
        id: expert.id,
        nom: expert.nom || expert.username?.split(' ')[0] || '',
        prenom: expert.prenom || expert.username?.split(' ')[1] || '',
        specialite: expert.specialization || expert.specialite,
        email: expert.email,
        telephone: expert.phone || expert.telephone || '',
        status: expert.status
      }));

      setExperts(formattedExperts);
    } catch (error) {
      console.error('Error fetching experts:', error);
      setExperts([]);
    }
  };

  const handleDeleteExpert = async (expertId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet expert ?')) {
      try {
        await ApiExpertService.deleteExpert(expertId);
        fetchExperts(); // Rafraîchir la liste
        alert('Expert supprimé avec succès');
      } catch (error) {
        console.error('Error deleting expert:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleEditExpert = (expert) => {
    setSelectedExpert(expert);
    setShowModal(true);
  };

  const fetchExpertRequests = async () => {
    try {
      const response = await ApiExpertRequestService.getAllRequests();
      setExpertRequests(response);
    } catch (error) {
      console.error('Error fetching expert requests:', error);
    }
  };

  const handleApproveExpert = async (requestId) => {
    try {
      const request = expertRequests.find(req => req.id === requestId);
      if (!request) {
        toast.error('Demande non trouvée');
        return;
      }

      // Approuver la demande (cela va aussi la supprimer)
      await ApiExpertRequestService.approveRequest(requestId);
      
      // Créer un nouvel expert
      const newExpert = {
        id: request.id,
        nom: request.username.split(' ')[0] || '',
        prenom: request.username.split(' ')[1] || '',
        specialite: request.specialization,
        email: request.email,
        telephone: request.phone || '',
        status: 'ACTIVE'
      };

      // Ajouter le nouvel expert à la liste
      setExperts(prev => [...prev, newExpert]);
      
      // Supprimer la demande de la liste locale
      setExpertRequests(prev => prev.filter(req => req.id !== requestId));
      
      toast.success('Expert approuvé avec succès');
      
      // Rafraîchir la liste des experts
      await fetchExperts();
    } catch (error) {
      console.error('Error approving expert:', error);
      toast.error('Erreur lors de l\'approbation');
    }
  };

  const handleRejectExpert = async (requestId) => {
    try {
      await ApiExpertRequestService.rejectRequest(requestId);
      
      // Mettre à jour le statut localement
      setExpertRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId 
            ? { ...req, status: 'REJECTED' }
            : req
        )
      );
      
      toast.success('Demande rejetée avec succès');
      await fetchExpertRequests();
    } catch (error) {
      console.error('Error rejecting expert:', error);
      toast.error('Erreur lors du rejet');
    }
  };

  const fetchAnnonces = async () => {
    try {
      const response = await ApiAnnonceService.getAllAnnonces(user.token);
      setAnnonces(response);
    } catch (error) {
      console.error('Error fetching annonces:', error);
      toast.error('Erreur lors de la récupération des annonces');
    }
  };

  const handleCreateAnnonce = async (formData) => {
    try {
      await ApiAnnonceService.createAnnonce(formData);
      await fetchAnnonces();
      toast.success('Annonce créée avec succès');
    } catch (error) {
      console.error('Error creating annonce:', error);
      toast.error('Erreur lors de la création de l\'annonce');
    }
  };

  const handleEditAnnonce = async (annonceId, formData) => {
    try {
      await ApiAnnonceService.updateAnnonce(annonceId, formData);
      await fetchAnnonces();
      toast.success('Annonce mise à jour avec succès');
    } catch (error) {
      console.error('Error updating annonce:', error);
      toast.error('Erreur lors de la mise à jour de l\'annonce');
    }
  };

  const handleDeleteAnnonce = async (annonceId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await ApiAnnonceService.deleteAnnonce(annonceId);
        await fetchAnnonces();
        toast.success('Annonce supprimée avec succès');
      } catch (error) {
        console.error('Error deleting annonce:', error);
        toast.error('Erreur lors de la suppression de l\'annonce');
      }
    }
  };

  const handleShowModal = () => {
    setAnnonceFormData({
      titre: '',
      description: '',
      image: '',
      dateDebut: '',
      dateExpiration: ''
    });
    setShowAnnonceModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnonceFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (base64String.length > 10000000) { // 10MB limit
          toast.error("L'image est trop volumineuse. Veuillez choisir une image plus petite.");
          return;
        }
        setAnnonceFormData(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateAnnonce(annonceFormData);
  };

  const fetchNotifications = async () => {
    try {
      const response = await ApiNotificationService.getAllNotifications();
      console.log('Notifications fetched:', response); // Ajoutez ce log pour vérifier la réponse
      setNotifications(response);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCreateNotification = async (e) => {
    e.preventDefault();
    try {
      await ApiNotificationService.createNotification({ message: notificationMessage });
      addNotification({ message: notificationMessage });
      toast.success('Notification créée avec succès');
      setNotificationMessage('');
      setShowCreateForm(false);
      fetchNotifications();
    } catch (error) {
      console.error('Error creating notification:', error);
      toast.error('Erreur lors de la création de la notification');
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) {
      const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké
      console.log(token); // Vérifiez que le token est bien récupéré
      try {
        await ApiNotificationService.deleteNotification(notificationId);
        fetchNotifications(); // Rafraîchir la liste des notifications
        toast.success('Notification supprimée avec succès');
      } catch (error) {
        console.error('Error deleting notification:', error);
        toast.error('Erreur lors de la suppression de la notification');
      }
    }
  };

  return (
    <StyledDashboard>
      <ToastContainer />
      <Container fluid>
        <Row>
          <StyledSidebar md={2}>
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </StyledSidebar>
          
          <StyledContent md={10}>
            {activeTab === 'overview' && (
              <AdminOverview stats={stats} />
            )}
            {activeTab === 'users' && (
              <AdminUsers 
                users={users}
                onDelete={handleDeleteUser}
                onEdit={handleEditUser}
                onCreate={() => setShowModal(true)}
              />
            )}
            {activeTab === 'cars' && (
              <AdminCars 
                cars={cars}
                onDelete={handleDeleteCar}
                onEdit={handleEditCar}
              />
            )}
            {activeTab === 'sales' && <AdminSales />}
            {activeTab === 'settings' && <AdminSettings />}
            {activeTab === 'experts' && (
              <AdminExperts 
                experts={experts}
                onDelete={handleDeleteExpert}
                onEdit={handleEditExpert}
              />
            )}
            {activeTab === 'expert-requests' && (
              <AdminExpertRequests 
                requests={expertRequests}
                onApprove={handleApproveExpert}
                onReject={handleRejectExpert}
              />
            )}
            {activeTab === 'annonces' && (
              <>
                <AdminAnnonces 
                  annonces={annonces}
                  onDelete={handleDeleteAnnonce}
                  onEdit={handleEditAnnonce}
                  onCreate={handleCreateAnnonce}
                />
                {annonces && annonces.length > 0 && (
                  <div className="mt-4">
                    <AnnonceCarousel 
                      annonces={annonces}
                      autoplay={true}
                      interval={5000}
                    />
                  </div>
                )}
              </>
            )}
            {activeTab === 'promoted-cars' && <AdminPromotedCars />}
            {activeTab === 'notifications' && (
              <div>
                <h2 style={{ marginBottom: '20px' }}>Notifications</h2>
                <Button 
                  variant="primary" 
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  style={{ marginBottom: '20px' }}
                >
                  {showCreateForm ? 'Annuler' : 'Ajouter une Notification'}
                </Button>

                {showCreateForm && (
                  <Card className="mb-3 shadow">
                    <Card.Body>
                      <Form onSubmit={handleCreateNotification}>
                        <Form.Group controlId="formNotificationMessage">
                          <Form.Label>Message de la Notification</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Entrez le message de la notification"
                            value={notificationMessage}
                            onChange={(e) => setNotificationMessage(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Créer la Notification
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                )}

                <Card className="shadow">
                  <Card.Header>Liste des Notifications</Card.Header>
                  <ListGroup variant="flush">
                    {notifications.map(notification => (
                      <ListGroup.Item key={notification.id} className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <span className="me-2">
                            <FaBell />
                          </span>
                          <span>{notification.message}</span>
                          <span className="text-muted ms-3">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <Button variant="danger" onClick={() => handleDeleteNotification(notification.id)}>
                          <FaTrash />
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              </div>
            )}
          </StyledContent>
        </Row>

        <StyledModal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedUser ? 'Edit User' : 'Add New User'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add your form components here */}
          </Modal.Body>
        </StyledModal>

        <StyledModal 
          show={showAnnonceModal} 
          onHide={() => setShowAnnonceModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedAnnonce ? 'Modifier l\'annonce' : 'Créer une nouvelle annonce'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formTitre">
                <Form.Label>Titre de l'annonce</Form.Label>
                <Form.Control
                  type="text"
                  name="titre"
                  placeholder="Entrez le titre"
                  value={annonceFormData.titre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Décrivez votre annonce"
                  value={annonceFormData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!selectedAnnonce}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formDateDebut">
                <Form.Label>Date de début</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dateDebut"
                  value={annonceFormData.dateDebut}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formDateExpiration">
                <Form.Label>Date d'expiration</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dateExpiration"
                  value={annonceFormData.dateExpiration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <FormActions>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setShowAnnonceModal(false)}
                >
                  Annuler
                </Button>
                <Button variant="primary" type="submit">
                  {selectedAnnonce ? 'Mettre à jour' : 'Créer l\'annonce'}
                </Button>
              </FormActions>
            </Form>
          </Modal.Body>
        </StyledModal>
      </Container>
    </StyledDashboard>
  );
};

export default AdminDashboard;