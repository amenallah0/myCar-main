import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderFive";
import FooterAreaOne from "../components/FooterAreaFour";
import Breadcrumb from "../components/Breadcrumb";
import SubscribeOne from "../components/SubscribeTwo";
import ProjectDetailsArea from "../components/ProjectDetailsArea";
import Preloader from "../helper/Preloader";

const ProjectDetailsPage = () => {
  let [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setActive(false);
    }, 2000);
  }, []);

  return (
    <>
      {/* Preloader */}
      {active === true && <Preloader />}

      {/* Header */}
      <HeaderOne />

      {/* Modern Hero Section */}
      <div className="project-details-hero">
        <div className="hero-background">
          <div className="hero-shapes">
            <div className="shape-element shape-1"></div>
            <div className="shape-element shape-2"></div>
            <div className="shape-element shape-3"></div>
          </div>
        </div>
        
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="hero-content text-center">
                <div className="hero-badge">
                  <i className="fas fa-tools me-2"></i>
                  Détails du Projet
                </div>
                <h1 className="hero-title">
                  Découvrez Nos Réalisations d'Excellence
                </h1>
                <p className="hero-description">
                  Explorez en détail nos projets de réparation et d'entretien automobile. 
                  Chaque intervention témoigne de notre savoir-faire et de notre engagement qualité.
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Projets Réalisés</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Satisfaction Client</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">15+</div>
                    <div className="stat-label">Années d'Expérience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Breadcrumb */}
      <div className="modern-breadcrumb">
        <div className="container">
          <div className="breadcrumb-content">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb-modern">
                <li className="breadcrumb-item">
                  <a href="/">
                    <i className="fas fa-home me-2"></i>
                    Accueil
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/portfolio">
                    <i className="fas fa-briefcase me-2"></i>
                    Portfolio
                  </a>
                </li>
                <li className="breadcrumb-item active">
                  <i className="fas fa-eye me-2"></i>
                  Détails du Projet
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Project Details Area */}
      <ProjectDetailsArea />

      {/* Subscribe Section */}
      {/* <SubscribeOne /> */}

      {/* Footer */}
      <FooterAreaOne />

      <style jsx>{`
        .project-details-hero {
          padding: 120px 0 80px;
          position: relative;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          overflow: hidden;
          color: white;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .hero-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape-element {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 8s ease-in-out infinite;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: -50px;
          right: -50px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          bottom: -30px;
          left: -30px;
          animation-delay: 3s;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: 10%;
          animation-delay: 6s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 1;
          }
        }

        .container {
          position: relative;
          z-index: 2;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 12px 30px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 25px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .hero-title {
          font-size: 3.2rem;
          font-weight: 700;
          margin-bottom: 25px;
          line-height: 1.2;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 40px;
          opacity: 0.95;
          font-weight: 400;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 50px;
          margin-top: 50px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .stat-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.2);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: white;
        }

        .stat-label {
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .modern-breadcrumb {
          background: white;
          padding: 20px 0;
          border-bottom: 1px solid #f3f4f6;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .breadcrumb-content {
          display: flex;
          align-items: center;
        }

        .breadcrumb-modern {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          list-style: none;
          background: none;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .breadcrumb-item + .breadcrumb-item::before {
          content: ">";
          margin: 0 15px;
          color: #9ca3af;
          font-weight: 600;
        }

        .breadcrumb-item a {
          color: #6b7280;
          text-decoration: none;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
        }

        .breadcrumb-item a:hover {
          color: #ef4444;
        }

        .breadcrumb-item.active {
          color: #ef4444;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .breadcrumb-item i {
          font-size: 0.85rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .project-details-hero {
            padding: 100px 0 60px;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 20px;
            align-items: center;
          }

          .stat-item {
            min-width: 200px;
          }

          .shape-1 {
            width: 200px;
            height: 200px;
          }

          .shape-2 {
            width: 150px;
            height: 150px;
          }

          .shape-3 {
            width: 100px;
            height: 100px;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-badge {
            font-size: 0.9rem;
            padding: 10px 25px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .stat-label {
            font-size: 0.8rem;
          }

          .breadcrumb-modern {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .breadcrumb-item + .breadcrumb-item::before {
            display: none;
          }

          .breadcrumb-item {
            width: 100%;
          }
        }

        /* Animation for page load */
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

        .hero-content {
          animation: fadeInUp 0.8s ease-out;
        }

        .hero-badge {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .hero-title {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .hero-description {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .hero-stats {
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }
      `}</style>
    </>
  );
};

export default ProjectDetailsPage;
