const FLOUCI_API_URL = "https://developers.flouci.com/api/generate_payment";

const generatePaymentLink = async (amount, userId, annonceId) => {
  try {
    console.log('Sending payment request with:', { amount, userId, annonceId });
    
    const response = await fetch('http://localhost:8081/api/payments/generate-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        trackingId: `promo_${userId}_${annonceId}_${Date.now()}`,
        successUrl: `http://localhost:3000/payment-success?carId=${annonceId}`,
        failUrl: 'http://localhost:3000/payment-failed'
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error response:', errorData);
      throw new Error(`Failed to generate payment link: ${errorData}`);
    }

    const data = await response.json();
    console.log('Payment link generated:', data);
    return data;
  } catch (error) {
    console.error('Error in generatePaymentLink:', error);
    throw error;
  }
};

export default {
  generatePaymentLink
};
