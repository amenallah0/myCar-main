import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Styles CSS
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Modules Swiper
import { FreeMode, Navigation, Thumbs, EffectFade, Pagination, Autoplay } from 'swiper/modules';

const TestimonialOne = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Acheteuse",
      location: "Paris",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Excellente expérience sur MyCar ! J'ai trouvé ma voiture idéale en quelques clics. L'interface est intuitive et les informations sont très détaillées. Le processus d'achat s'est déroulé sans problème.",
      date: "Il y a 2 semaines",
      verified: true
    },
    {
      id: 2,
      name: "Pierre Martin",
      role: "Vendeur",
      location: "Lyon",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Plateforme fantastique pour vendre ma voiture ! Les outils de mise en ligne sont simples et efficaces. J'ai vendu mon véhicule en moins d'une semaine grâce à la visibilité offerte par MyCar.",
      date: "Il y a 1 mois",
      verified: true
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "Cliente Premium",
      location: "Marseille",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Le service client de MyCar est exceptionnel ! L'équipe d'experts m'a accompagnée tout au long de mon achat. Leurs conseils ont été précieux pour faire le bon choix. Je recommande vivement !",
      date: "Il y a 3 semaines",
      verified: true
    },
    {
      id: 4,
      name: "Thomas Rousseau",
      role: "Acheteur",
      location: "Toulouse",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Transparence totale sur les véhicules proposés. Les photos sont de qualité professionnelle et les descriptions très complètes. Aucune mauvaise surprise lors de la livraison. Parfait !",
      date: "Il y a 1 semaine",
      verified: true
    },
    {
      id: 5,
      name: "Isabelle Moreau",
      role: "Experte Auto",
      location: "Nice",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "En tant qu'experte automobile sur la plateforme, je peux témoigner de la qualité des services MyCar. L'interface professionnelle facilite grandement mon travail de conseil auprès des clients.",
      date: "Il y a 2 mois",
      verified: true
    }
  ];

  const features = [
    {
      id: 1,
      icon: "fas fa-shield-check",
      title: "Sécurité Garantie",
      description: "Transactions 100% sécurisées avec notre système de protection avancé"
    },
    {
      id: 2,
      icon: "fas fa-user-tie",
      title: "Experts Certifiés",
      description: "Équipe d'experts automobiles à votre service 24/7"
    },
    {
      id: 3,
      icon: "fas fa-star",
      title: "Qualité Premium",
      description: "Véhicules vérifiés et certifiés pour votre tranquillité d'esprit"
    }
  ];

  return (
    <>
      <style jsx>{`
        .testimonial-area-modern {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .testimonial-area-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="testimonial-pattern" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255, 255, 255, 0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23testimonial-pattern)"/></svg>');
          opacity: 0.7;
        }

        .testimonial-content-wrapper {
          position: relative;
          z-index: 2;
        }

        .testimonial-image-section {
          position: relative;
          margin-bottom: 3rem;
        }

        .testimonial-main-image {
          position: relative;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          transition: all 0.4s ease;
        }

        .testimonial-main-image:hover {
          transform: translateY(-10px);
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.4);
        }

        .testimonial-main-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          transition: all 0.4s ease;
        }

        .testimonial-main-image:hover img {
          transform: scale(1.05);
        }

                  .testimonial-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.8), rgba(238, 90, 82, 0.8));
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

        .testimonial-main-image:hover .testimonial-overlay {
          opacity: 1;
        }

                  .testimonial-play-btn {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: white;
            color: #ff6b6b;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            transition: all 0.3s ease;
            cursor: pointer;
          }

        .testimonial-play-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
        }

        .testimonial-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .testimonial-feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .testimonial-feature-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-5px);
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: white;
          color: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.2rem;
        }

        .feature-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .feature-description {
          font-size: 0.85rem;
          color: #6c757d;
          line-height: 1.4;
        }

        .testimonial-content-section {
          padding-left: 2rem;
        }

        .testimonial-header {
          margin-bottom: 3rem;
        }

        .testimonial-subtitle {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .testimonial-title {
          font-size: 2.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #333 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .testimonial-description {
          font-size: 1.1rem;
          color: #6c757d;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .testimonial-slider-container {
          position: relative;
        }

        .testimonial-card-modern {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 2.5rem;
          color: #333;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
          transition: all 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        .testimonial-card-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .testimonial-card-modern:hover::before {
          left: 100%;
        }

        .testimonial-card-modern:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
        }

        .testimonial-header-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .testimonial-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #ef4444;
        }

        .testimonial-user-info h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.25rem;
        }

        .testimonial-user-role {
          color: #ef4444;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .testimonial-user-location {
          color: #6c757d;
          font-size: 0.8rem;
        }

        .testimonial-rating {
          margin-left: auto;
          display: flex;
          gap: 0.25rem;
        }

        .testimonial-star {
          color: #ffc107;
          font-size: 1rem;
        }

        .testimonial-text {
          font-size: 1rem;
          line-height: 1.7;
          color: #555;
          margin-bottom: 1.5rem;
          font-style: italic;
          position: relative;
        }

        .testimonial-text::before {
          content: '"';
          font-size: 4rem;
          color: #ef4444;
          position: absolute;
          top: -1rem;
          left: -1rem;
          opacity: 0.3;
          font-family: serif;
        }

        .testimonial-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #e9ecef;
        }

        .testimonial-date {
          color: #6c757d;
          font-size: 0.8rem;
        }

        .testimonial-verified {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #28a745;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          backdrop-filter: blur(10px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 107, 107, 0.3);
          box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: linear-gradient(135deg, #ee5a52 0%, #dc2626 100%);
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 1rem;
          font-weight: 600;
        }

        .swiper-pagination-bullet {
          background: rgba(255, 107, 107, 0.5);
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .swiper-pagination-bullet-active {
          background: #ff6b6b;
          transform: scale(1.2);
        }

        .floating-testimonial-elements {
          position: absolute;
          top: 15%;
          right: 8%;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .floating-testimonial-elements:nth-child(2) {
          top: 65%;
          left: 5%;
          width: 70px;
          height: 70px;
          animation-delay: -2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @media (max-width: 1200px) {
          .testimonial-content-section {
            padding-left: 0;
            margin-top: 3rem;
          }
        }

        @media (max-width: 768px) {
          .testimonial-area-modern {
            padding: 4rem 0;
          }
          
          .testimonial-title {
            font-size: 2rem;
          }
          
          .testimonial-card-modern {
            padding: 2rem;
          }
          
          .testimonial-main-image img {
            height: 300px;
          }
          
          .testimonial-features-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .testimonial-title {
            font-size: 1.8rem;
          }
          
          .testimonial-card-modern {
            padding: 1.5rem;
          }
          
          .testimonial-header-card {
            flex-direction: column;
            text-align: center;
          }
          
          .testimonial-rating {
            margin-left: 0;
            justify-content: center;
          }
        }
      `}</style>

      <div className="testimonial-area-modern">
        <div className="floating-testimonial-elements"></div>
        <div className="floating-testimonial-elements"></div>
        
        <div className="container testimonial-content-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="testimonial-image-section">
                <div className="testimonial-main-image">
                  <img 
                    src="assets/img/testimonial/testimonial.jpg" 
                    alt="MyCar - Témoignages Clients"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="testimonial-overlay">
                    <div className="testimonial-play-btn">
                      <i className="fas fa-play"></i>
                            </div>
                          </div>
                        </div>
                
                <div className="testimonial-features-grid">
                  {features.map((feature) => (
                    <div key={feature.id} className="testimonial-feature-card">
                      <div className="feature-icon">
                        <i className={feature.icon}></i>
                      </div>
                      <div className="feature-title">{feature.title}</div>
                      <div className="feature-description">{feature.description}</div>
                    </div>
                  ))}
                            </div>
                            </div>
                          </div>
            
            <div className="col-lg-6">
              <div className="testimonial-content-section">
                <div className="testimonial-header">
                  <div className="testimonial-subtitle">
                    <i className="fas fa-quote-left me-2"></i>
                    Témoignages Clients
                  </div>
                  <h2 className="testimonial-title">
                    Ce que nos clients disent de MyCar
                  </h2>
                  <p className="testimonial-description">
                    Découvrez les expériences authentiques de nos clients qui ont fait confiance 
                    à MyCar pour leurs projets automobiles. Leur satisfaction est notre priorité.
                          </p>
                        </div>

                <div className="testimonial-slider-container">
                  <Swiper
                    modules={[FreeMode, Navigation, Thumbs, EffectFade, Pagination, Autoplay]}
                    loop={true}
                    navigation={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1000}
                    autoplay={{ 
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true
                    }}
                    pagination={{ 
                      clickable: true,
                      dynamicBullets: true
                    }}
                    onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                    className="testimonial-swiper"
                  >
                    {testimonials.map((testimonial) => (
                      <SwiperSlide key={testimonial.id}>
                        <div className="testimonial-card-modern">
                          <div className="testimonial-header-card">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name}
                              className="testimonial-avatar"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/60x60/ef4444/ffffff?text=' + testimonial.name.charAt(0);
                              }}
                            />
                            <div className="testimonial-user-info">
                              <h4>{testimonial.name}</h4>
                              <div className="testimonial-user-role">{testimonial.role}</div>
                              <div className="testimonial-user-location">
                                <i className="fas fa-map-marker-alt me-1"></i>
                                {testimonial.location}
                    </div>
                            </div>
                            <div className="testimonial-rating">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <i key={i} className="fas fa-star testimonial-star"></i>
                              ))}
                            </div>
                          </div>
                          
                          <p className="testimonial-text">
                            {testimonial.text}
                          </p>
                          
                          <div className="testimonial-footer">
                            <div className="testimonial-date">{testimonial.date}</div>
                            {testimonial.verified && (
                              <div className="testimonial-verified">
                                <i className="fas fa-check-circle"></i>
                                Achat vérifié
                        </div>
                            )}
                      </div>
                    </div>
                  </SwiperSlide>
                    ))}
                </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialOne;
