import React, { useState } from 'react';
import { Modal, Form, Button, Table, Card } from 'react-bootstrap';
import ApiAnnonceService from '../../services/apiAnnonceServices';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 12px;
`;

const StyledTable = styled(Table)`
  margin-top: 20px;
  background-color: white;
  
  th {
    background-color: #f8f9fa;
    padding: 15px;
    font-weight: 600;
    color: #2c3e50;
  }
  
  td {
    vertical-align: middle;
    padding: 15px;
  }
`;

const ImagePreview = styled.img`
  width: 180px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ActionButton = styled(Button)`
  margin: 0 5px;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &.modify {
    background-color: #1a1a1a;
    border: none;
    color: white;
    
    &:hover {
      background-color: #333333;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
  }
  
  &.delete {
    background-color: #dc0000;
    border: none;
    color: white;
    
    &:hover {
      background-color: #ff0000;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(220,0,0,0.2);
    }
  }
`;

const AddButton = styled(Button)`
  background-color: #1a1a1a;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  color: white;
  
  &:hover {
    background-color: #333333;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  i {
    font-size: 1.2rem;
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }
`;

const Description = styled.div`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateCell = styled.div`
  color: #666;
  font-size: 14px;
`;

const initialFormState = {
    titre: '',
    description: '',
    image: '',
    dateDebut: new Date().toISOString().slice(0, 16),
    dateExpiration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
};

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

    const formatDateForDisplay = (date) => {
        if (!date) return 'Date non disponible';
        
        try {
            const dateObj = typeof date === 'string' ? new Date(date) :
                          Array.isArray(date) ? new Date(date[0], date[1] - 1, date[2], date[3] || 0, date[4] || 0) :
                          null;

            if (!dateObj || isNaN(dateObj)) return 'Date invalide';

            return dateObj.toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Erreur de format de date:', date, error);
            return 'Date invalide';
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                if (base64String.length > 100000000) {
                    alert("L'image est trop volumineuse. Veuillez choisir une image plus petite.");
                    return;
                }
                setFormData(prev => ({ ...prev, image: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
            alert("Une erreur est survenue lors de la sauvegarde de l'annonce");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData(initialFormState);
        setCurrentAnnonce(null);
    };

    return (
        <StyledCard>
            <Card.Body>
                <TableHeader>
                    <h2>Gestion des Annonces</h2>
                    <AddButton onClick={() => handleShow(null)}>
                        <i className="fas fa-plus"></i>
                        Nouvelle Annonce
                    </AddButton>
                </TableHeader>
                
                <StyledTable responsive hover>
                    <thead>
                        <tr>
                            <th style={{width: '200px'}}>Image</th>
                            <th style={{width: '150px'}}>Titre</th>
                            <th>Description</th>
                            <th style={{width: '150px'}}>Date de début</th>
                            <th style={{width: '150px'}}>Date d'expiration</th>
                            <th style={{width: '180px'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {annonces.map(annonce => (
                            <tr key={annonce.id}>
                                <td>
                                    <ImagePreview src={annonce.image} alt={annonce.titre} />
                                </td>
                                <td><strong>{annonce.titre}</strong></td>
                                <td>
                                    <Description>{annonce.description}</Description>
                                </td>
                                <td>
                                    <DateCell>{formatDateForDisplay(annonce.dateDebut)}</DateCell>
                                </td>
                                <td>
                                    <DateCell>{formatDateForDisplay(annonce.dateExpiration)}</DateCell>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <ActionButton 
                                            className="modify"
                                            size="sm"
                                            onClick={() => handleShow(annonce)}
                                        >
                                            <i className="fas fa-edit me-1"></i>
                                            Modifier
                                        </ActionButton>
                                        <ActionButton 
                                            className="delete"
                                            size="sm"
                                            onClick={() => onDelete(annonce.id)}
                                        >
                                            <i className="fas fa-trash-alt me-1"></i>
                                            Supprimer
                                        </ActionButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </Card.Body>

            <Modal show={showModal} onHide={handleCloseModal}>
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
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Annuler
                            </Button>
                            <Button variant="primary" type="submit">
                                {currentAnnonce ? 'Modifier' : 'Ajouter'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </StyledCard>
    );
};

export default AdminAnnonces; 