import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import ApiAnnonceService from '../../services/apiAnnonceServices';

const AdminAnnonces = ({ annonces, onDelete, onEdit, onCreate }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentAnnonce, setCurrentAnnonce] = useState(null);
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        image: '',
        dateDebut: '',
        dateExpiration: ''
    });

    const handleShow = (annonce) => {
        if (annonce) {
            setCurrentAnnonce(annonce);
            setFormData(annonce); // Remplir le formulaire avec les données de l'annonce à modifier
        } else {
            setCurrentAnnonce(null);
            setFormData({
                titre: '',
                description: '',
                image: '',
                dateDebut: '',
                dateExpiration: ''
            });
        }
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const formatDate = (date) => {
        const isoDate = new Date(date).toISOString(); // Convertit en format ISO 8601
        return isoDate.split('.')[0]; // Supprime les millisecondes
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                // Vérifiez la taille de l'image
                if (base64String.length > 100000000) { // Par exemple, 1 Mo
                    alert("L'image est trop volumineuse. Veuillez choisir une image plus petite.");
                } else {
                    setFormData((prev) => ({ ...prev, image: base64String }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const annonceData = {
                titre: formData.titre,
                description: formData.description,
                image: formData.image,
                dateDebut: formatDate(formData.dateDebut),
                dateExpiration: formatDate(formData.dateExpiration)
            };
            console.log("Données envoyées pour créer l'annonce:", annonceData); // Pour déboguer
            const createdAnnonce = await ApiAnnonceService.createAnnonce(annonceData);
            console.log("Annonce créée avec succès:", createdAnnonce);
            // Optionnel : Réinitialisez le formulaire ou redirigez l'utilisateur
        } catch (error) {
            console.error("Erreur lors de la création de l'annonce:", error);
        }
    };

    return (
        <div>
            <h2>Annonces</h2>
            <button onClick={() => handleShow()}>Ajouter une annonce</button>
            <ul>
                {annonces.map(annonce => (
                    <li key={annonce.id}>
                        <h3>{annonce.titre}</h3>
                        <p>{annonce.description}</p>
                        <img src={annonce.image} alt={annonce.titre} />
                        <p>Date de début: {annonce.dateDebut}</p>
                        <p>Date d'expiration: {annonce.dateExpiration}</p>
                        <button onClick={() => handleShow(annonce)}>Modifier</button>
                        <button onClick={() => onDelete(annonce.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            {/* Modal pour ajouter ou modifier une annonce */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentAnnonce ? 'Modifier l\'Annonce' : 'Ajouter une Annonce'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitre">
                            <Form.Label>Titre</Form.Label>
                            <Form.Control
                                type="text"
                                name="titre"
                                value={formData.titre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDateDebut">
                            <Form.Label>Date de début</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dateDebut"
                                value={formData.dateDebut}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDateExpiration">
                            <Form.Label>Date d'expiration</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dateExpiration"
                                value={formData.dateExpiration}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {currentAnnonce ? 'Modifier' : 'Ajouter'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminAnnonces; 