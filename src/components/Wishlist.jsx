import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaTrash, FaHeart, FaEye, FaShare, FaRegHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ApiCarService from "../services/apiCarServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const WishlistContainer = styled.div`
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
`;

const WishlistHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.6s ease-out;
  
  h2 {
    color: #2c3e50;
    position: relative;
    display: inline-block;
    margin-bottom: 1.5rem;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #3498db, #2ecc71);
      border-radius: 3px;
    }
  }
`;

const CardWrapper = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 180px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const CarImage = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  transition: transform 0.5s ease;
  
  ${ImageContainer}:hover & {
    transform: scale(1.1);
  }
`;

const QuickActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;

  ${ImageContainer}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ActionButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
  
  svg {
    color: #2c3e50;
    font-size: 1rem;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CarTitle = styled(Link)`
  color: #2c3e50;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  display: block;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #3498db;
  }
`;

const CarSpecs = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const Price = styled.div`
  font-size: 1.4rem;
  color: #2ecc71;
  font-weight: 700;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:before {
    content: 'TND';
    font-size: 0.8rem;
    font-weight: 500;
    color: #95a5a6;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &.view {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #2980b9, #2573a7);
      transform: translateY(-2px);
    }
  }
  
  &.remove {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #c0392b, #a93224);
      transform: translateY(-2px);
    }
  }
`;

const EmptyWishlist = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  max-width: 500px;
  margin: 0 auto;
  
  .icon {
    font-size: 4rem;
    color: #e74c3c;
    margin-bottom: 1.5rem;
    animation: pulse 2s infinite;
  }
  
  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  p {
    color: #7f8c8d;
    margin-bottom: 2rem;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
  }
`;

const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAndLoadFavorites = async () => {
      const storedFavorites = JSON.parse(localStorage.getItem("favoriteCars")) || [];
      const validFavorites = [];
      let removedCount = 0;

      for (const car of storedFavorites) {
        try {
          // Vérifier si la voiture existe encore dans la base de données
          await ApiCarService.getCarById(car.id);
          validFavorites.push(car);
        } catch (error) {
          // Si la voiture n'existe plus, on l'ignore
          console.log(`Car with ID ${car.id} no longer exists in database`);
          removedCount++;
        }
      }

      // Mettre à jour localStorage avec les voitures valides uniquement
      if (removedCount > 0) {
        localStorage.setItem("favoriteCars", JSON.stringify(validFavorites));
        toast.info(`${removedCount} véhicule${removedCount > 1 ? 's' : ''} supprimé${removedCount > 1 ? 's' : ''} de votre liste (plus disponible${removedCount > 1 ? 's' : ''})`);
      }

      setFavorites(validFavorites);
      setWishlistCount(validFavorites.length);
      setLoading(false);
    };

    validateAndLoadFavorites();
  }, []);

  const removeFromFavorites = (carId) => {
    const updatedFavorites = favorites.filter((car) => car.id !== carId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteCars", JSON.stringify(updatedFavorites));
    setWishlistCount(updatedFavorites.length);
    toast.success("Véhicule retiré de votre liste de souhaits");
  };

  const shareVehicle = (car) => {
    if (navigator.share) {
      navigator.share({
        title: `${car.make} ${car.model}`,
        text: `Découvrez cette ${car.make} ${car.model} sur MyCar!`,
        url: window.location.href
      });
    }
  };

  // Fonction pour gérer les erreurs d'images
  const handleImageError = (car) => {
    // Supprimer automatiquement la voiture de la wishlist si l'image ne se charge pas
    console.log(`Image failed to load for car ${car.id}, removing from wishlist`);
    removeFromFavorites(car.id);
  };

  if (loading) {
    return (
      <WishlistContainer>
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3">Vérification de votre liste de souhaits...</p>
          </div>
        </div>
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer>
      <div className="container">
        <WishlistHeader>
          <h2 className="display-5 fw-bold">
            Ma Liste de Souhaits
          </h2>
          <p className="text-muted">
            {wishlistCount} véhicule{wishlistCount !== 1 ? 's' : ''} dans votre liste
          </p>
        </WishlistHeader>

        <AnimatePresence>
          {favorites.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {favorites.map((car) => (
                <motion.div
                  key={car.id}
                  className="col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardWrapper>
                    <ImageContainer>
                      <CarImage
                        src={`http://localhost:8081/api/files/download/${car.images?.[0]?.filename}`}
                        alt={`${car.make} ${car.model}`}
                        onError={() => handleImageError(car)}
                      />
                      <QuickActions>
                        <ActionButton onClick={() => shareVehicle(car)}>
                          <FaShare />
                        </ActionButton>
                      </QuickActions>
                    </ImageContainer>
                    <CardBody>
                      <CarTitle to={`/shop-details/${car.id}`}>
                        {car.make} {car.model}
                      </CarTitle>
                      <CarSpecs>
                        <span>{car.year}</span>
                        <span>•</span>
                        <span>{car.mileage} km</span>
                      </CarSpecs>
                      <Price>{car.price.toFixed(2)}</Price>
                      <ButtonGroup>
                        <Button as={Link} to={`/shop-details/${car.id}`} className="view">
                          <FaEye /> Détails
                        </Button>
                        <Button
                          className="remove"
                          onClick={() => removeFromFavorites(car.id)}
                        >
                          <FaTrash /> Retirer
                        </Button>
                      </ButtonGroup>
                    </CardBody>
                  </CardWrapper>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyWishlist
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <FaRegHeart className="icon" />
              <h3>Votre liste de souhaits est vide</h3>
              <p>Explorez notre catalogue et ajoutez vos véhicules préférés !</p>
              <StyledLink to="/shop">
                Découvrir les véhicules
              </StyledLink>
            </EmptyWishlist>
          )}
        </AnimatePresence>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </WishlistContainer>
  );
};

export default Wishlist;
