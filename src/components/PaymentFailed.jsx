import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Alert, Button } from 'react-bootstrap';

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Le paiement a échoué. Veuillez réessayer.");
    setTimeout(() => {
        navigate('/profile/:username');
      }, 2000);
    }, [navigate]);

  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Échec du paiement</Alert.Heading>
        <p>
          Malheureusement, votre paiement n'a pas pu être traité. 
          Cela peut être dû à plusieurs raisons :
        </p>
        <ul>
          <li>Problème de connexion</li>
          <li>Carte refusée</li>
          <li>Informations de paiement incorrectes</li>
        </ul>
        <hr />
        <div className="d-flex justify-content-between">
          <Button variant="outline-danger" onClick={() => navigate('/profile')}>
            Retour au profil
          </Button>
          <Button variant="danger" onClick={() => navigate(-1)}>
            Réessayer
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default PaymentFailed; 