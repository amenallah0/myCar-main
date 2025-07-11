import { API_CONFIG, getTunPlateUrl } from '../config/apiConfig';

const TunPlateService = {
    /**
     * Ajoute une voiture avec floutage automatique des plaques d'immatriculation
     * @param {number} userId - ID de l'utilisateur
     * @param {Object} car - Données de la voiture
     * @param {File[]} files - Fichiers d'images
     * @returns {Promise} Réponse du serveur
     */
    addCarWithBlurredPlates: async (userId, car, files) => {
        try {
            // Créer FormData pour l'envoi au service TunPlateRemover
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('car', JSON.stringify(car));
            
            // Ajouter les fichiers images
            files.forEach((file) => {
                formData.append('files', file);
            });

            console.log(`🚗 Envoi de ${files.length} images au service TunPlateRemover pour traitement...`);

            // Envoi au service TunPlateRemover qui va traiter les images et les transférer au backend
            const response = await fetch(getTunPlateUrl(API_CONFIG.ENDPOINTS.TUNPLATE_UPLOAD_CAR), {
                method: 'POST',
                body: formData,
                // Note: ne pas définir Content-Type pour FormData, le navigateur le fait automatiquement
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Erreur lors du traitement des images: ${response.status} - ${errorData}`);
            }

            const result = await response.json();
            console.log('✅ Réponse du service TunPlateRemover:', result);
            
            // Le service TunPlateRemover a maintenant transféré les images traitées au backend principal
            // La réponse contient les détails de l'opération
            return {
                success: true,
                message: result.message,
                processed: true,
                mainApiResponse: result.main_api_response
            };

        } catch (error) {
            console.error('❌ Erreur dans TunPlateService.addCarWithBlurredPlates:', error);
            throw error;
        }
    },

    /**
     * Vérifie si le service TunPlateRemover est disponible
     * @returns {Promise<boolean>} True si le service est disponible
     */
    checkServiceAvailability: async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 secondes de timeout

            const response = await fetch(`${API_CONFIG.TUNPLATE_URL}/health`, {
                method: 'GET',
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            
            if (response.ok) {
                const data = await response.json();
                console.log('🟢 Service TunPlateRemover disponible:', data);
                return true;
            }
            return false;
            
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn('⏰ Timeout lors de la vérification du service TunPlateRemover');
            } else {
                console.warn('🔴 Service TunPlateRemover non disponible:', error.message);
            }
            return false;
        }
    }
};

export default TunPlateService;
