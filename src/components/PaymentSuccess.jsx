import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Alert } from 'react-bootstrap';
import ApiCarService from '../services/apiCarServices';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updatePromotion = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const carId = params.get('carId');
        
        console.log('CarId from URL:', carId); // Log pour debug

        if (!carId) {
          toast.error("ID de voiture non trouvé dans l'URL");
          return;
        }

        // Convertir en nombre et vérifier que c'est un ID valide
        const numericCarId = parseInt(carId, 10);
        if (isNaN(numericCarId)) {
          toast.error("ID de voiture invalide");
          return;
        }

        console.log('Sending update request for car:', numericCarId); // Log pour debug
        const result = await ApiCarService.updatePromotionStatus(numericCarId, true);
        console.log('Update result:', result); // Log pour debug

        if (result) {
          toast.success("Votre annonce a été promue avec succès!");
        } else {
          toast.error("Erreur lors de la promotion de l'annonce");
        }
      } catch (error) {
        console.error('Error in updatePromotion:', error);
        toast.error("Erreur lors de la mise à jour du statut de promotion");
      } finally {
        // Attendre un peu plus longtemps pour voir les toasts
        setTimeout(() => {
          navigate('/profile/:username');
        }, 3000);
      }
    };

    updatePromotion();
  }, [location, navigate]);

  return (
    <Container className="mt-5">
      <Alert variant="success">
        <Alert.Heading>Paiement réussi !</Alert.Heading>
        <p>
          Traitement de votre promotion en cours...
          Vous serez redirigé vers votre profil dans quelques secondes.
        </p>
      </Alert>
    </Container>
  );
};

export default PaymentSuccess;
