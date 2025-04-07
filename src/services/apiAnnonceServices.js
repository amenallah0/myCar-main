import axios from 'axios';

const API_URL = 'http://localhost:8081/api/annonces'; // Remplacez par votre URL d'API

const ApiAnnonceService = {
    getAllAnnonces: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching annonces:', error.response ? error.response.data : error.message);
            throw error; // Relancer l'erreur pour la gérer ailleurs
        }
    },
    createAnnonce: async (annonce) => {
        const token = localStorage.getItem('token');
        
        // Vérification des données
        if (!annonce || typeof annonce !== 'object') {
            throw new Error('Les données de l\'annonce sont invalides');
        }

        // Vérification des dates
        if (!annonce.dateDebut || !annonce.dateExpiration) {
            throw new Error('Les dates de début et d\'expiration sont requises');
        }

        try {
            // Formatage des dates
            const formattedAnnonce = {
                ...annonce,
                dateDebut: annonce.dateDebut ? new Date(annonce.dateDebut).toISOString() : null,
                dateExpiration: annonce.dateExpiration ? new Date(annonce.dateExpiration).toISOString() : null
            };

            const response = await axios.post(API_URL, formattedAnnonce, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de l\'annonce:', error);
            throw error;
        }
    },
    updateAnnonce: async (annonceId, annonce) => {
        const token = localStorage.getItem('token');
        
        // Convertir les dates en format ISO pour le backend
        const formattedAnnonce = {
            ...annonce,
            dateDebut: annonce.dateDebut ? new Date(annonce.dateDebut).toISOString() : null,
            dateExpiration: annonce.dateExpiration ? new Date(annonce.dateExpiration).toISOString() : null
        };

        try {
            const response = await axios.put(`${API_URL}/${annonceId}`, formattedAnnonce, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'annonce:', error);
            throw error;
        }
    },
    deleteAnnonce: async (annonceId) => {
        await axios.delete(`${API_URL}/${annonceId}`);
    },
    getAnnonces: async () => {
        try {
            const response = await axios.get(API_URL); // Pas d'en-tête d'authentification
            return response.data; // Retourne les données des annonces
        } catch (error) {
            console.error('Erreur lors de la récupération des annonces:', error);
            throw error;
        }
    },
};

export default ApiAnnonceService; 