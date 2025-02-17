// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Nav, Modal } from 'react-bootstrap';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  padding: 30px;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
  
  .modal-header {
    background: #f8f9fa;
    border-radius: 12px 12px 0 0;
  }
`;

const AdminDashboard = () => {
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
    salesGrowth: 0,
    activeListings: 0,
    listingGrowth: 0
  });

  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [expertRequests, setExpertRequests] = useState([]);

  useEffect(() => {
    console.log('Fetching data...');
    fetchUsers();
    fetchCars();
    fetchExperts();
    fetchExpertRequests();
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
      salesGrowth: 0, // Implement sales growth calculation
      activeListings: cars.filter(car => car.status === 'AVAILABLE').length,
      listingGrowth: 0 // Implement listings growth calculation
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
      // Trouver la demande d'expert correspondante
      const request = expertRequests.find(req => req.id === requestId);
      if (!request) {
        toast.error('Demande non trouvée');
        return;
      }

      // Appeler l'API pour approuver la demande
      const response = await ApiExpertRequestService.approveRequest(requestId);

      // Créer un nouvel expert avec le format correct
      const newExpert = {
        id: request.id,
        nom: request.username.split(' ')[0] || '', // Supposant que le username contient "nom prénom"
        prenom: request.username.split(' ')[1] || '',
        specialite: request.specialization,
        email: request.email,
        telephone: request.phone || '',
        status: 'ACTIVE'
      };

      // Mettre à jour le state des experts immédiatement
      setExperts(prevExperts => {
        const updatedExperts = [...prevExperts, newExpert];
        console.log('Updated experts list:', updatedExperts); // Pour le débogage
        return updatedExperts;
      });
      
      // Retirer la demande approuvée de la liste des demandes
      setExpertRequests(prevRequests => 
        prevRequests.filter(req => req.id !== requestId)
      );

      // Rafraîchir les données depuis le backend
      await Promise.all([
        fetchExperts(),
        fetchExpertRequests()
      ]);

      toast.success('Expert approuvé avec succès');
    } catch (error) {
      console.error('Error approving expert:', error);
      toast.error('Erreur lors de l\'approbation');
    }
  };

  const handleRejectExpert = async (requestId) => {
    try {
      await ApiExpertRequestService.rejectRequest(requestId);
      
      // Mettre à jour la liste des demandes en retirant celle qui vient d'être rejetée
      setExpertRequests(prevRequests => 
        prevRequests.filter(req => req.id !== requestId)
      );
      
      await fetchExpertRequests();
      toast.success('Demande rejetée avec succès');
    } catch (error) {
      console.error('Error rejecting expert:', error);
      toast.error('Erreur lors du rejet');
    }
  };

  return (
    <StyledDashboard>
      <Container fluid>
        <Row>
          <StyledSidebar md={2}>
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </StyledSidebar>
          
          <StyledContent md={10}>
            {activeTab === 'overview' && <AdminOverview stats={stats} />}
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
      </Container>
    </StyledDashboard>
  );
};

export default AdminDashboard;