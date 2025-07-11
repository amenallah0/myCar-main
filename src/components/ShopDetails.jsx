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
import { getImageUrl } from '../config/apiConfig';
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
import TokenService from '../services/TokenService';

const ReviewForm = ({ show, handleClose, onSubmit }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    userName: user ? user.username : ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        userName: user.username
      }));
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
    setFormData({ rating: 5, comment: '', userName: '' });
  };

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
    const token = TokenService.getLocalAccessToken();
    console.log('Current auth token:', token);
    console.log('Current user state:', user);
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

      // Debug user information
      console.log('Current user state:', {
        id: user.id,
        username: user.username,
        role: user.role // Check if role exists
      });

      const review = {
        carId: id,
        userId: user.id,
        userName: user.username,
        rating: reviewData.rating,
        comment: reviewData.comment
      };

      console.log('Submitting review with data:', review);

      const response = await ReviewService.addReview(review);
      console.log('Review submission response:', response);
      
      await loadReviews();
      setShowReviewForm(false);
      toast.success('Avis ajouté avec succès');
      
    } catch (error) {
      console.error('Error submitting review:', error);
      console.error('Full error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error('Erreur lors de l\'ajout de l\'avis');
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
        console.log('Reviews data:', reviews);
        reviews.forEach(review => {
            console.log('Review date:', review.createdAt, 'formatted:', new Date(review.createdAt).toLocaleString('fr-FR'));
        });
    }
  }, [reviews]);

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
                            {review.createdAt ? (
                                new Date(review.createdAt).toLocaleString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                            ) : (
                                'Date non disponible'
                            )}
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
                      src={getImageUrl(image.filename)}
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
                      src={getImageUrl(image.filename)}
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

              <div className="product-price-section">
                <div className="price-main">
                <span className="actual-price">{car.price} TND</span>
                <button 
                    className="estimate-button-compact"
                  onClick={getPrediction}
                  disabled={isLoading}
                >
                    <i className="fas fa-chart-line"></i>
                    {isLoading ? 'Estimation...' : 'Estimer le prix'}
                </button>
                </div>
                
                {predictedPrice && (
                  <div className="estimated-price-compact">
                    <div className="estimate-info">
                      <span className="estimate-label">Estimation IA</span>
                      <span className="estimate-value">{predictedPrice.toLocaleString()} TND</span>
                    </div>
                      <div className="estimate-badge">IA</div>
                  </div>
                )}
              </div>

              <div className="key-features-compact">
                <div className="feature-item-compact">
                  <i className="fas fa-tachometer-alt"></i>
                  <span>{car.mileage} km</span>
                </div>
                <div className="feature-item-compact">
                  <i className="fas fa-gas-pump"></i>
                  <span>{car.fuelTankCapacity}L</span>
                </div>
                <div className="feature-item-compact">
                  <i className="fas fa-horse"></i>
                  <span>{car.powerRating} HP</span>
                </div>
              </div>

              <div className="product-actions-main">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-contact-expert"
                  onClick={() => setShowExpertForm(true)}
                >
                  <div className="btn-icon">
                    <FaPhoneAlt />
                  </div>
                  <div className="btn-content">
                    <span className="btn-title">Contacter un Expert</span>
                  </div>
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
          padding: 40px 0 80px 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          min-height: 100vh;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .gallery-wrapper {
          background: white;
          border-radius: 24px;
          padding: 25px;
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.08),
            0 8px 16px rgba(0,0,0,0.04);
          border: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .gallery-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #E8092E, #ff4757, #E8092E);
          border-radius: 24px 24px 0 0;
        }

        .main-carousel {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .carousel-slide img {
          height: 550px;
          width: 100%;
          object-fit: cover;
          border-radius: 16px;
          transition: transform 0.3s ease;
        }

        .carousel-slide:hover img {
          transform: scale(1.02);
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.95);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .carousel-arrow:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .carousel-arrow.prev {
          left: 20px;
        }

        .carousel-arrow.next {
          right: 20px;
        }

        .carousel-arrow i {
          color: #2c3e50;
          font-size: 1.2rem;
        }

        .thumbnails-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
          margin-top: 25px;
          padding: 10px;
        }

        .thumbnail {
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s ease;
          position: relative;
          background: #f8f9fa;
        }

        .thumbnail::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(232,9,46,0.1));
          opacity: 0;
          transition: all 0.3s ease;
        }

        .thumbnail:hover::before {
          opacity: 1;
        }

        .thumbnail.active {
          border-color: #E8092E;
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(232,9,46,0.2);
        }

        .thumbnail img {
          width: 100%;
          height: 90px;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .thumbnail:hover img {
          transform: scale(1.1);
        }

        .product-info {
          background: white;
          border-radius: 24px;
          padding: 35px;
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.08),
            0 8px 16px rgba(0,0,0,0.04);
          border: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .product-info::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2c3e50, #34495e, #2c3e50);
          border-radius: 24px 24px 0 0;
        }

        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f8f9fa;
        }

        .product-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2c3e50;
          margin: 0;
          line-height: 1.2;
          background: linear-gradient(135deg, #2c3e50, #34495e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .model-year {
          font-size: 1.1rem;
          color: #E8092E;
          margin-left: 15px;
          background: rgba(232,9,46,0.1);
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: 600;
        }

        .product-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 2px solid #e9ecef;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #666;
        }

        .action-btn:hover {
          border-color: #E8092E;
          color: #E8092E;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(232,9,46,0.2);
        }

        .product-price-section {
          margin-bottom: 25px;
          padding: 20px;
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
          border-radius: 16px;
          border: 1px solid #e9ecef;
        }

        .price-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .actual-price {
          font-size: 2.2rem;
          font-weight: 800;
          color: #E8092E;
          text-shadow: 0 2px 4px rgba(232,9,46,0.1);
        }

        .estimate-button-compact {
          padding: 10px 16px;
          background: linear-gradient(135deg, #2c3e50, #34495e);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 180px;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
        }

        .estimate-button-compact:hover {
          background: linear-gradient(135deg, #34495e, #2c3e50);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(44,62,80,0.2);
        }

        .estimate-button-compact:disabled {
          background: #95a5a6;
          cursor: not-allowed;
          transform: none;
        }

        .estimate-button-compact i {
          font-size: 0.9rem;
        }

        .estimated-price-compact {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: linear-gradient(135deg, #e8f5e8, #f0fff0);
          border-radius: 12px;
          border: 1px solid rgba(40,167,69,0.2);
        }

        .estimate-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .estimate-label {
          font-size: 0.8rem;
          color: #28a745;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .estimate-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: #28a745;
        }

        .estimate-badge {
          background: linear-gradient(135deg, #E8092E, #ff4757);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: bold;
          height: fit-content;
        }

        .key-features-compact {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 25px;
        }

        .feature-item-compact {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 8px;
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
          border-radius: 12px;
          font-size: 0.85rem;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
          text-align: center;
        }

        .feature-item-compact:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-color: #E8092E;
        }

        .feature-item-compact i {
          color: #E8092E;
          font-size: 1.1rem;
          background: rgba(232,9,46,0.1);
          padding: 6px;
          border-radius: 6px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-item-compact span {
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.9rem;
        }

        .product-actions-main {
          margin-bottom: 35px;
        }

        .btn-contact-expert {
          width: 100%;
          padding: 20px 25px;
          border: none;
          border-radius: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #2c3e50, #34495e);
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(44,62,80,0.2);
        }

        .btn-contact-expert::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: 0.5s;
        }

        .btn-contact-expert:hover::before {
          left: 100%;
        }

        .btn-contact-expert:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(44,62,80,0.3);
          background: linear-gradient(135deg, #34495e, #2c3e50);
        }

        .btn-icon {
          background: rgba(255,255,255,0.2);
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-icon i {
          font-size: 1.4rem;
        }

        .btn-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .btn-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .btn-subtitle {
          font-size: 0.9rem;
          opacity: 0.8;
          font-weight: 400;
        }

        .specifications {
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
          border-radius: 20px;
          padding: 25px;
          border: 1px solid #e9ecef;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .specifications h3 {
          color: #2c3e50;
          font-size: 1.4rem;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .specifications h3::before {
          content: '⚙️';
          font-size: 1.5rem;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 20px;
        }

        .spec-item {
          display: flex;
          flex-direction: column;
          padding: 15px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .spec-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-color: #E8092E;
        }

        .spec-label {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .spec-value {
          font-weight: 700;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        .details-tabs-section {
          margin-top: 60px;
        }

        .tabs-wrapper {
          background: white;
          border-radius: 24px;
          padding: 35px;
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.08),
            0 8px 16px rgba(0,0,0,0.04);
          border: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(10px);
        }

        .tab-buttons {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          padding: 8px;
          background: #f8f9fa;
          border-radius: 16px;
          position: relative;
        }

        .tab-btn {
          padding: 15px 30px;
          border: none;
          background: none;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          border-radius: 12px;
          flex: 1;
          text-align: center;
        }

        .tab-btn:hover {
          color: #E8092E;
          background: rgba(232,9,46,0.05);
        }

        .tab-btn.active {
          color: white;
          background: linear-gradient(135deg, #E8092E, #ff4757);
          box-shadow: 0 4px 15px rgba(232,9,46,0.3);
        }

        .tab-content {
          padding: 30px 0;
          min-height: 300px;
        }

        /* Améliorations pour les features */
        .features-content {
          padding: 20px 0;
        }

        .features-sections {
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        .features-section {
          background: linear-gradient(135deg, #ffffff, #f8f9fa);
          border-radius: 24px;
          padding: 35px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
          border: 1px solid rgba(255,255,255,0.8);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .features-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #E8092E, #ff4757, #E8092E);
          border-radius: 24px 24px 0 0;
        }

        .features-section:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .features-section h3 {
          color: #2c3e50;
          font-size: 1.6rem;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 15px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
          font-weight: 700;
        }

        .features-section h3 i {
          color: white;
          font-size: 1.8rem;
          background: linear-gradient(135deg, #E8092E, #ff4757);
          padding: 12px;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(232,9,46,0.3);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 25px;
        }

        .feature-card {
          background: white;
          padding: 25px;
          border-radius: 18px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(135deg, #E8092E, #ff4757);
          transform: scaleY(0);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(232,9,46,0.2);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }

        .feature-card:hover::before {
          transform: scaleY(1);
        }

        .feature-label {
          display: block;
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .feature-value {
          display: block;
          color: #2c3e50;
          font-weight: 700;
          font-size: 1.3rem;
          line-height: 1.4;
        }

        /* Responsive Design amélioré */
        @media (max-width: 1200px) {
          .container {
            max-width: 1140px;
        }

          .features-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }
        }

        @media (max-width: 992px) {
          .container {
            max-width: 960px;
        }

          .product-title {
            font-size: 2.2rem;
        }

          .key-features {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 15px;
        }

          .product-details-section {
            padding: 20px 0 40px 0;
          }
          
          .carousel-slide img {
            height: 350px;
        }

          .product-title {
            font-size: 1.8rem;
        }

          .model-year {
            font-size: 0.9rem;
            margin-left: 10px;
        }

          .actual-price {
            font-size: 2.2rem;
        }

          .estimated-price-value {
            font-size: 2rem;
        }

          .key-features {
            grid-template-columns: 1fr;
            gap: 12px;
        }

          .feature-item {
            padding: 12px 15px;
        }

          .btn-contact-expert {
            padding: 18px 20px;
          gap: 15px;
        }

          .btn-title {
          font-size: 1.1rem;
          }
          
          .btn-subtitle {
            font-size: 0.85rem;
        }

          .specs-grid {
            grid-template-columns: 1fr;
        }

          .features-grid {
            grid-template-columns: 1fr;
        }

          .tab-buttons {
            flex-direction: column;
            gap: 10px;
        }

          .tab-btn {
            padding: 12px 20px;
            font-size: 0.95rem;
        }

          .features-section {
            padding: 25px 20px;
        }

          .features-section h3 {
            font-size: 1.4rem;
            gap: 12px;
        }

          .feature-card {
            padding: 20px;
        }

          .feature-value {
            font-size: 1.2rem;
        }

          .thumbnails-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }

          .thumbnail img {
            height: 70px;
        }

          .estimate-button-compact {
            width: 100%;
            padding: 12px 16px;
            font-size: 0.85rem;
            white-space: normal;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .product-info {
            padding: 25px 20px;
          }

          .gallery-wrapper {
            padding: 20px 15px;
          }

          .tabs-wrapper {
            padding: 25px 20px;
          }

          .carousel-slide img {
            height: 280px;
          }

          .thumbnails-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Animations et effets visuels améliorés */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          }

        .gallery-wrapper,
        .product-info,
        .tabs-wrapper {
          animation: fadeInUp 0.6s ease-out;
          }

        .estimate-badge {
          animation: pulse 2s infinite;
          }

        /* Amélioration des scrollbars */
        .thumbnails-container::-webkit-scrollbar {
          height: 6px;
          }

        .thumbnails-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
          }

        .thumbnails-container::-webkit-scrollbar-thumb {
          background: #E8092E;
          border-radius: 10px;
          }

        .thumbnails-container::-webkit-scrollbar-thumb:hover {
          background: #c7082a;
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
