import React, { useState } from "react";
import TrackVisibility from "react-on-screen";
import CountUp from "react-countup";

const AboutTwo = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 1,
      icon: "assets/img/icon/about_icon2-3.svg",
      title: "Suivi et Entretien Intelligents",
      description: "Gardez un œil sur l'état de vos véhicules, planifiez les entretiens et recevez des rappels automatiques pour ne jamais manquer une intervention importante.",
      iconClass: "fas fa-tools"
    },
    {
      id: 2,
      icon: "assets/img/icon/about_icon2-4.svg",
      title: "Expertise Automobile Certifiée",
      description: "Bénéficiez des conseils de nos experts automobiles certifiés pour tous vos besoins d'achat, de vente et d'entretien de véhicules.",
      iconClass: "fas fa-user-tie"
    },
    {
      id: 3,
      icon: "assets/img/icon/about_icon2-5.svg",
      title: "Marketplace Sécurisée",
      description: "Achetez et vendez vos véhicules en toute sécurité grâce à notre plateforme vérifiée et nos systèmes de protection avancés.",
      iconClass: "fas fa-shield-alt"
    }
  ];

  const stats = [
    {
      id: 1,
      number: 50,
      suffix: "K+",
      label: "Clients Satisfaits",
      icon: "fas fa-users",
      color: "#ef4444"
    },
    {
      id: 2,
      number: 15,
      suffix: "+",
      label: "Années d'Expérience",
      icon: "fas fa-calendar-alt",
      color: "#991b1b"
    },
    {
      id: 3,
      number: 10,
      suffix: "K+",
      label: "Véhicules Vendus",
      icon: "fas fa-car",
      color: "#ef4444"
    },
    {
      id: 4,
      number: 98,
      suffix: "%",
      label: "Taux de Satisfaction",
      icon: "fas fa-star",
      color: "#991b1b"
    }
  ];

  return (
    <>
      <style jsx>{`
        .about-area-modern {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .about-area-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="about-pattern" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="2" fill="rgba(239, 68, 68, 0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23about-pattern)"/></svg>');
          opacity: 0.7;
        }

        .about-content-wrapper {
          position: relative;
          z-index: 2;
        }

        .about-image-section {
          position: relative;
          margin-bottom: 3rem;
        }

        .about-main-image {
          position: relative;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
          transition: all 0.4s ease;
        }

        .about-main-image:hover {
          transform: translateY(-10px);
          box-shadow: 0 35px 80px rgba(239, 68, 68, 0.2);
        }

        .about-main-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          transition: all 0.4s ease;
        }

        .about-main-image:hover img {
          transform: scale(1.05);
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .about-stat-card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(239, 68, 68, 0.1);
          position: relative;
          overflow: hidden;
        }

        .about-stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .about-stat-card:hover::before {
          left: 100%;
        }

        .about-stat-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 60px rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .about-stat-card:hover .stat-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          display: block;
        }

        .stat-label {
          color: #6c757d;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .about-content-section {
          padding-left: 2rem;
        }

        .about-header {
          margin-bottom: 3rem;
        }

        .about-subtitle {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
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

        .about-title {
          font-size: 2.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #333 0%, #ef4444 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          position: relative;
        }

        .about-description {
          font-size: 1.1rem;
          color: #6c757d;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .about-features-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .about-feature-card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(239, 68, 68, 0.1);
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .about-feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.05), transparent);
          transition: left 0.6s ease;
        }

        .about-feature-card:hover::before {
          left: 100%;
        }

        .about-feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .about-feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        .feature-content h5 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.75rem;
          transition: color 0.3s ease;
        }

        .about-feature-card:hover .feature-content h5 {
          color: #ef4444;
        }

        .feature-content p {
          color: #6c757d;
          line-height: 1.6;
          margin: 0;
          font-size: 0.95rem;
        }

        .about-cta-section {
          margin-top: 3rem;
          text-align: center;
        }

        .about-cta-btn {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
        }

        .about-cta-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .about-cta-btn:hover::before {
          left: 100%;
        }

        .about-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(239, 68, 68, 0.4);
          color: white;
          text-decoration: none;
        }

        .floating-elements {
          position: absolute;
          top: 20%;
          right: 10%;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(153, 27, 27, 0.1));
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .floating-elements:nth-child(2) {
          top: 60%;
          left: 5%;
          width: 60px;
          height: 60px;
          animation-delay: -2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 1200px) {
          .about-content-section {
            padding-left: 0;
            margin-top: 3rem;
          }
        }

        @media (max-width: 768px) {
          .about-area-modern {
            padding: 4rem 0;
          }
          
          .about-title {
            font-size: 2rem;
          }
          
          .about-stats-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .about-feature-card {
            flex-direction: column;
            text-align: center;
          }
          
          .about-main-image img {
            height: 300px;
          }
        }

        @media (max-width: 576px) {
          .about-title {
            font-size: 1.8rem;
          }
          
          .about-feature-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="about-area-modern">
        <div className="floating-elements"></div>
        <div className="floating-elements"></div>
        
        <div className="container about-content-wrapper">
          <div className="row align-items-center">
          <div className="col-xxl-7 col-xl-6">
              <div className="about-image-section">
                <div className="about-main-image">
                  <img 
                    src="assets/img/normal/about.jpg" 
                    alt="MyCar - Plateforme Automobile"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
              </div>
              
                <div className="about-stats-grid">
                  {stats.map((stat, index) => (
                    <div key={stat.id} className="about-stat-card">
                      <div className="stat-icon">
                        <i className={stat.icon}></i>
                      </div>
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible && (
                            <span className="stat-number">
                              <CountUp delay={index * 0.2} start={0} end={stat.number} />
                              {stat.suffix}
                        </span>
                      )
                    }
                  </TrackVisibility>
                      <div className="stat-label">{stat.label}</div>
              </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-xxl-5 col-xl-6">
              <div className="about-content-section">
                <div className="about-header">
                  <div className="about-subtitle">
                    <i className="fas fa-car me-2"></i>
                    À Propos de MyCar
          </div>
                  <h2 className="about-title">
                    Votre Partenaire de Confiance pour l'Automobile
                </h2>
                  <p className="about-description">
                    MyCar est la plateforme automobile de référence qui révolutionne votre expérience 
                    d'achat, de vente et d'entretien de véhicules. Nous combinons expertise technique, 
                    innovation technologique et service client exceptionnel pour vous offrir une 
                    solution complète et sécurisée.
                  </p>
                </div>

                <div className="about-features-list">
                  {features.map((feature, index) => (
                    <div 
                      key={feature.id} 
                      className="about-feature-card"
                      onMouseEnter={() => setHoveredFeature(feature.id)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <div className="feature-icon">
                        <i className={feature.iconClass}></i>
                      </div>
                      <div className="feature-content">
                        <h5>{feature.title}</h5>
                        <p>{feature.description}</p>
                </div>
              </div>
                  ))}
                </div>

                <div className="about-cta-section">
                  <a href="/shop" className="about-cta-btn">
                    <i className="fas fa-search"></i>
                    Découvrir nos Véhicules
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutTwo;
