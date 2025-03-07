import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Alert } from 'react-bootstrap';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Mettre à jour le statut de la promotion dans votre base de données
    toast.success("Paiement réussi ! Votre annonce sera promue sous peu.");
    setTimeout(() => {
      navigate('/profile/:username');
    }, 2000);
  }, [navigate]);

  return (
    <Container className="mt-5">
      <Alert variant="success">
        <Alert.Heading>Paiement réussi !</Alert.Heading>
        <p>
          Votre paiement a été traité avec succès. Votre annonce sera promue dans les plus brefs délais.
          Vous allez être redirigé vers votre profil dans quelques secondes...
        </p>
      </Alert>
    </Container>
  );
};

export default PaymentSuccess;
