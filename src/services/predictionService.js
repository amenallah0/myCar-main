const API_URL = 'http://localhost:5001'; // URL de votre API Flask

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

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      throw error;
    }
  }
};

export default PredictionService;