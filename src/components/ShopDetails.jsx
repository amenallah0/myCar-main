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

const ShopDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await ApiCarService.getCarById(id);
        setCar(response);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Error fetching car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

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
                    <span className="feature-value status">Disponible</span>
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
            <p>Reviews coming soon...</p>
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

              <div className="price-section">
                <div className="current-price">{car.price} TND</div>
                {car.previousPrice && (
                  <div className="previous-price">{car.previousPrice} TND</div>
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

        .price-section {
          margin-bottom: 30px;
        }

        .current-price {
          font-size: 2.5rem;
          font-weight: 700;
          color: #E8092E;
        }

        .previous-price {
          font-size: 1.2rem;
          color: #999;
          text-decoration: line-through;
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
          color: #2ecc71;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feature-value.status::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #2ecc71;
          border-radius: 50%;
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
        }
      `}</style>

      <ToastContainer />
    </motion.section>
  );
};

export default ShopDetails;
