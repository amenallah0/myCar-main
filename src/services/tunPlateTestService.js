import { API_CONFIG } from '../config/apiConfig';

const TunPlateTestService = {
    /**
     * Test simple du floutage sans transfert vers l'API principale
     * @param {File[]} files - Fichiers d'images à tester
     * @returns {Promise} Résultat du test
     */
    testBlurOnly: async (files) => {
        try {
            const formData = new FormData();
            
            // Ajouter les fichiers images
            files.forEach((file) => {
                formData.append('files', file);
            });

            console.log(`🧪 Test de floutage sur ${files.length} images...`);

            // Envoyer au service de test
            const response = await fetch(`${API_CONFIG.TUNPLATE_URL}/api/test-blur`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Erreur lors du test de floutage: ${response.status} - ${errorData}`);
            }

            const result = await response.json();
            console.log('🧪 Résultat du test de floutage:', result);
            
            return result;

        } catch (error) {
            console.error('❌ Erreur dans le test de floutage:', error);
            throw error;
        }
    },

    /**
     * Test de l'endpoint process-image (votre code original qui fonctionne)
     * @param {string} imagePath - Chemin vers l'image à traiter
     * @returns {Promise} Résultat du traitement
     */
    testProcessImage: async (imagePath) => {
        try {
            console.log(`🧪 Test process-image sur: ${imagePath}`);

            const response = await fetch(`${API_CONFIG.TUNPLATE_URL}/api/process-image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file_path: imagePath }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Erreur lors du test process-image: ${response.status} - ${errorData}`);
            }

            const result = await response.json();
            console.log('🧪 Résultat du test process-image:', result);
            
            return result;

        } catch (error) {
            console.error('❌ Erreur dans le test process-image:', error);
            throw error;
        }
    }
};

export default TunPlateTestService;
