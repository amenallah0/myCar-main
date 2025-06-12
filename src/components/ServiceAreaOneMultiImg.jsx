import React, { useState } from "react";
import { Link } from "react-router-dom";

const ServiceAreaOneMultiImg = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      icon: "fas fa-car",
      title: "Vente de Véhicules",
      description: "Large sélection de voitures neuves et d'occasion, expertisées et garanties pour votre tranquillité d'esprit.",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Véhicules certifiés", "Garantie incluse", "Financement disponible"],
      color: "#ff6b6b"
    },
    {
      id: 2,
      icon: "fas fa-handshake",
      title: "Rachat de Véhicules",
      description: "Estimation gratuite et rachat immédiat de votre véhicule au meilleur prix du marché, démarches simplifiées.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Estimation gratuite", "Paiement immédiat", "Démarches simplifiées"],
      color: "#ee5a52"
    },
    {
      id: 3,
      icon: "fas fa-search",
      title: "Expertise Automobile",
      description: "Évaluation professionnelle de véhicules par nos experts certifiés pour achat, vente ou assurance.",
      image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Experts certifiés", "Rapport détaillé", "Conseils personnalisés"],
      color: "#ff6b6b"
    },
    {
      id: 4,
      icon: "fas fa-shield-alt",
      title: "Garantie & Assurance",
      description: "Solutions d'assurance et de garantie adaptées à vos besoins pour protéger votre investissement automobile.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Couverture complète", "Tarifs compétitifs", "Assistance 24/7"],
      color: "#ee5a52"
    },
    {
      id: 5,
      icon: "fas fa-credit-card",
      title: "Financement Auto",
      description: "Solutions de financement flexibles et avantageuses pour l'achat de votre véhicule, avec nos partenaires bancaires.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Taux avantageux", "Réponse rapide", "Partenaires bancaires"],
      color: "#ff6b6b"
    },
    {
      id: 6,
      icon: "fas fa-headset",
      title: "Support Client",
      description: "Accompagnement personnalisé tout au long de votre parcours automobile, de l'achat au service après-vente.",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Support 24/7", "Conseils experts", "Suivi personnalisé"],
      color: "#ee5a52"
    }
  ];

  return (
    <>
      <style jsx>{`
        .service-area-modern {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .service-area-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="service-pattern" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1.5" fill="rgba(255, 107, 107, 0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23service-pattern)"/></svg>');
          opacity: 0.6;
        }

        .service-content-wrapper {
          position: relative;
          z-index: 2;
        }

        .service-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .service-subtitle {
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

        .service-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #333 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .service-description {
          font-size: 1.1rem;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .service-card-modern {
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255, 107, 107, 0.1);
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .service-card-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.1), transparent);
          transition: left 0.6s ease;
          z-index: 1;
        }

        .service-card-modern:hover::before {
          left: 100%;
        }

        .service-card-modern:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 30px 70px rgba(255, 107, 107, 0.2);
          border-color: rgba(255, 107, 107, 0.3);
        }

        .service-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s ease;
        }

        .service-card-modern:hover .service-image {
          transform: scale(1.1);
        }

        .service-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 107, 107, 0.8), rgba(238, 90, 82, 0.8));
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .service-card-modern:hover .service-image-overlay {
          opacity: 1;
        }

        .service-overlay-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: white;
          color: #ff6b6b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .service-overlay-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
        }

        .service-icon-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          z-index: 3;
          box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
        }

        .service-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
        }

        .service-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 1rem;
          transition: color 0.3s ease;
        }

        .service-card-modern:hover .service-card-title {
          color: #ff6b6b;
        }

        .service-card-description {
          color: #6c757d;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .service-features {
          margin-bottom: 1.5rem;
        }

        .service-feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #555;
        }

        .service-feature-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: black;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }

        .service-link-btn {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          align-self: flex-start;
          position: relative;
          overflow: hidden;
        }

        .service-link-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .service-link-btn:hover::before {
          left: 100%;
        }

        .service-link-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
          color: white;
          text-decoration: none;
        }

        .floating-service-shapes {
          position: absolute;
          top: 15%;
          right: 8%;
          width: 120px;
          height: 120px;
          background: rgba(255, 107, 107, 0.1);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: float 8s ease-in-out infinite;
        }

        .floating-service-shapes:nth-child(2) {
          top: 70%;
          left: 3%;
          width: 80px;
          height: 80px;
          border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          animation-delay: -3s;
        }

        .floating-service-shapes:nth-child(3) {
          top: 40%;
          right: 15%;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          animation-delay: -5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }

        @media (max-width: 768px) {
          .service-area-modern {
            padding: 4rem 0;
          }
          
          .service-title {
            font-size: 2rem;
          }
          
          .service-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .service-content {
            padding: 1.5rem;
          }
          
          .service-image-container {
            height: 180px;
          }
        }

        @media (max-width: 576px) {
          .service-title {
            font-size: 1.8rem;
          }
          
          .service-content {
            padding: 1.25rem;
          }
          
          .service-image-container {
            height: 160px;
          }
        }
      `}</style>

      <div className="service-area-modern">
        <div className="floating-service-shapes"></div>
        <div className="floating-service-shapes"></div>
        <div className="floating-service-shapes"></div>
        
        <div className="container service-content-wrapper">
          <div className="service-header">
            <div className="service-subtitle">
              <i className="fas fa-cogs me-2"></i>
              Nos Services
            </div>
            <h2 className="service-title">
              Solutions Automobiles Complètes
            </h2>
            <p className="service-description">
              Découvrez notre gamme complète de services automobiles conçus pour répondre 
              à tous vos besoins, de l'achat à l'entretien de votre véhicule.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="service-card-modern"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="service-image-container">
                  <div className="service-icon-badge">
                    <i className={service.icon}></i>
                  </div>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="service-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200/ff6b6b/ffffff?text=' + service.title.split(' ')[0];
                    }}
                  />
                  <div className="service-image-overlay">
                    <div className="service-overlay-icon">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
                
                <div className="service-content">
                  <h4 className="service-card-title">
                    <Link to="/service-details">{service.title}</Link>
                  </h4>
                  <p className="service-card-description">
                    {service.description}
                  </p>
                  
                  <div className="service-features">
                    {service.features.map((feature, index) => (
                      <div key={index} className="service-feature-item">
                        <div className="service-feature-icon">
                          <i className="fas fa-check"></i>
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/service-details" className="service-link-btn">
                    En savoir plus <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceAreaOneMultiImg;
