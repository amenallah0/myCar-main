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
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ApiService from '../services/apiUserServices';
import ApiCarService from '../services/apiCarServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import ApiExpertRequestService from '../services/apiExpertRequestServices';

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
  const [editedUser, setEditedUser] = useState({});
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

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const userData = await ApiService.getUserById(userId);
          if (userData) {
            setUser(userData);
            setEditedUser(userData);
          } else {
            // Handle case where user data is not found
            toast.error('User data not found');
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Error loading user profile');
          navigate('/');
        }
      };

      fetchUserData();
    } else {
      // If no userId is present in context, redirect to login
      toast.error('Please login to view profile');
      navigate('/signin');
    }
  }, [userId, navigate]);

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
  const currentCars = user?.cars.slice(indexOfFirstCar, indexOfLastCar);

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section style={{ backgroundColor: '#eee', position: 'relative' }}>
      <Container className="py-5">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
              <Breadcrumb.Item>
                <a href="/">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>User Profile</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <Card.Body className="text-center">
                <Card.Img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-3 mt-3">{user.username}</p>
                <div className="d-flex justify-content-center mb-2">
                  <Button 
                    variant={user.role === 'EXPERT' ? 'success' : 'primary'} 
                    onClick={handleExpertiseButton}
                  >
                    {user.role === 'EXPERT' ? "Demandes D'expertise" : "Become an Expert"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="8">
            <Card className="mb-4">
              <Card.Body>
                {['username', 'email', 'phone', 'mobile', 'address'].map(
                  (field, index) => (
                    <React.Fragment key={index}>
                      <Row className="mb-3">
                        <Form.Label column sm="3">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Form.Label>
                        <Col sm="7">
                          {isEditing[field] ? (
                            <Form.Control
                              name={field}
                              value={editedUser[field]}
                              onChange={handleChange}
                              size="sm"
                            />
                          ) : (
                            <Form.Label className="text-muted">
                              {user[field] || `No ${field}`}
                            </Form.Label>
                          )}
                        </Col>
                        <Col
                          sm="2"
                          className="d-flex align-items-center justify-content-end"
                        >
                          {isEditing[field] ? (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleSaveClick(field)}
                              className="btn-block"
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleEditClick(field)}
                              className="btn-block"
                            >
                              Edit
                            </Button>
                          )}
                        </Col>
                      </Row>
                      {index < 4 && <hr />}
                    </React.Fragment>
                  )
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {currentCars.length > 0 ? (
            currentCars.map((car, index) => (
              <Col lg="6" key={car.id}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Text>Car Model: {car.model}</Card.Text>
                    <Card.Text>Car Make: {car.make}</Card.Text>
                    {car.images && car.images.length > 0 && car.images[0].filename ? (
                      <Card.Img
                        src={`http://localhost:8081/api/files/download/${car.images[0].filename}`}
                        alt={car.model}
                        className="img-fluid mb-2"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                      />
                    ) : (
                      <Card.Text>No Image Available</Card.Text>
                    )}
                    <div className="d-flex justify-content-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="me-2 btn-block"
                        onClick={() => fetchCarDetails(car.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteCar(car.id)}
                        className="btn-block"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card.Text>No cars found.</Card.Text>
            </Col>
          )}
        </Row>

        {/* Pagination */}
        {user.cars.length > carsPerPage && (
          <Row className="mt-2">
            <Col>
              <Pagination className="justify-content-center" size="sm">
                {[...Array(Math.ceil(user.cars.length / carsPerPage)).keys()].map(
                  (number) => (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentPage}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            </Col>
          </Row>
        )}
      </Container>

      {/* Expert Form Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="modal-blur-effect"
        style={{ marginTop: '70px' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Become an Expert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleExpertFormSubmit}>
            <Form.Group controlId="formSpecialization" className="mt-1">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={expertFormData.specialization}
                onChange={handleExpertFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formExperience" className="mt-1">
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={expertFormData.experience}
                onChange={handleExpertFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCurrentPosition" className="mt-1">
              <Form.Label>Current Position</Form.Label>
              <Form.Control
                type="text"
                name="currentPosition"
                value={expertFormData.currentPosition}
                onChange={handleExpertFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDiploma" className="mt-1">
              <Form.Label>Upload Diploma</Form.Label>
              <Form.Control
                type="file"
                name="diploma"
                onChange={handleExpertFormChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-1 btn-block">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </section>
  );
}
