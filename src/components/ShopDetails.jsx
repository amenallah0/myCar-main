import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiCarService from "../services/apiCarServices";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { motion } from "framer-motion";
import { FaShoppingCart, FaPhoneAlt, FaRegHeart, FaShare } from 'react-icons/fa';
import ExpertContactForm from './ExpertContactForm';
import PredictionService from "./../services/predictionService";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ReviewService from '../services/ReviewService';
import { useUser } from '../contexts/userContext';

const ReviewForm = ({ show, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    userName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
    setFormData({ rating: 5, comment: '', userName: '' });
  };

  const { user } = useUser();

  if (!show) return null;

  return (
    <div className="review-form-modal">
      <div className="review-form-content">
        <div className="review-form-header">
          <h3>Ajouter un avis</h3>
          <button className="close-btn" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Votre nom</label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData({...formData, userName: e.target.value})}
              required
              placeholder="Entrez votre nom"
            />
          </div>
          <div className="form-group">
            <label>Note</label>
            <div className="rating-input">
              {[5, 4, 3, 2, 1].map((star) => (
                <i
                  key={star}
                  className={`fas fa-star ${formData.rating >= star ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, rating: star})}
                ></i>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Votre commentaire</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              required
              placeholder="Partagez votre expérience..."
              rows="4"
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Annuler
            </button>
            {user ? (
              <button type="submit" className="submit-btn">
                Publier
              </button>
            ) : (
              <p>Connectez-vous pour ajouter un avis</p>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        .review-form-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .review-form-content {
          background: white;
          border-radius: 15px;
          padding: 25px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .review-form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .review-form-header h3 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.5rem;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          color: #666;
          cursor: pointer;
          padding: 5px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #2c3e50;
          font-weight: 600;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #E8092E;
          outline: none;
          box-shadow: 0 0 0 2px rgba(232, 9, 46, 0.1);
        }

        .rating-input {
          display: flex;
          flex-direction: row-reverse;
          gap: 10px;
        }

        .rating-input i {
          font-size: 1.5rem;
          color: #ddd;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .rating-input i.active {
          color: #ffd700;
        }

        .rating-input i:hover,
        .rating-input i:hover ~ i {
          color: #ffd700;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          margin-top: 25px;
        }

        .cancel-btn,
        .submit-btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn {
          background: #f8f9fa;
          border: 1px solid #ddd;
          color: #666;
        }

        .submit-btn {
          background: #E8092E;
          border: none;
          color: white;
        }

        .cancel-btn:hover {
          background: #e9ecef;
        }

        .submit-btn:hover {
          background: #c7082a;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .review-form-content {
            width: 95%;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

const ShopDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('features');
  const [showExpertForm, setShowExpertForm] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: ''
  });
  const [reviews, setReviews] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiCarService.getCarById(id);
        setCar(response);
        await loadReviews();
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  const getPrediction = async () => {
    try {
      const predictionData = {
        make: car.make,
        model: car.model,
        year: parseInt(car.year),
        mileage: parseFloat(car.mileage),
        condition: car.condition || 'good',
      };
      
      console.log('Sending prediction data:', predictionData);
      
      const price = await PredictionService.getPredictedPrice(predictionData);
      setPredictedPrice(price);
    } catch (error) {
      console.error("Erreur lors de l'estimation:", error);
      toast.error("Erreur lors de l'estimation du prix");
    }
  };

  const loadReviews = async () => {
    try {
      console.log('Loading reviews for car:', id);
      const reviews = await ReviewService.getReviewsByCar(id);
      console.log('Received reviews:', reviews);
      setReviews(reviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      if (!user) {
        console.error('User must be logged in to submit a review');
        return;
      }

      const review = {
        carId: id,
        userId: user.id,
        userName: user.username || user.name,
        rating: reviewData.rating,
        comment: reviewData.comment
      };

      console.log('Sending review data:', review);

      const response = await ReviewService.addReview(review);
      console.log('Review submitted successfully:', response);
      
      await loadReviews();
      
      setShowReviewForm(false);
      
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!car) return <div>Error loading car details.</div>;


  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'features':
        return (
          <div className="features-content">
            <div className="features-sections">
              {/* Performance */}
              <div className="features-section">
                <h3><i className="fas fa-tachometer-alt"></i> Performance</h3>
                <div className="features-grid">
                  <div className="feature-card">
                    <span className="feature-label">Puissance</span>
                    <span className="feature-value">{car.powerRating} HP</span>
                  </div>
                  <div className="feature-card">
                    <span className="feature-label">Vitesse Maximum</span>
                    <span className="feature-value">{car.maximumSpeed} km/h</span>
                  </div>
                  <div className="feature-card">
                    <span className="feature-label">Kilométrage</span>
                    <span className="feature-value">{car.mileage} km</span>
                  </div>
                </div>
              </div>

              {/* Caractéristiques */}
              <div className="features-section">
                <h3><i className="fas fa-car"></i> Caractéristiques</h3>
                <div className="features-grid">
                  <div className="feature-card">
                    <span className="feature-label">Marque</span>
                    <span className="feature-value">{car.make}</span>
                  </div>
                  <div className="feature-card">
                    <span className="feature-label">Modèle</span>
                    <span className="feature-value">{car.model}</span>
                  </div>
                  <div className="feature-card">
                    <span className="feature-label">Année</span>
                    <span className="feature-value">{car.year}</span>
                  </div>
                  <div className="feature-card">
                    <span className="feature-label">Couleur</span>
                    <span className="feature-value">{car.color}</span>
                  </div>
                  <div className="feature-card">
                    <span className="feature-label">Nombre de portes</span>
                    <span className="feature-value">{car.numberOfDoors}</span>
                  </div>
                </div>
              </div>

              {/* Carburant */}
              <div className="features-section">
                <h3><i className="fas fa-gas-pump"></i> Carburant</h3>
                <div className="features-grid">
                  <div className="feature-card">
                    <span className="feature-label">Capacité du réservoir</span>
                    <span className="feature-value">{car.fuelTankCapacity}L</span>
                  </div>
                  <div className="feature-card">
                    <span className="feature-label">Type de carburant</span>
                    <span className="feature-value">{car.fuelType || 'Non spécifié'}</span>
                  </div>
                </div>
              </div>

              {/* Prix et Disponibilité */}
              <div className="features-section">
                <h3><i className="fas fa-tag"></i> Prix et Disponibilité</h3>
                <div className="features-grid">
                  <div className="feature-card highlight">
                    <span className="feature-label">Prix actuel</span>
                    <span className="feature-value price">{car.price} TND</span>
                  </div>
                  {car.previousPrice && (
                    <div className="feature-card">
                      <span className="feature-label">Ancien prix</span>
                      <span className="feature-value previous-price">{car.previousPrice} TND</span>
                    </div>
                  )}
                  <div className="feature-card">
                    <span className="feature-label">Statut</span>
                    <span className={`feature-value status ${car.available ? 'available' : 'unavailable'}`}>
                      {car.available ? 'Disponible' : 'Non disponible'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Options */}
              {car.options && (
                <div className="features-section">
                  <h3><i className="fas fa-list-ul"></i> Options</h3>
                  <div className="options-grid">
                    {car.options.split(',').map((option, index) => (
                      <div key={index} className="option-card">
                        <i className="fas fa-check-circle"></i>
                        <span>{option.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="reviews-content">
            <div className="reviews-header">
              <h2>Avis des clients</h2>
              {user ? (
                <button 
                  className="add-review-btn"
                  onClick={() => setShowReviewForm(true)}
                >
                  <i className="fas fa-plus"></i> Ajouter un avis
                </button>
              ) : (
                <p>Connectez-vous pour ajouter un avis</p>
              )}
            </div>

            <div className="reviews-list">
              {renderReviews()}
            </div>

            <style jsx>{`
              .reviews-content {
                padding: 30px 0;
              }

              .reviews-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
              }

              .reviews-header h2 {
                font-size: 1.8rem;
                color: #2c3e50;
                margin: 0;
              }

              .add-review-btn {
                background: #E8092E;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
              }

              .add-review-btn:hover {
                background: #c7082a;
                transform: translateY(-2px);
              }

              .reviews-list {
                display: flex;
                flex-direction: column;
                gap: 20px;
              }

              .review-card {
                background: white;
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                transition: all 0.3s ease;
              }

              .review-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.1);
              }

              .review-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
              }

              .reviewer-info {
                display: flex;
                align-items: center;
                gap: 15px;
              }

              .reviewer-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 12px;
                border: 2px solid #fff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }

              .reviewer-details h4 {
                margin: 0 0 5px 0;
                color: #2c3e50;
                font-size: 1.1rem;
              }

              .rating {
                display: flex;
                gap: 3px;
              }

              .rating i {
                color: #ffd700;
                font-size: 0.9rem;
              }

              .review-date {
                color: #666;
                font-size: 0.9rem;
              }

              .review-text {
                color: #2c3e50;
                line-height: 1.6;
                margin: 0;
              }

              @media (max-width: 768px) {
                .reviews-header {
                  flex-direction: column;
                  gap: 15px;
                  align-items: flex-start;
                }

                .reviews-header h2 {
                  font-size: 1.5rem;
                }

                .add-review-btn {
                  width: 100%;
                  justify-content: center;
                }

                .review-header {
                  flex-direction: column;
                  gap: 10px;
                }

                .review-date {
                  margin-left: 55px;
                }

                .reviewer-avatar {
                  width: 32px;
                  height: 32px;
                }
              }
            `}</style>
          </div>
        );
      default:
        return (
          <div className="features-content">
            {/* Redirection par défaut vers features */}
            {renderTabContent('features')}
          </div>
        );
    }
  };

  const renderReviews = () => {
    return reviews.map((review) => (
        <div key={review.id} className="review-card">
            <div className="review-header">
                <div className="reviewer-info">
                    <img 
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt={`${review.userName}'s avatar`}
                        className="reviewer-avatar"
                    />
                    <div className="reviewer-details">
                        <h4>{review.userName}</h4>
                        <div className="rating">
                            {[...Array(5)].map((_, index) => (
                                <span 
                                    key={index}
                                    className={`star ${index < review.rating ? 'filled' : ''}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="review-date">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
            <p className="review-comment">{review.comment}</p>
        </div>
    ));
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="product-details-section"
    >
      <div className="container">
        <div className="row gx-5">
          {/* Gallery Section */}
          <div className="col-lg-7">
            <div className="gallery-wrapper">
              <Carousel 
                showThumbs={false} 
                infiniteLoop 
                autoPlay 
                selectedItem={selectedImageIndex}
                className="main-carousel"
                showStatus={false}
                renderArrowPrev={(clickHandler, hasPrev) => (
                  <button
                    className="carousel-arrow prev"
                    onClick={clickHandler}
                    disabled={!hasPrev}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                )}
                renderArrowNext={(clickHandler, hasNext) => (
                  <button
                    className="carousel-arrow next"
                    onClick={clickHandler}
                    disabled={!hasNext}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                )}
              >
                {car.images.map((image, index) => (
                  <div key={index} className="carousel-slide">
                    <img
                      src={`http://localhost:8081/api/files/download/${image.filename}`}
                      alt={`${car.make} ${car.model}`}
                    />
                  </div>
                ))}
              </Carousel>

              <div className="thumbnails-container">
                {car.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={`http://localhost:8081/api/files/download/${image.filename}`}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="col-lg-5">
            <div className="product-info">
              <div className="product-header">
                <h1 className="product-title">
                  {car.make} {car.model}
                  <span className="model-year">{car.year}</span>
                </h1>
                <div className="product-actions">
                  <button className="action-btn"><FaRegHeart /></button>
                  <button className="action-btn"><FaShare /></button>
                </div>
              </div>

              <div className="product-price">
                <span className="actual-price">{car.price} TND</span>
                <button 
                  className="estimate-button"
                  onClick={getPrediction}
                  disabled={isLoading}
                >
                  {isLoading ? 'Estimation en cours...' : 'Estimer le prix du marché'}
                </button>
                {predictedPrice && (
                  <div className="estimated-price-container">
                    <div className="estimated-price-header">
                      <span className="estimate-label">Prix estimé du marché</span>
                      <div className="estimate-badge">IA</div>
                    </div>
                    <div className="estimated-price-value">
                      {predictedPrice.toLocaleString()} TND
                    </div>
                    <div className="estimated-price-info">
                      <i className="fas fa-info-circle"></i>
                      <span>Basé sur l'analyse du marché actuel</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="key-features">
                <div className="feature-item">
                  <i className="fas fa-tachometer-alt"></i>
                  <span>{car.mileage} km</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-gas-pump"></i>
                  <span>{car.fuelTankCapacity}L</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-horse"></i>
                  <span>{car.powerRating} HP</span>
                </div>
              </div>

              <div className="product-actions-main">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-buy"
                >
                  <FaShoppingCart /> Buy Now
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-contact"
                  onClick={() => setShowExpertForm(true)}
                >
                  <FaPhoneAlt /> Contact Expert
                </motion.button>
              </div>

              <div className="specifications">
                <h3>Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Color</span>
                    <span className="spec-value">{car.color}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Max Speed</span>
                    <span className="spec-value">{car.maximumSpeed} km/h</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Doors</span>
                    <span className="spec-value">{car.numberOfDoors}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="details-tabs-section">
          <div className="tabs-wrapper">
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                Caractéristiques
              </button>
              <button 
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Avis
              </button>
            </div>
            <motion.div 
              className="tab-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={activeTab}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-details-section {
          padding: 60px 0;
          background: #f8f9fa;
        }

        .gallery-wrapper {
          background: white;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .main-carousel {
          border-radius: 15px;
          overflow: hidden;
        }

        .carousel-slide img {
          height: 500px;
          width: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .thumbnails-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 20px;
        }

        .thumbnail {
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .thumbnail.active {
          border-color: #E8092E;
        }

        .thumbnail img {
          width: 100%;
          height: 80px;
          object-fit: cover;
        }

        .product-info {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .product-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0;
        }

        .model-year {
          font-size: 1rem;
          color: #E8092E;
          margin-left: 10px;
        }

        .product-price {
          margin-bottom: 30px;
        }

        .actual-price {
          font-size: 2.5rem;
          font-weight: 700;
          color: #E8092E;
        }

        .estimate-button {
          display: block;
          width: 100%;
          margin-top: 15px;
          padding: 12px 20px;
          background: #2c3e50;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .estimate-button:hover {
          background: #34495e;
          transform: translateY(-2px);
        }

        .estimate-button:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }

        .estimated-price-container {
          margin-top: 20px;
          padding: 20px;
          background: linear-gradient(145deg, #f8f9fa, #ffffff);
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          border: 1px solid #e9ecef;
        }

        .estimated-price-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .estimate-label {
          font-size: 0.9rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .estimate-badge {
          background: #E8092E;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .estimated-price-value {
          font-size: 2rem;
          font-weight: 700;
          color: #28a745;
          margin: 10px 0;
        }

        .estimated-price-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #666;
          margin-top: 10px;
        }

        .estimated-price-info i {
          color: #E8092E;
        }

        .key-features {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          background: #f8f9fa;
          border-radius: 10px;
          font-size: 0.9rem;
        }

        .product-actions-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 30px;
        }

        .btn-buy, .btn-contact {
          padding: 15px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-buy {
          background: #E8092E;
          color: white;
        }

        .btn-contact {
          background: #2c3e50;
          color: white;
        }

        .specifications {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 20px;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-top: 15px;
        }

        .spec-item {
          display: flex;
          flex-direction: column;
        }

        .spec-label {
          font-size: 0.9rem;
          color: #666;
        }

        .spec-value {
          font-weight: 600;
          color: #2c3e50;
        }

        .details-tabs-section {
          margin-top: 50px;
        }

        .tabs-wrapper {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .tab-buttons {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .tab-btn {
          padding: 12px 24px;
          border: none;
          background: none;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          color: #E8092E;
        }

        .tab-btn.active {
          color: #E8092E;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #E8092E;
          transition: all 0.3s ease;
        }

        .tab-content {
          padding: 30px 0;
          min-height: 200px;
        }

        .features-content {
          padding: 20px 0;
        }

        .features-sections {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .features-section {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .features-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }

        .features-section h3 {
          color: #2c3e50;
          font-size: 1.4rem;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .features-section h3 i {
          color: #E8092E;
          font-size: 1.6rem;
          background: rgba(232, 9, 46, 0.1);
          padding: 10px;
          border-radius: 12px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        .feature-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 15px;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: #E8092E;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateX(5px);
          border-color: #eee;
          background: white;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-label {
          display: block;
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .feature-value {
          display: block;
          color: #2c3e50;
          font-weight: 600;
          font-size: 1.2rem;
          line-height: 1.4;
        }

        .feature-card.highlight {
          background: linear-gradient(135deg, #E8092E, #ff1f4d);
          position: relative;
          overflow: hidden;
        }

        .feature-card.highlight::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .feature-card.highlight:hover::after {
          opacity: 1;
        }

        .feature-card.highlight .feature-label,
        .feature-card.highlight .feature-value {
          color: white;
          position: relative;
          z-index: 1;
        }

        .feature-value.price {
          font-size: 1.8rem;
          font-weight: 700;
          background: -webkit-linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .feature-value.previous-price {
          text-decoration: line-through;
          color: #666;
          font-size: 1.1rem;
        }

        .feature-value.status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .feature-value.status.available {
          color: #28a745;
        }

        .feature-value.status.available::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #28a745;
          border-radius: 50%;
        }

        .feature-value.status.unavailable {
          color: #dc3545;
        }

        .feature-value.status.unavailable::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #dc3545;
          border-radius: 50%;
        }

        .feature-card:has(.status) {
          border-left: 4px solid;
          transition: all 0.3s ease;
        }

        .feature-card:has(.status.available) {
          border-left-color: #28a745;
          background: rgba(40, 167, 69, 0.1);
        }

        .feature-card:has(.status.unavailable) {
          border-left-color: #dc3545;
          background: rgba(220, 53, 69, 0.1);
        }

        .feature-card:has(.status):hover {
          transform: translateX(5px);
          background: white;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }

        .option-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: default;
        }

        .option-card i {
          color: #E8092E;
          font-size: 1.1rem;
          background: rgba(232, 9, 46, 0.1);
          padding: 8px;
          border-radius: 8px;
        }

        .option-card:hover {
          transform: translateX(5px);
          background: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .option-card span {
          font-size: 0.95rem;
          color: #2c3e50;
        }

        .reviews-content {
          text-align: center;
          color: #666;
          padding: 40px 0;
        }

        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 12px;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .review-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .review-header {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
        }

        .reviewer-details {
          display: flex;
          flex-direction: column;
        }

        .reviewer-details h4 {
          margin: 0;
          font-size: 16px;
          color: #333;
        }

        .rating {
          display: flex;
          gap: 2px;
          margin: 4px 0;
        }

        .star {
          color: #ddd;
          font-size: 18px;
        }

        .star.filled {
          color: #ffd700;
        }

        .review-date {
          font-size: 12px;
          color: #666;
        }

        .review-comment {
          margin: 0;
          color: #444;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .carousel-slide img {
            height: 300px;
          }

          .product-title {
            font-size: 1.8rem;
          }

          .product-actions-main {
            grid-template-columns: 1fr;
          }

          .specs-grid {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .tab-buttons {
            flex-wrap: wrap;
            justify-content: center;
          }

          .tab-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .options-grid {
            grid-template-columns: 1fr;
          }

          .feature-card {
            padding: 15px;
          }

          .feature-value {
            font-size: 1.1rem;
          }

          .feature-value.price {
            font-size: 1.5rem;
          }

          .features-section {
            padding: 20px;
          }

          .features-section h3 {
            font-size: 1.2rem;
          }

          .features-section h3 i {
            font-size: 1.3rem;
            padding: 8px;
          }

          .estimated-price-value {
            font-size: 1.5rem;
          }

          .estimate-button {
            padding: 10px 15px;
            font-size: 0.85rem;
          }

          .review-card {
            padding: 12px;
          }

          .reviewer-avatar {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>

      <ToastContainer />

      <ExpertContactForm 
        show={showExpertForm}
        handleClose={() => setShowExpertForm(false)}
        carId={car.id}
      />

      <ReviewForm 
        show={showReviewForm}
        handleClose={() => setShowReviewForm(false)}
        onSubmit={handleReviewSubmit}
      />
    </motion.section>
  );
};

export default ShopDetails;
