import React, { useEffect, useState } from "react";
import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";
import { Link } from "react-router-dom";

const PortfolioOne = () => {
  const isotope = React.useRef(Isotope | null);
  const [active, setActive] = useState(1);

  // handling filter key change
  useEffect(() => {
    const imgLoad = imagesLoaded(document.querySelectorAll(".image-container"));

    imgLoad.on("done", () => {
      isotope.current = new Isotope(".filter-container", {
        itemSelector: ".filter-item",
        layoutMode: "masonry",
        percentPosition: true,
      });

      return () => isotope.current?.destroy();
    });

    return () => imgLoad.off("done");
  }, []);

  const handleFilterKeyChange = (key, index) => {
    setActive(index);
    isotope.current?.arrange({ filter: `${key}` });
  };

  return (
    <>
      <div className="portfolio-area-modern">
        <div className="portfolio-background">
          <div className="portfolio-shape-modern">
            <div className="shape-element shape-1"></div>
            <div className="shape-element shape-2"></div>
            <div className="shape-element shape-3"></div>
          </div>
      </div>
        
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="title-area-modern text-center">
                <div className="title-badge">
                  <i className="fas fa-wrench me-2"></i>
                  Portfolio Automobile
                </div>
                <h2 className="sec-title-modern">
                  Nos Réalisations d'Excellence
                </h2>
                <p className="title-description">
                  Découvrez nos projets de réparation et d'entretien automobile. 
                  Chaque intervention témoigne de notre expertise et de notre passion pour l'automobile.
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
          <div className="col-12">
              <div className="portfolio-filters-modern">
                <div className="filter-buttons">
                <button
                    className={`filter-btn ${active === 1 ? "active" : ""}`}
                  type="button"
                  onClick={() => handleFilterKeyChange("*", 1)}
                >
                    <i className="fas fa-th-large me-2"></i>
                    Tous les Projets
                </button>
                <button
                    className={`filter-btn ${active === 2 ? "active" : ""}`}
                  type="button"
                  onClick={() => handleFilterKeyChange(".pro1", 2)}
                >
                    <i className="fas fa-tools me-2"></i>
                    Réparation Moteur
                </button>
                <button
                    className={`filter-btn ${active === 3 ? "active" : ""}`}
                  type="button"
                  onClick={() => handleFilterKeyChange(".pro2", 3)}
                >
                    <i className="fas fa-car me-2"></i>
                    Carrosserie
                </button>
                <button
                    className={`filter-btn ${active === 4 ? "active" : ""}`}
                  type="button"
                  onClick={() => handleFilterKeyChange(".pro3", 4)}
                >
                    <i className="fas fa-cog me-2"></i>
                    Entretien
                </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row gy-30 gx-30 filter-container">
            <div className="col-lg-4 filter-item pro1 pro3">
              <div className="portfolio-card-modern image-container">
                <div className="portfolio-image-wrapper">
                  <img src="assets/img/service/service.jpg" alt="Réparation Moteur" />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <div className="project-category">
                        <i className="fas fa-wrench me-2"></i>
                        Réparation Moteur
                      </div>
                      <Link to="/project-details" className="view-project-btn">
                        <i className="fas fa-eye me-2"></i>
                        Voir le Projet
                      </Link>
                    </div>
                  </div>
                  <div className="project-badge">
                    <i className="fas fa-star"></i>
          </div>
        </div>
                <div className="portfolio-content-modern">
                  <div className="project-meta">
                    <span className="project-type">Nos Réalisations</span>
                    <span className="project-date">Mars 2024</span>
              </div>
                  <h4 className="project-title">
                    <Link to="/project-details">
                      Restauration Moteur V8 Classic
                    </Link>
                  </h4>
                  <p className="project-description">
                    Restauration complète d'un moteur V8 avec remplacement des pièces d'usure et optimisation des performances.
                  </p>
                  <div className="project-stats">
                    <div className="stat-item">
                      <i className="fas fa-clock me-1"></i>
                      <span>15 jours</span>
                    </div>
                    <div className="stat-item">
                      <i className="fas fa-check-circle me-1"></i>
                      <span>Terminé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 filter-item pro2 pro4">
              <div className="portfolio-card-modern image-container">
                <div className="portfolio-image-wrapper">
                  <img src="assets/img/service/service.jpg" alt="Réparation Carrosserie" />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <div className="project-category">
                        <i className="fas fa-car me-2"></i>
                        Carrosserie
                      </div>
                      <Link to="/project-details" className="view-project-btn">
                        <i className="fas fa-eye me-2"></i>
                        Voir le Projet
                      </Link>
                    </div>
                  </div>
                  <div className="project-badge">
                    <i className="fas fa-award"></i>
            </div>
          </div>
                <div className="portfolio-content-modern">
                  <div className="project-meta">
                    <span className="project-type">Nos Réalisations</span>
                    <span className="project-date">Février 2024</span>
              </div>
                  <h4 className="project-title">
                    <Link to="/project-details">
                      Rénovation Carrosserie Sport
                    </Link>
                  </h4>
                  <p className="project-description">
                    Réparation et peinture complète d'une carrosserie avec traitement anti-corrosion et finition premium.
                  </p>
                  <div className="project-stats">
                    <div className="stat-item">
                      <i className="fas fa-clock me-1"></i>
                      <span>10 jours</span>
                    </div>
                    <div className="stat-item">
                      <i className="fas fa-check-circle me-1"></i>
                      <span>Terminé</span>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 filter-item pro3 pro1">
              <div className="portfolio-card-modern image-container">
                <div className="portfolio-image-wrapper">
                  <img src="assets/img/service/service.jpg" alt="Entretien Préventif" />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <div className="project-category">
                        <i className="fas fa-cog me-2"></i>
                        Entretien
                      </div>
                      <Link to="/project-details" className="view-project-btn">
                        <i className="fas fa-eye me-2"></i>
                        Voir le Projet
                      </Link>
                    </div>
                  </div>
                  <div className="project-badge">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                </div>
                <div className="portfolio-content-modern">
                  <div className="project-meta">
                    <span className="project-type">Nos Réalisations</span>
                    <span className="project-date">Janvier 2024</span>
              </div>
                  <h4 className="project-title">
                    <Link to="/project-details">
                      Entretien Complet Véhicule Luxe
                    </Link>
                  </h4>
                  <p className="project-description">
                    Service d'entretien complet incluant vidange, révision générale et diagnostic électronique avancé.
                  </p>
                  <div className="project-stats">
                    <div className="stat-item">
                      <i className="fas fa-clock me-1"></i>
                      <span>3 jours</span>
                    </div>
                    <div className="stat-item">
                      <i className="fas fa-check-circle me-1"></i>
                      <span>Terminé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 filter-item pro4 pro2">
              <div className="portfolio-card-modern image-container">
                <div className="portfolio-image-wrapper">
                  <img src="assets/img/service/service.jpg" alt="Diagnostic Électronique" />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <div className="project-category">
                        <i className="fas fa-laptop me-2"></i>
                        Diagnostic
                      </div>
                      <Link to="/project-details" className="view-project-btn">
                        <i className="fas fa-eye me-2"></i>
                        Voir le Projet
                      </Link>
                    </div>
                  </div>
                  <div className="project-badge">
                    <i className="fas fa-microchip"></i>
            </div>
          </div>
                <div className="portfolio-content-modern">
                  <div className="project-meta">
                    <span className="project-type">Nos Réalisations</span>
                    <span className="project-date">Décembre 2023</span>
              </div>
                  <h4 className="project-title">
                    <Link to="/project-details">
                      Diagnostic Électronique Avancé
                    </Link>
                  </h4>
                  <p className="project-description">
                    Diagnostic complet des systèmes électroniques avec réparation des modules défaillants et mise à jour logicielle.
                  </p>
                  <div className="project-stats">
                    <div className="stat-item">
                      <i className="fas fa-clock me-1"></i>
                      <span>2 jours</span>
                    </div>
                    <div className="stat-item">
                      <i className="fas fa-check-circle me-1"></i>
                      <span>Terminé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 filter-item pro4 pro1">
              <div className="portfolio-card-modern image-container">
                <div className="portfolio-image-wrapper">
                  <img src="assets/img/service/service.jpg" alt="Transmission" />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <div className="project-category">
                        <i className="fas fa-cogs me-2"></i>
                        Transmission
                      </div>
                      <Link to="/project-details" className="view-project-btn">
                        <i className="fas fa-eye me-2"></i>
                        Voir le Projet
                      </Link>
                    </div>
                  </div>
                  <div className="project-badge">
                    <i className="fas fa-medal"></i>
            </div>
          </div>
                <div className="portfolio-content-modern">
                  <div className="project-meta">
                    <span className="project-type">Nos Réalisations</span>
                    <span className="project-date">Novembre 2023</span>
              </div>
                  <h4 className="project-title">
                    <Link to="/project-details">
                      Réparation Boîte de Vitesses
                    </Link>
                  </h4>
                  <p className="project-description">
                    Révision complète de la boîte de vitesses automatique avec remplacement des composants hydrauliques.
                  </p>
                  <div className="project-stats">
                    <div className="stat-item">
                      <i className="fas fa-clock me-1"></i>
                      <span>8 jours</span>
                    </div>
                    <div className="stat-item">
                      <i className="fas fa-check-circle me-1"></i>
                      <span>Terminé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 filter-item pro4 pro2 pro3">
              <div className="portfolio-card-modern image-container">
                <div className="portfolio-image-wrapper">
                  <img src="assets/img/service/service.jpg" alt="Restauration Complète" />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <div className="project-category">
                        <i className="fas fa-magic me-2"></i>
                        Restauration
                      </div>
                      <Link to="/project-details" className="view-project-btn">
                        <i className="fas fa-eye me-2"></i>
                        Voir le Projet
                      </Link>
                    </div>
                  </div>
                  <div className="project-badge premium">
                    <i className="fas fa-crown"></i>
            </div>
          </div>
                <div className="portfolio-content-modern">
                  <div className="project-meta">
                    <span className="project-type">Nos Réalisations</span>
                    <span className="project-date">Octobre 2023</span>
              </div>
                  <h4 className="project-title">
                    <Link to="/project-details">
                      Restauration Véhicule de Collection
                    </Link>
                  </h4>
                  <p className="project-description">
                    Restauration complète d'un véhicule de collection avec remise à neuf de tous les systèmes mécaniques et esthétiques.
                  </p>
                  <div className="project-stats">
                    <div className="stat-item">
                      <i className="fas fa-clock me-1"></i>
                      <span>45 jours</span>
                    </div>
                    <div className="stat-item">
                      <i className="fas fa-crown me-1"></i>
                      <span>Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .portfolio-area-modern {
          padding: 80px 0;
          position: relative;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          overflow: hidden;
        }

        .portfolio-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .portfolio-shape-modern {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape-element {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(153, 27, 27, 0.05));
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 15%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .container {
          position: relative;
          z-index: 2;
        }

        .title-area-modern {
          margin-bottom: 60px;
        }

        .title-badge {
          display: inline-block;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          padding: 10px 25px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
        }

        .sec-title-modern {
          font-size: 2.8rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .title-description {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .portfolio-filters-modern {
          margin-bottom: 50px;
        }

        .filter-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: white;
          color: #6b7280;
          border: 2px solid #e5e7eb;
          padding: 12px 25px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .filter-btn:hover {
          background: #ef4444;
          color: white;
          border-color: #ef4444;
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(239, 68, 68, 0.3);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          border-color: #ef4444;
          box-shadow: 0 5px 20px rgba(239, 68, 68, 0.4);
        }

        .portfolio-card-modern {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .portfolio-card-modern:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .portfolio-image-wrapper {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .portfolio-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .portfolio-card-modern:hover .portfolio-image-wrapper img {
          transform: scale(1.1);
        }

        .portfolio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(153, 27, 27, 0.9));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .portfolio-card-modern:hover .portfolio-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
          color: white;
        }

        .project-category {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 15px;
          opacity: 0.9;
        }

        .view-project-btn {
          background: white;
          color: #ef4444;
          padding: 10px 20px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }

        .view-project-btn:hover {
          background: #f8f9fa;
          color: #dc2626;
          transform: scale(1.05);
        }

        .project-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #333;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
        }

        .project-badge.premium {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          box-shadow: 0 3px 10px rgba(139, 92, 246, 0.3);
        }

        .portfolio-content-modern {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .project-type {
          background: #f3f4f6;
          color: #6b7280;
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .project-date {
          color: #9ca3af;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .project-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .project-title a {
          color: #1f2937;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .project-title a:hover {
          color: #ef4444;
        }

        .project-description {
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
        }

        .project-stats {
          display: flex;
          gap: 20px;
          padding-top: 15px;
          border-top: 1px solid #f3f4f6;
        }

        .stat-item {
          display: flex;
          align-items: center;
          color: #6b7280;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .stat-item i {
          color: #ef4444;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .portfolio-area-modern {
            padding: 60px 0;
          }

          .sec-title-modern {
            font-size: 2.2rem;
          }

          .title-description {
            font-size: 1rem;
          }

          .filter-buttons {
            gap: 10px;
          }

          .filter-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .portfolio-image-wrapper {
            height: 200px;
          }

          .portfolio-content-modern {
            padding: 20px;
          }

          .project-stats {
            flex-direction: column;
            gap: 10px;
          }
        }

        @media (max-width: 576px) {
          .sec-title-modern {
            font-size: 1.8rem;
          }

          .filter-buttons {
            flex-direction: column;
            align-items: center;
          }

          .filter-btn {
            width: 100%;
            max-width: 250px;
            justify-content: center;
          }

          .project-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioOne;
