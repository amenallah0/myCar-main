import TokenService from './TokenService';

const FLOUCI_API_URL = "https://developers.flouci.com/api/generate_payment";

const generatePaymentLink = async (amount, userId, annonceId) => {
  try {
    console.log('Sending payment request with:', { amount, userId, annonceId });
    
    const token = TokenService.getLocalAccessToken();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payments/generate-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: amount,
        trackingId: `promo_${userId}_${annonceId}_${Date.now()}`,
        successUrl: `${process.env.REACT_APP_FRONTEND_URL || window.location.origin}/payment-success?carId=${annonceId}`,
        failUrl: `${process.env.REACT_APP_FRONTEND_URL || window.location.origin}/payment-failed`
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
