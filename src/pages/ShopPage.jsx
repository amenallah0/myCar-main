import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderFive";
import FooterAreaOne from "../components/FooterAreaFour";
import SubscribeOne from "../components/SubscribeTwo";
import ShopArea from "../components/ShopArea";
import Preloader from "../helper/Preloader";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from 'swiper/modules';

const ShopPage = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Gestion du preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Gestion du bouton scroll-to-top
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Ajouter le comportement de scroll smooth au document
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // };

  // Animation variants pour les éléments
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{ duration: 0.5 }}
    >
      {/* Preloader */}
      {loading && <Preloader />}

      {/* Header */}
      <HeaderOne />

      {/* Hero Section */}
      <motion.div
        className="shop-hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="animated-bg"></div>
        <div className="hero-overlay"></div>
        <div className="floating-elements">
          <div className="floating-car floating-car-1">🚗</div>
          <div className="floating-car floating-car-2">🚙</div>
          <div className="floating-car floating-car-3">🏎️</div>
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={10} lg={8}>
              <motion.div className="hero-content">
                <motion.div
                  className="hero-badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <i className="fas fa-star"></i>
                  <span>Collection Premium</span>
                </motion.div>
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.4,
                    ease: "easeOut"
                  }}
                  className="hero-title"
                >
                  Découvrez Notre <span className="highlight">Collection</span> 
                  <br />de Voitures d'Exception
                </motion.h1>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.6,
                    ease: "easeOut"
                  }}
                  className="hero-subtitle"
                >
                  Explorez notre sélection exclusive de véhicules de qualité supérieure, 
                  soigneusement choisis pour répondre à tous vos besoins et désirs automobiles.
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.8,
                    ease: "easeOut"
                  }}
                  className="hero-buttons"
                >
                  <a href="#shop-section" className="hero-btn primary">
                    <i className="fas fa-search"></i>
                    <span>Explorer la Collection</span>
                  </a>
                </motion.div>
                <motion.div
                  className="hero-stats"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 1,
                    ease: "easeOut"
                  }}
                >
                  <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Véhicules</div>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Marques</div>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Satisfaction</div>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
        
      </motion.div>

      {/* Shop Area with Animation */}
      <motion.div
        id="shop-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ShopArea />
      </motion.div>

      {/* Subscribe Section with Animation */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <SubscribeOne />
      </motion.div> */}

      {/* Footer */}
      <FooterAreaOne />

      {/* Scroll to Top Button */}
      {/* {showScrollTop && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#E8092E',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}
        >
          <i className="fas fa-arrow-up"></i>
        </motion.button>
      )} */}

      {/* Custom CSS */}
      <style jsx>{`
        .shop-hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        }

        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("/assets/img/shop-hero-bg.jpg") center/cover;
          z-index: 1;
          opacity: 0.15;
          animation: subtleFloat 20s ease-in-out infinite;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(239, 68, 68, 0.1) 0%,
            rgba(153, 27, 27, 0.3) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          z-index: 2;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          pointer-events: none;
        }

        .floating-car {
          position: absolute;
          font-size: 2rem;
          opacity: 0.1;
          animation: floatCar 15s ease-in-out infinite;
        }

        .floating-car-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-car-2 {
          top: 60%;
          right: 15%;
          animation-delay: 5s;
        }

        .floating-car-3 {
          top: 80%;
          left: 20%;
          animation-delay: 10s;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(153, 27, 27, 0.1));
          animation: floatShape 12s ease-in-out infinite;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          top: 15%;
          right: 20%;
          animation-delay: 2s;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          top: 70%;
          left: 15%;
          animation-delay: 7s;
        }

        .shape-3 {
          width: 80px;
          height: 80px;
          top: 40%;
          right: 10%;
          animation-delay: 12s;
        }

        @keyframes subtleFloat {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(1deg); }
        }

        @keyframes floatCar {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.2; }
        }

        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }

        .hero-content {
          position: relative;
          z-index: 3;
          padding: 80px 0;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 30px;
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.2);
        }

        .hero-badge i {
          color: #fbbf24;
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 30px;
          line-height: 1.1;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          letter-spacing: -0.02em;
        }

        .highlight {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
        }

        .highlight::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ef4444, #991b1b);
          border-radius: 2px;
          animation: underlineGlow 3s ease-in-out infinite;
        }

        @keyframes underlineGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.5); }
          50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.8); }
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 50px;
          line-height: 1.6;
          font-weight: 400;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .hero-btn {
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          overflow: hidden;
          min-width: 200px;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .hero-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .hero-btn:hover::before {
          left: 100%;
        }

        .hero-btn.primary {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          box-shadow: 0 8px 30px rgba(239, 68, 68, 0.4);
          border: 2px solid transparent;
        }

        .hero-btn.primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 40px rgba(239, 68, 68, 0.6);
          color: white;
        }

        .hero-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .hero-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 40px rgba(255, 255, 255, 0.2);
          color: white;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          margin-top: 40px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .stat-item {
          text-align: center;
          color: white;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ef4444;
          text-shadow: 0 2px 10px rgba(239, 68, 68, 0.5);
          margin-bottom: 5px;
          animation: countUp 2s ease-out;
        }

        .stat-label {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-divider {
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3), transparent);
        }

        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.7);
          z-index: 3;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-scroll-indicator:hover {
          color: #ef4444;
          transform: translateX(-50%) translateY(-5px);
        }

        .scroll-arrow {
          width: 40px;
          height: 40px;
          border: 2px solid currentColor;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bounce 2s infinite;
        }

        .hero-scroll-indicator span {
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .shop-hero-section {
            min-height: 90vh;
            padding: 20px 0;
          }

          .hero-content {
            padding: 40px 0;
          }

          .hero-title {
            font-size: 2.5rem;
            margin-bottom: 20px;
          }

          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 30px;
            padding: 0 10px;
          }

          .hero-buttons {
            flex-direction: column;
            gap: 15px;
            margin-bottom: 40px;
          }

          .hero-btn {
            width: 100%;
            max-width: 280px;
            padding: 14px 24px;
            font-size: 1rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            margin: 0 10px;
          }

          .stat-divider {
            width: 40px;
            height: 2px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .floating-car, .floating-shape {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.8rem;
            padding: 6px 16px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-stats {
            gap: 15px;
            padding: 15px;
          }
        }

        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          .animated-bg,
          .floating-car,
          .floating-shape,
          .hero-badge i,
          .highlight::after,
          .scroll-arrow {
            animation: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .hero-title {
            text-shadow: none;
          }
          
          .hero-subtitle {
            text-shadow: none;
          }
          
          .hero-stats {
            border: 2px solid white;
          }
        }
      `}</style>

      {/* Global CSS */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Scrollbar personnalisée */
        * {
          scrollbar-width: thin;
          scrollbar-color: #ef4444 rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #dc2626, #7f1d1d);
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
        }

        /* Amélioration des focus states pour l'accessibilité */
        button:focus,
        a:focus {
          outline: 2px solid #ef4444;
          outline-offset: 2px;
        }

        /* Optimisation des transitions globales */
        * {
          transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, 
                      transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
        }

        /* Amélioration de la lisibilité */
        .container, .container-fluid {
          max-width: 1400px;
        }

        /* Styles pour les sections suivantes */
        .shop-area {
          padding-top: 0;
          background: linear-gradient(to bottom, #f8fafc, #ffffff);
        }

        /* Animation d'entrée pour les éléments */
        .fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }

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

        /* Amélioration des cartes de voitures */
        .car-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .car-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        /* Amélioration des boutons globaux */
        .btn-primary {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #dc2626, #7f1d1d);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
        }

        /* Amélioration des formulaires */
        .form-control {
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          padding: 12px 16px;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        /* Amélioration des modals */
        .modal-content {
          border-radius: 20px;
          border: none;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          border-bottom: 1px solid #f1f5f9;
          padding: 24px;
        }

        .modal-body {
          padding: 24px;
        }

        /* Amélioration des alertes et toasts */
        .alert {
          border-radius: 12px;
          border: none;
          padding: 16px 20px;
        }

        /* Support pour le mode sombre */
        @media (prefers-color-scheme: dark) {
          .shop-area {
            background: linear-gradient(to bottom, #1f2937, #111827);
          }
        }

        /* Optimisation pour les écrans haute résolution */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .hero-title {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ShopPage;
