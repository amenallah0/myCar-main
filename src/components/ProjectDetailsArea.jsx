import React from "react";
import { Link } from "react-router-dom";

const ProjectDetailsArea = () => {
  return (
    <>
      <div className="project-details-area-modern">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
              <div className="project-details-wrapper">
                <div className="project-hero-image">
                <img
                  src="assets/img/service/service.jpg"
                    alt="Restauration Moteur V8 Classic"
                />
                  <div className="project-badge-overlay">
                    <div className="project-status completed">
                      <i className="fas fa-check-circle me-2"></i>
                      Projet Terminé
                    </div>
                    <div className="project-category">
                      <i className="fas fa-wrench me-2"></i>
                      Réparation Moteur
              </div>
                  </div>
                </div>

                <div className="row gx-40 mt-50">
                  <div className="col-xxl-8 col-lg-7">
                    <div className="project-content-modern">
                      <div className="project-header">
                        <h2 className="project-title-modern">
                          Restauration Moteur V8 Classic
                        </h2>
                        <p className="project-subtitle">
                          Une restauration complète qui redonne vie à un moteur d'exception
                        </p>
                      </div>

                      <div className="project-description">
                        <p className="lead-text">
                          Ce projet de restauration moteur représente l'excellence de notre savoir-faire automobile. 
                          Nous avons entièrement restauré un moteur V8 classique, en remplaçant toutes les pièces d'usure 
                          et en optimisant les performances pour retrouver la puissance d'origine.
                        </p>
                        
                        <p>
                          Notre équipe d'experts a procédé à un démontage complet du moteur, suivi d'un diagnostic 
                          approfondi de chaque composant. Chaque pièce a été inspectée, nettoyée ou remplacée selon 
                          les standards les plus élevés de l'industrie automobile.
                        </p>
                      </div>

                      <div className="project-features">
                        <h3 className="section-title-modern">
                          <i className="fas fa-cogs me-3"></i>
                          Services Réalisés
                        </h3>
                        <div className="features-grid">
                          <div className="feature-item">
                            <div className="feature-icon">
                              <i className="fas fa-tools"></i>
                            </div>
                            <div className="feature-content">
                              <h4>Démontage Complet</h4>
                              <p>Démontage méticuleux de tous les composants du moteur</p>
                            </div>
                          </div>
                          <div className="feature-item">
                            <div className="feature-icon">
                              <i className="fas fa-search"></i>
                            </div>
                            <div className="feature-content">
                              <h4>Diagnostic Approfondi</h4>
                              <p>Inspection détaillée de chaque pièce et composant</p>
                            </div>
                          </div>
                          <div className="feature-item">
                            <div className="feature-icon">
                              <i className="fas fa-sync-alt"></i>
                            </div>
                            <div className="feature-content">
                              <h4>Remplacement Pièces</h4>
                              <p>Installation de pièces neuves et de qualité premium</p>
                            </div>
                          </div>
                          <div className="feature-item">
                            <div className="feature-icon">
                              <i className="fas fa-tachometer-alt"></i>
                            </div>
                            <div className="feature-content">
                              <h4>Optimisation Performance</h4>
                              <p>Réglages précis pour des performances optimales</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="project-process">
                        <h3 className="section-title-modern">
                          <i className="fas fa-list-ol me-3"></i>
                          Processus de Restauration
                        </h3>
                        <div className="process-timeline">
                          <div className="timeline-item">
                            <div className="timeline-marker">1</div>
                            <div className="timeline-content">
                              <h4>Évaluation Initiale</h4>
                              <p>Diagnostic complet et évaluation de l'état du moteur</p>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-marker">2</div>
                            <div className="timeline-content">
                              <h4>Démontage Systématique</h4>
                              <p>Démontage méthodique avec documentation photographique</p>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-marker">3</div>
                            <div className="timeline-content">
                              <h4>Nettoyage et Inspection</h4>
                              <p>Nettoyage professionnel et inspection de chaque composant</p>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-marker">4</div>
                            <div className="timeline-content">
                              <h4>Remontage et Tests</h4>
                              <p>Remontage précis et tests de performance complets</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="project-gallery">
                        <h3 className="section-title-modern">
                          <i className="fas fa-images me-3"></i>
                          Galerie du Projet
                  </h3>
                  <div className="row gy-30">
                    <div className="col-md-6">
                            <div className="gallery-item">
                        <img
                  src="assets/img/service/service.jpg"
                                alt="Avant Restauration"
                        />
                              <div className="gallery-overlay">
                                <div className="gallery-content">
                                  <h4>Avant Restauration</h4>
                                  <p>État initial du moteur</p>
                                </div>
                              </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                            <div className="gallery-item">
                        <img
                  src="assets/img/service/service.jpg"
                                alt="Après Restauration"
                              />
                              <div className="gallery-overlay">
                                <div className="gallery-content">
                                  <h4>Après Restauration</h4>
                                  <p>Moteur entièrement restauré</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="project-conclusion">
                        <div className="conclusion-card">
                          <div className="conclusion-icon">
                            <i className="fas fa-award"></i>
                          </div>
                          <div className="conclusion-content">
                            <h4>Résultat Exceptionnel</h4>
                            <p>
                              Cette restauration a permis de redonner au moteur V8 toute sa puissance et sa fiabilité d'origine. 
                              Le client a retrouvé les sensations de conduite authentiques avec la tranquillité d'esprit 
                              d'un moteur entièrement restauré selon les standards les plus élevés.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-4 col-lg-5">
                    <aside className="project-sidebar-modern">
                      <div className="sidebar-card project-info-card">
                        <h3 className="card-title">
                          <i className="fas fa-info-circle me-2"></i>
                          Informations Projet
                        </h3>
                        <div className="project-info-list">
                          <div className="info-item">
                            <span className="info-label">
                              <i className="fas fa-tag me-2"></i>
                              Nom du Projet:
                            </span>
                            <span className="info-value">Restauration Moteur V8</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">
                              <i className="fas fa-user me-2"></i>
                              Technicien Principal:
                            </span>
                            <span className="info-value">Ahmed Mechanic</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">
                              <i className="fas fa-calendar me-2"></i>
                              Date de Réalisation:
                            </span>
                            <span className="info-value">15 Mars 2024</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">
                              <i className="fas fa-clock me-2"></i>
                              Durée:
                            </span>
                            <span className="info-value">15 jours</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">
                              <i className="fas fa-tags me-2"></i>
                              Catégorie:
                            </span>
                            <span className="info-value">Réparation Moteur</span>
                          </div>
                          <div className="info-item highlight">
                            <span className="info-label">
                              <i className="fas fa-euro-sign me-2"></i>
                              Valeur du Projet:
                            </span>
                            <span className="info-value">2 500 €</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">
                              <i className="fas fa-star me-2"></i>
                              Évaluation Client:
                            </span>
                            <div className="rating-stars">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <span className="rating-text">(5.0/5)</span>
                </div>
                          </div>
                        </div>
                      </div>

                      <div className="sidebar-card contact-card">
                        <div className="contact-content">
                          <div className="contact-icon">
                            <i className="fas fa-wrench"></i>
                    </div>
                          <h4 className="contact-title">Besoin d'une Restauration ?</h4>
                          <h3 className="contact-subtitle">
                            Expertise Automobile Premium
                        </h3>
                          <p className="contact-description">
                            Confiez-nous votre projet de restauration automobile. 
                            Notre équipe d'experts vous accompagne pour redonner vie à votre véhicule.
                          </p>
                          <div className="contact-features">
                            <div className="contact-feature">
                              <i className="fas fa-check me-2"></i>
                              Diagnostic gratuit
                            </div>
                            <div className="contact-feature">
                              <i className="fas fa-check me-2"></i>
                              Devis détaillé
                            </div>
                            <div className="contact-feature">
                              <i className="fas fa-check me-2"></i>
                              Garantie 2 ans
                            </div>
                          </div>
                          <Link className="btn-contact-modern" to="/contact">
                            <i className="fas fa-phone me-2"></i>
                            Contactez-nous
                            <i className="fas fa-arrow-right ms-2"></i>
                        </Link>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <style jsx>{`
        .project-details-area-modern {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .project-details-wrapper {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .project-hero-image {
          position: relative;
          height: 500px;
          overflow: hidden;
        }

        .project-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-badge-overlay {
          position: absolute;
          top: 30px;
          left: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .project-status {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
        }

        .project-category {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
        }

        .project-content-modern {
          padding: 50px;
        }

        .project-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .project-title-modern {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 15px;
          line-height: 1.2;
        }

        .project-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          font-weight: 500;
          font-style: italic;
        }

        .project-description {
          margin-bottom: 50px;
        }

        .lead-text {
          font-size: 1.15rem;
          font-weight: 500;
          color: #374151;
          line-height: 1.7;
          margin-bottom: 25px;
          padding: 25px;
          background: #f8f9fa;
          border-radius: 12px;
          border-left: 4px solid #ef4444;
        }

        .project-description p {
          color: #4b5563;
          line-height: 1.7;
          font-size: 1.05rem;
          margin-bottom: 20px;
        }

        .section-title-modern {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
        }

        .section-title-modern i {
          color: #ef4444;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 50px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 25px;
          background: #f8f9fa;
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: #ef4444;
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        }

        .feature-icon {
          background: #ef4444;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .feature-item:hover .feature-icon {
          background: white;
          color: #ef4444;
        }

        .feature-content h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1f2937;
        }

        .feature-item:hover .feature-content h4 {
          color: white;
        }

        .feature-content p {
          font-size: 0.95rem;
          color: #6b7280;
          margin: 0;
        }

        .feature-item:hover .feature-content p {
          color: rgba(255, 255, 255, 0.9);
        }

        .process-timeline {
          margin-bottom: 50px;
        }

        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 30px;
          position: relative;
        }

        .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 24px;
          top: 50px;
          width: 2px;
          height: 40px;
          background: #e5e7eb;
        }

        .timeline-marker {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
        }

        .timeline-content {
          flex: 1;
          padding-top: 5px;
        }

        .timeline-content h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .timeline-content p {
          color: #6b7280;
          font-size: 1rem;
          margin: 0;
        }

        .gallery-item {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          height: 250px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 30px 20px 20px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          transform: translateY(0);
        }

        .gallery-content h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .gallery-content p {
          font-size: 0.9rem;
          opacity: 0.9;
          margin: 0;
        }

        .conclusion-card {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 15px;
          padding: 30px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-top: 50px;
          border-left: 4px solid #ef4444;
        }

        .conclusion-icon {
          background: #ef4444;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .conclusion-content h4 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 15px;
        }

        .conclusion-content p {
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        .project-sidebar-modern {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .sidebar-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          border: 1px solid #f3f4f6;
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          padding-bottom: 15px;
          border-bottom: 2px solid #f3f4f6;
        }

        .card-title i {
          color: #ef4444;
        }

        .project-info-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .info-item:hover {
          background: #ef4444;
          color: white;
          transform: translateX(5px);
        }

        .info-item.highlight {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
        }

        .info-item.highlight:hover {
          transform: scale(1.02);
        }

        .info-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: #6b7280;
          display: flex;
          align-items: center;
        }

        .info-item:hover .info-label {
          color: rgba(255, 255, 255, 0.9);
        }

        .info-item.highlight .info-label {
          color: rgba(255, 255, 255, 0.9);
        }

        .info-value {
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .info-item:hover .info-value {
          color: white;
        }

        .info-item.highlight .info-value {
          color: white;
          font-size: 1.1rem;
        }

        .rating-stars {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .rating-stars i {
          color: #fbbf24;
          font-size: 1rem;
        }

        .rating-text {
          margin-left: 10px;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .info-item:hover .rating-text {
          color: rgba(255, 255, 255, 0.9);
        }

        .contact-content {
          text-align: center;
        }

        .contact-icon {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 25px;
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        }

        .contact-title {
          font-size: 1rem;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .contact-subtitle {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .contact-description {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .contact-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 30px;
        }

        .contact-feature {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22c55e;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .btn-contact-modern {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          padding: 15px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
        }

        .btn-contact-modern:hover {
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .project-details-area-modern {
            padding: 60px 0;
          }

          .project-content-modern {
            padding: 30px;
          }

          .project-title-modern {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .timeline-item {
            flex-direction: column;
            text-align: center;
          }

          .timeline-item::after {
            display: none;
          }

          .conclusion-card {
            flex-direction: column;
            text-align: center;
          }

          .project-badge-overlay {
            position: static;
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10px;
            padding: 20px;
            background: rgba(0, 0, 0, 0.5);
          }

          .project-hero-image {
            height: 300px;
          }
        }

        @media (max-width: 576px) {
          .project-title-modern {
            font-size: 1.8rem;
          }

          .section-title-modern {
            font-size: 1.5rem;
          }

          .sidebar-card {
            padding: 20px;
          }

          .contact-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }

          .project-badge-overlay {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectDetailsArea;
