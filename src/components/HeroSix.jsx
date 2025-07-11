import React, { useEffect, useState, useCallback } from "react";
import ApiCarService from "../services/apiCarServices";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from 'moment';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

const HeroSix = ({ hasAnnonces }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Récupérer uniquement les voitures promues
      const promotedResponse = await ApiCarService.getPromotedCars();
      
      console.log('Promoted cars fetched:', promotedResponse);
      
      // Limiter à 8 voitures pour de meilleures performances
      setCars(promotedResponse.slice(0, 8));
      
      } catch (error) {
      console.error("Error fetching promoted cars:", error);
      setError("Failed to load promoted cars. Please try again later.");
      } finally {
        setLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="alert alert-danger text-center" role="alert">
      <i className="fas fa-exclamation-triangle me-2"></i>
      {error}
      <button 
        className="btn btn-outline-danger btn-sm ms-3" 
        onClick={fetchCars}
      >
        Retry
      </button>
    </div>
  );

     const CarCard = ({ car }) => {
     const [imageError, setImageError] = useState(false);
     
     const handleImageError = () => {
       setImageError(true);
     };

  return (
       <div className="modern-car-card">
         <div className="card-image-container">
           {!imageError ? (
             <img
               src={`https://mycarapi-1.onrender.com/api/files/download/${car.images[0]?.filename}`}
               alt={`${car.make} ${car.model}`}
               className="card-image"
               loading="lazy"
               onError={handleImageError}
             />
           ) : (
             <div className="card-image-placeholder">
               <i className="fas fa-car fa-3x"></i>
               <p>Image not available</p>
                </div>
           )}
        <div className="card-overlay">
          <div className="overlay-content">
            <Link 
              to={`/shop-details/${car.id}`} 
              className="btn btn-modern-primary"
            >
              <i className="fas fa-eye me-2"></i>
              View Details
                    </Link>
                  </div>
                </div>
          <div className="card-badge promoted">
            <i className="fas fa-crown me-1"></i>
            Promoted
              </div>
            </div>
      <div className="card-content">
        <div className="card-meta">
          <span className="date-badge">
            <i className="fas fa-calendar-alt me-1"></i>
            {moment(car.createdAt).format('MMM DD, YYYY')}
          </span>
            {car.promoted && (
              <span className="promoted-badge">
                <i className="fas fa-star me-1"></i>
                Premium
              </span>
            )}
          </div>
        <h4 className="card-title">
                      <Link to={`/shop-details/${car.id}`}>
                        {car.make} {car.model}
                      </Link>
                    </h4>
        <div className="card-specs">
          <span className="spec-item">
            <i className="fas fa-calendar me-1"></i>
            {car.year || 'N/A'}
          </span>
          <span className="spec-item">
            <i className="fas fa-gas-pump me-1"></i>
            {car.fuelType || 'N/A'}
          </span>
          <span className="spec-item">
            <i className="fas fa-tachometer-alt me-1"></i>
            {car.mileage ? `${car.mileage} km` : 'N/A'}
          </span>
        </div>
        {car.price && (
          <div className="card-price">
            <span className="price-label">Starting from</span>
              <span className="price-value">{car.price.toLocaleString()} TND</span>
          </div>
        )}
      </div>
    </div>
  );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  // Si aucune voiture promue n'est trouvée
  if (cars.length === 0) {
    return (
      <div className="hero-wrapper" id="hero">
        <div className="container hero-content">
          {!hasAnnonces && (
            <div className="hero-modern">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="hero-content-modern">
                    <h1 className="hero-title-modern">
                      Find Your Perfect Car
                    </h1>
                    <p className="hero-subtitle-modern">
                      Discover thousands of quality vehicles from trusted dealers. 
                      Your dream car is just a click away.
                    </p>
                    <Link to="/shop" className="btn-modern-hero">
                      <i className="fas fa-search me-2"></i>
                      Explore Cars
                      <i className="fas fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="hero-image-container text-center">
                    <img
                      src="assets/img/update-img/homepage.jpeg"
                      alt="MyCar - Find Your Perfect Car"
                      className="img-fluid hero-image-modern"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="no-promoted-cars">
            <div className="no-cars-content">
              <i className="fas fa-crown fa-3x mb-3"></i>
              <h3>Aucune voiture promue pour le moment</h3>
              <p>Les voitures promues apparaîtront ici une fois qu'elles seront disponibles.</p>
              <Link to="/shop" className="btn-modern-hero">
                <i className="fas fa-search me-2"></i>
                Voir toutes les voitures
              </Link>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          .no-promoted-cars {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 4rem 2rem;
            margin: 2rem 0;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          .no-cars-content i {
            color: #ffd700;
            opacity: 0.7;
          }
          
          .no-cars-content h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
          }
          
          .no-cars-content p {
            color: #6c757d;
            margin-bottom: 2rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .hero-wrapper {
          background: linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .hero-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-modern {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 3rem;
          margin: 2rem 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-title-modern {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero-subtitle-modern {
          font-size: 1.2rem;
          color: #6c757d;
          margin-bottom: 2rem;
          font-weight: 400;
        }

        .btn-modern-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .btn-modern-hero:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
          color: white;
        }

        .hero-image-modern {
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .hero-image-modern:hover {
          transform: scale(1.02);
        }

        .latest-cars-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 3rem;
          margin: 2rem 0;
          position: relative;
          z-index: 2;
        }

        .section-title-modern {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .section-title-modern::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }

                 .modern-car-card {
           background: white;
           border-radius: 20px;
           overflow: hidden;
           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
           transition: all 0.3s ease;
           height: 100%;
           min-height: 500px;
           display: flex;
           flex-direction: column;
          border: 2px solid transparent;
         }

        .modern-car-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }

                 .card-image-container {
           position: relative;
           height: 380px;
           overflow: hidden;
           border-radius: 20px 20px 0 0;
         }

         .card-image {
           width: 100%;
           height: 100%;
           object-fit: cover;
           object-position: center;
           transition: transform 0.3s ease;
           display: block;
         }

         .card-image-placeholder {
           width: 100%;
           height: 100%;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
           color: #6c757d;
           text-align: center;
         }

         .card-image-placeholder p {
           margin-top: 1rem;
           font-size: 0.9rem;
           font-weight: 500;
         }

        .modern-car-card:hover .card-image {
          transform: scale(1.1);
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .modern-car-card:hover .card-overlay {
          opacity: 1;
        }

        .btn-modern-primary {
          background: white;
          color: #667eea;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-modern-primary:hover {
          background: #f8f9fa;
          color: #764ba2;
          transform: scale(1.05);
        }

        .card-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #333;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
          animation: pulse 2s infinite;
        }

        .card-badge.promoted {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

                 .card-content {
           padding: 1.5rem;
           flex: 1;
           display: flex;
           flex-direction: column;
           justify-content: space-between;
         }

        .card-meta {
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .date-badge {
          background: #f8f9fa;
          color: #6c757d;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .promoted-badge {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #333;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .card-title a {
          color: #333;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .card-title a:hover {
          color: #667eea;
        }

        .card-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .spec-item {
          background: #f8f9fa;
          color: #6c757d;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .card-price {
          border-top: 1px solid #e9ecef;
          padding-top: 1rem;
          text-align: center;
        }

        .price-label {
          display: block;
          font-size: 0.8rem;
          color: #6c757d;
          margin-bottom: 0.25rem;
        }

        .price-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #667eea;
          text-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
        }

        .swiper-pagination-bullet {
          background: #667eea;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .no-promoted-cars {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 4rem 2rem;
          margin: 2rem 0;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .no-cars-content i {
          color: #ffd700;
          opacity: 0.7;
        }
        
        .no-cars-content h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }
        
        .no-cars-content p {
          color: #6c757d;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .hero-title-modern {
            font-size: 2.5rem;
          }
          
          .hero-modern {
            padding: 2rem;
          }
          
          .latest-cars-section {
            padding: 2rem;
          }
        }
      `}</style>

      <div className="hero-wrapper" id="hero">
        <div className="container hero-content">
          {/* Hero Section */}
          {!hasAnnonces && (
            <div className="hero-modern">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="hero-content-modern">
                    <h1 className="hero-title-modern">
                      Find Your Perfect Car
                    </h1>
                    <p className="hero-subtitle-modern">
                      Discover thousands of quality vehicles from trusted dealers. 
                      Your dream car is just a click away.
                    </p>
                    <Link to="/shop" className="btn-modern-hero">
                      <i className="fas fa-search me-2"></i>
                      Explore Cars
                      <i className="fas fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="hero-image-container text-center">
                    <img
                      src="assets/img/update-img/homepage.jpeg"
                      alt="MyCar - Find Your Perfect Car"
                      className="img-fluid hero-image-modern"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Promoted Cars Section */}
            <div className="latest-cars-section">
              <h2 className="section-title-modern">
              <i className="fas fa-crown me-3"></i>
              Véhicules Premium
              </h2>
              
              <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1200: { slidesPerView: 3 }
                }}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true
                }}
                autoplay={{ 
                  delay: 4000, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                loop={cars.length > 3}
                className="modern-swiper"
              >
                {cars.map((car) => (
                  <SwiperSlide key={car.id}>
                    <CarCard car={car} />
              </SwiperSlide>
            ))}
          </Swiper>
            </div>
        </div>
      </div>
    </>
  );
};

export default HeroSix;
