import React, { useState } from "react";

const FaqAreaThree = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const faqData = [
    {
      id: 0,
      question: "Quel est l'objectif de notre entreprise ?",
      answer: "Nous visons à connecter les acheteurs avec une large gamme d'options de voitures, leur permettant d'explorer différents modèles, de comparer les prix et de prendre des décisions éclairées en toute simplicité. En exploitant des fonctionnalités de recherche avancées, des annonces détaillées et un support client fiable, notre plateforme s'efforce d'améliorer l'expérience globale d'achat de voiture et de garantir que les clients trouvent le véhicule parfait pour répondre à leurs besoins.",
      icon: "fas fa-bullseye"
    },
    {
      id: 1,
      question: "Que dois-je faire pour commencer ?",
      answer: "Pour commencer, créez d'abord un compte sur notre plateforme pour accéder à toutes nos fonctionnalités et services. Une fois inscrit, vous pouvez rechercher votre voiture idéale en utilisant nos outils de recherche avancés, en filtrant par marque, modèle, prix et bien plus encore pour trouver des options qui correspondent à vos préférences.",
      icon: "fas fa-route"
    },
    {
      id: 2,
      question: "Qu'est-ce qui fait de cette plateforme la meilleure solution ?",
      answer: "Ce qui nous distingue, c'est notre équipe dédiée d'experts qui sont facilement disponibles pour fournir une assistance personnalisée et répondre à toutes vos questions spécifiques. Cela garantit que vous recevez des conseils précieux et un soutien tout au long de votre parcours d'achat de voiture, rendant le processus plus fluide et plus éclairé.",
      icon: "fas fa-star"
    },
    {
      id: 3,
      question: "Comment trouver la voiture qui me convient ?",
      answer: "Notre système de recommandation intelligent analyse vos préférences, votre budget et vos exigences pour suggérer les véhicules les plus adaptés. Vous pouvez également utiliser nos filtres avancés pour affiner les options par marque, type de carburant, transmission, année et bien d'autres critères.",
      icon: "fas fa-search"
    },
    {
      id: 4,
      question: "Mes informations personnelles sont-elles sécurisées ?",
      answer: "Absolument ! Nous utilisons des mesures de cryptage et de sécurité conformes aux normes de l'industrie pour protéger vos informations personnelles. Vos données ne sont jamais partagées avec des tiers sans votre consentement explicite, et nous respectons toutes les réglementations pertinentes en matière de confidentialité.",
      icon: "fas fa-shield-alt"
    },
    {
      id: 5,
      question: "Puis-je obtenir des conseils d'expert avant l'achat ?",
      answer: "Oui ! Notre équipe d'experts automobiles est disponible pour fournir des consultations personnalisées, vous aider à comprendre les spécifications des véhicules, vous assister avec les options de financement et vous guider tout au long du processus d'achat.",
      icon: "fas fa-user-tie"
    }
  ];

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  return (
    <>
      <style jsx>{`
        .faq-area-modern {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 5rem 0;
          position: relative;
          overflow: hidden;
        }

        .faq-area-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="faq-pattern" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="2" fill="rgba(239, 68, 68, 0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23faq-pattern)"/></svg>');
          opacity: 0.5;
        }

        .faq-content {
          position: relative;
          z-index: 2;
        }

        .faq-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 4rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .faq-wrapper::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.05), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }

        .faq-subtitle {
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

        .faq-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #333 0%, #ef4444 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .faq-description {
          font-size: 1.1rem;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .faq-accordion {
          position: relative;
          z-index: 2;
        }

        .faq-item {
          background: white;
          border-radius: 20px;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          border: 1px solid rgba(239, 68, 68, 0.1);
        }

        .faq-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .faq-item.active {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .faq-question {
          padding: 1.5rem 2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          position: relative;
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
        }

        .faq-question:hover {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .faq-item.active .faq-question {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
        }

        .faq-icon {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .faq-item.active .faq-icon {
          background: white;
          color: #ef4444;
          transform: scale(1.1);
        }

        .faq-question-text {
          flex: 1;
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .faq-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .faq-item.active .faq-toggle {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(180deg);
        }

        .faq-toggle i {
          font-size: 1rem;
          color: #ef4444;
          transition: all 0.3s ease;
        }

        .faq-item.active .faq-toggle i {
          color: white;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }

        .faq-item.active .faq-answer {
          max-height: 300px;
        }

        .faq-answer-content {
          padding: 0 2rem 2rem 2rem;
          color: #6c757d;
          line-height: 1.7;
          font-size: 1rem;
          margin-left: 66px;
        }

        .faq-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
          position: relative;
          z-index: 2;
        }

        .faq-stat {
          text-align: center;
          padding: 2rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .faq-stat:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .faq-stat-icon {
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
        }

        .faq-stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .faq-stat-label {
          color: #6c757d;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .faq-wrapper {
            padding: 2rem;
            border-radius: 20px;
          }
          
          .faq-title {
            font-size: 2rem;
          }
          
          .faq-question {
            padding: 1rem 1.5rem;
          }
          
          .faq-answer-content {
            padding: 0 1.5rem 1.5rem 1.5rem;
            margin-left: 0;
          }
          
          .faq-icon {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .faq-area-modern {
            padding: 3rem 0;
          }
          
          .faq-title {
            font-size: 1.8rem;
          }
          
          .faq-question-text {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="faq-area-modern">
        <div className="container faq-content">
          <div className="faq-wrapper">
            <div className="faq-header">
              <div className="faq-subtitle">
                <i className="fas fa-question-circle me-2"></i>
                Questions Fréquemment Posées
              </div>
              <h2 className="faq-title">
                Tout ce que vous devez savoir
              </h2>
              <p className="faq-description">
                Trouvez des réponses aux questions les plus courantes sur notre plateforme, 
                nos services et comment nous pouvons vous aider à trouver votre voiture parfaite.
              </p>
            </div>

            <div className="faq-accordion">
              {faqData.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className={`faq-item ${activeAccordion === index ? 'active' : ''}`}
                >
                  <div 
                    className="faq-question"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="faq-icon">
                      <i className={faq.icon}></i>
                    </div>
                    <div className="faq-question-text">
                      {faq.question}
                  </div>
                    <div className="faq-toggle">
                      <i className="fas fa-chevron-down"></i>
                </div>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-content">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-stats">
              <div className="faq-stat">
                <div className="faq-stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="faq-stat-number">50K+</div>
                <div className="faq-stat-label">Clients Satisfaits</div>
              </div>
              <div className="faq-stat">
                <div className="faq-stat-icon">
                  <i className="fas fa-car"></i>
                </div>
                <div className="faq-stat-number">10K+</div>
                <div className="faq-stat-label">Voitures Disponibles</div>
                  </div>
              <div className="faq-stat">
                <div className="faq-stat-icon">
                  <i className="fas fa-handshake"></i>
                    </div>
                <div className="faq-stat-number">98%</div>
                <div className="faq-stat-label">Taux de Satisfaction</div>
                  </div>
              <div className="faq-stat">
                <div className="faq-stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="faq-stat-number">24/7</div>
                <div className="faq-stat-label">Support Disponible</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqAreaThree;
