import React, { useState } from "react";

const ProcessAreaOne = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const processSteps = [
    {
      id: 1,
      icon: "fas fa-car",
      title: "Large Choix de Véhicules",
      description: "Notre plateforme propose une gamme variée de voitures, des modèles neufs aux véhicules d'occasion, pour répondre à tous les besoins et budgets.",
      color: "#ef4444",
      step: "01"
    },
    {
      id: 2,
      icon: "fas fa-file-alt",
      title: "Annonces Détaillées",
      description: "Chaque annonce comprend des photos de qualité, des descriptions complètes et toutes les informations essentielles pour vous aider dans votre choix.",
      color: "#991b1b",
      step: "02"
    },
    {
      id: 3,
      icon: "fas fa-user-tie",
      title: "Assistance d'Experts",
      description: "Notre équipe d'experts automobiles est à votre disposition pour vous conseiller, répondre à vos questions et vous accompagner dans toutes vos démarches.",
      color: "#ef4444",
      step: "03"
    },
    {
      id: 4,
      icon: "fas fa-shield-alt",
      title: "Transactions Sécurisées",
      description: "Bénéficiez de notre système de paiement sécurisé et de nos garanties pour acheter et vendre vos véhicules en toute confiance.",
      color: "#991b1b",
      step: "04"
    },
    {
      id: 5,
      icon: "fas fa-search",
      title: "Recherche Avancée",
      description: "Utilisez nos filtres intelligents pour trouver rapidement le véhicule parfait selon vos critères de marque, prix, kilométrage et plus encore.",
      color: "#ef4444",
      step: "05"
    },
    {
      id: 6,
      icon: "fas fa-handshake",
      title: "Support Client 24/7",
      description: "Notre service client est disponible en permanence pour vous assister et résoudre tous vos problèmes rapidement et efficacement.",
      color: "#991b1b",
      step: "06"
    }
  ];

  return (
    <>
      <style jsx>{`
        .process-area-modern {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .process-area-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="process-pattern" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1.5" fill="rgba(239, 68, 68, 0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23process-pattern)"/></svg>');
          opacity: 0.6;
        }

        .process-content-wrapper {
          position: relative;
          z-index: 2;
        }

        .process-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .process-subtitle {
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

        .process-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #333 0%, #ef4444 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .process-description {
          font-size: 1.1rem;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .process-card-modern {
          background: white;
          border-radius: 25px;
          padding: 2.5rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(239, 68, 68, 0.1);
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .process-card-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .process-card-modern:hover::before {
          left: 100%;
        }

        .process-card-modern:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 30px 70px rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .process-step-number {
          position: absolute;
          top: -15px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.1rem;
          box-shadow: 0 5px 20px rgba(239, 68, 68, 0.3);
          z-index: 2;
        }

        .process-icon-container {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          font-size: 2rem;
          transition: all 0.4s ease;
          position: relative;
        }

        .process-card-modern:hover .process-icon-container {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 15px 40px rgba(239, 68, 68, 0.4);
        }

        .process-icon-container::after {
          content: '';
          position: absolute;
          top: -10px;
          right: -10px;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .process-card-modern:hover .process-icon-container::after {
          opacity: 1;
        }

        .process-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 1rem;
          transition: color 0.3s ease;
        }

        .process-card-modern:hover .process-card-title {
          color: #ef4444;
        }

        .process-card-description {
          color: #6c757d;
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .process-card-footer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e9ecef;
        }

        .process-learn-more {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
        }

        .process-learn-more::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .process-learn-more:hover::before {
          left: 100%;
        }

        .process-learn-more:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4);
          color: white;
          text-decoration: none;
        }

        .floating-shapes {
          position: absolute;
          top: 10%;
          right: 5%;
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(153, 27, 27, 0.1));
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: float 8s ease-in-out infinite;
        }

        .floating-shapes:nth-child(2) {
          top: 70%;
          left: 3%;
          width: 80px;
          height: 80px;
          border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          animation-delay: -3s;
        }

        .floating-shapes:nth-child(3) {
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

        .process-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 4rem;
          flex-wrap: wrap;
        }

        .process-stat-item {
          text-align: center;
          padding: 1.5rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          min-width: 150px;
        }

        .process-stat-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(239, 68, 68, 0.15);
        }

        .process-stat-number {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }

        .process-stat-label {
          color: #6c757d;
          font-weight: 600;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .process-area-modern {
            padding: 4rem 0;
          }
          
          .process-title {
            font-size: 2rem;
          }
          
          .process-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .process-card-modern {
            padding: 2rem;
          }
          
          .process-stats {
            gap: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .process-title {
            font-size: 1.8rem;
          }
          
          .process-card-modern {
            padding: 1.5rem;
          }
          
          .process-stats {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <section className="process-area-modern">
        <div className="floating-shapes"></div>
        <div className="floating-shapes"></div>
        <div className="floating-shapes"></div>
        
        <div className="container process-content-wrapper">
          <div className="process-header">
            <div className="process-subtitle">
              <i className="fas fa-cogs me-2"></i>
              Notre Processus
            </div>
            <h2 className="process-title">
              Comment MyCar Vous Accompagne
            </h2>
            <p className="process-description">
              Découvrez notre approche complète et nos services dédiés pour vous offrir 
              la meilleure expérience automobile, de la recherche à l'achat de votre véhicule.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div 
                key={step.id} 
                className="process-card-modern"
                onMouseEnter={() => setHoveredCard(step.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="process-step-number">
                  {step.step}
                </div>
                
                <div className="process-icon-container">
                  <i className={step.icon}></i>
                </div>
                
                <h4 className="process-card-title">
                  {step.title}
                </h4>
                
                <p className="process-card-description">
                  {step.description}
                </p>
                
                <div className="process-card-footer">
                  <a href="#" className="process-learn-more">
                    <i className="fas fa-arrow-right"></i>
                    En savoir plus
                  </a>
        </div>
              </div>
            ))}
          </div>

          <div className="process-stats">
            <div className="process-stat-item">
              <span className="process-stat-number">50K+</span>
              <div className="process-stat-label">Clients Satisfaits</div>
              </div>
            <div className="process-stat-item">
              <span className="process-stat-number">10K+</span>
              <div className="process-stat-label">Véhicules Vendus</div>
            </div>
            <div className="process-stat-item">
              <span className="process-stat-number">98%</span>
              <div className="process-stat-label">Taux de Satisfaction</div>
          </div>
            <div className="process-stat-item">
              <span className="process-stat-number">24/7</span>
              <div className="process-stat-label">Support Client</div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ProcessAreaOne;
