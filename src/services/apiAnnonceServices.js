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
        const token = localStorage.getItem('token'); // Assurez-vous que le token est valide
        console.log("Données envoyées pour créer l'annonce:", annonce); // Affichez les données de l'annonce
    
        try {
            const response = await axios.post(API_URL, annonce, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Réponse du serveur:", response.data); // Affichez la réponse du serveur
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de l\'annonce:', error.response ? error.response.data : error.message);
            throw error; // Relancer l'erreur pour la gérer ailleurs
        }
    },
    updateAnnonce: async (annonceId, annonce) => {
        const response = await axios.put(`${API_URL}/${annonceId}`, annonce);
        return response.data;
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