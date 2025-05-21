import React, { useState } from 'react';
import { Modal, Form, Button, Table, Card } from 'react-bootstrap';
import ApiAnnonceService from '../../services/apiAnnonceServices';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrashAlt, FaBullhorn } from 'react-icons/fa';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 1rem;
  margin-top: 0;
  overflow: hidden;
`;

const StyledTable = styled(Table)`
  background: white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border-radius: 15px;
  overflow: hidden;
  th {
    background: #1a237e;
    color: white;
    font-weight: 500;
    padding: 1rem;
    border: none;
  }
  td {
    vertical-align: middle;
    padding: 1rem;
    border-bottom: 1px solid #f0f2f5;
  }
  tbody tr {
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

const Container = styled.div`
  padding: 0;
  background-color: transparent;
  border-radius: 12px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  color: #1a237e;
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.h2`
  color: #1a237e;
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  &.primary {
    background: #1a237e;
    border: none;
    &:hover {
      background: #283593;
      transform: translateY(-2px);
    }
  }
  &.danger {
    background: #ff4757;
    border: none;
    color: white;
    &:hover {
      background: #e84118;
      transform: translateY(-2px);
    }
  }
`;

const ImagePreview = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const initialFormState = {
    titre: '',
    description: '',
    image: '',
    dateDebut: new Date().toISOString().slice(0, 16),
    dateExpiration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 24px 0;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

const AdminAnnonces = ({ annonces, onDelete, onEdit, onCreate }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentAnnonce, setCurrentAnnonce] = useState(null);
    const [formData, setFormData] = useState(initialFormState);

    const handleShow = (annonce) => {
        setCurrentAnnonce(annonce);
        setFormData(annonce || initialFormState);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("L'image est trop volumineuse. Veuillez choisir une image de moins de 5 Mo.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.dateDebut || !formData.dateExpiration) {
            alert("Les dates de début et d'expiration sont requises");
            return;
        }
        const annonceData = {
            titre: formData.titre,
            description: formData.description,
            image: formData.image,
            dateDebut: formData.dateDebut,
            dateExpiration: formData.dateExpiration
        };
        if (currentAnnonce) {
            await onEdit(currentAnnonce.id, annonceData);
        } else {
            await onCreate(annonceData);
        }
        setShowModal(false);
        setFormData(initialFormState);
        setCurrentAnnonce(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData(initialFormState);
        setCurrentAnnonce(null);
    };

    const formatDateForDisplay = (date) => {
        console.log("Valeur reçue pour date :", date);

        if (!date) {
            console.log("Date vide ou nulle !");
            return 'Non définie';
        }

        let dateObj = null;

        // Si c'est un tableau [YYYY, MM, DD, HH, mm]
        if (Array.isArray(date)) {
            // Attention : en JS, le mois commence à 0 (janvier = 0)
            const [year, month, day, hour = 0, minute = 0] = date;
            dateObj = new Date(year, month - 1, day, hour, minute);
            console.log("Date créée à partir du tableau :", dateObj);
        } else if (typeof date === 'string' && date.includes(' ')) {
            // Format SQL string
            let dateStr = date.replace(' ', 'T').split('.')[0];
            dateObj = new Date(dateStr);
            console.log("Date créée à partir de la string SQL :", dateObj);
        } else {
            // Autre format
            dateObj = new Date(date);
            console.log("Date créée à partir d'un autre format :", dateObj);
        }

        if (isNaN(dateObj.getTime())) {
            console.log("Date invalide après parsing !");
            return 'Non définie';
        }

        const formatted = dateObj.toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        console.log("Date formatée :", formatted);
        return formatted;
    };

    return (
        <Container>
            <Header>
                <Title>
                    <FaBullhorn size={24} />
                    Gestion des Annonces
                </Title>
                <ActionButton 
                    className="primary" 
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> NOUVELLE ANNONCE
                </ActionButton>
            </Header>

            <StyledCard>
                <Card.Body>
                    <StyledTable responsive hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date de début</th>
                                <th>Date d'expiration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {annonces.map(annonce => (
                                <tr key={annonce.id}>
                                    <td>
                                        {annonce.image && <ImagePreview src={annonce.image} alt={annonce.titre} />}
                                    </td>
                                    <td><strong>{annonce.titre}</strong></td>
                                    <td style={{ maxWidth: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {annonce.description}
                                    </td>
                                    <td>{formatDateForDisplay(annonce.dateDebut)}</td>
                                    <td>{formatDateForDisplay(annonce.dateExpiration)}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <ActionButton className="primary" size="sm" onClick={() => handleShow(annonce)}>
                                                <FaEdit /> Modifier
                                            </ActionButton>
                                            <ActionButton className="danger" size="sm" onClick={() => onDelete(annonce.id)}>
                                                <FaTrashAlt /> Supprimer
                                            </ActionButton>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </Card.Body>
            </StyledCard>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentAnnonce ? 'Modifier l\'Annonce' : 'Nouvelle Annonce'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTitre">
                            <Form.Label>Titre</Form.Label>
                            <Form.Control
                                type="text"
                                name="titre"
                                value={formData.titre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required={!currentAnnonce}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDateDebut">
                            <Form.Label>Date de début</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dateDebut"
                                value={formData.dateDebut}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDateExpiration">
                            <Form.Label>Date d'expiration</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dateExpiration"
                                value={formData.dateExpiration}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <FormActions>
                            <Button variant="outline-secondary" onClick={handleCloseModal}>
                                Annuler
                            </Button>
                            <Button variant="primary" type="submit">
                                {currentAnnonce ? 'Modifier' : 'Ajouter'}
                            </Button>
                        </FormActions>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminAnnonces; 