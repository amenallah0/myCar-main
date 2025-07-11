import { API_CONFIG, getCarPriceApiUrl } from '../config/apiConfig';

const PredictionService = {
  getPredictedPrice: async (carData) => {
    try {
      // Convertir la condition en valeur numérique
      let conditionValue = 5; // valeur par défaut
      if (typeof carData.condition === 'string') {
        switch(carData.condition.toLowerCase()) {
          case 'excellent': conditionValue = 9; break;
          case 'very good': conditionValue = 7; break;
          case 'good': conditionValue = 5; break;
          case 'fair': conditionValue = 3; break;
          case 'poor': conditionValue = 1; break;
          default: conditionValue = 5;
        }
      }

      const response = await fetch(getCarPriceApiUrl(API_CONFIG.ENDPOINTS.CAR_PRICE_PREDICT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          year: carData.year,
          make: carData.make,
          model: carData.model,
          mileage: carData.mileage,
          condition: conditionValue
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la prédiction');
      }
      
      const data = await response.json();
      return data.predicted_price;
    } catch (error) {
      console.error('Error predicting price:', error);
      console.error('API URL used:', getCarPriceApiUrl(API_CONFIG.ENDPOINTS.CAR_PRICE_PREDICT));
      console.error('Car data sent:', carData);
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Impossible de contacter le serveur de prédiction. Vérifiez votre connexion internet.');
      }
      
      throw error;
    }
  }
};

export default PredictionService;