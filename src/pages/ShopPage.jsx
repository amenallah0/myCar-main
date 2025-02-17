import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderFive";
import FooterAreaOne from "../components/FooterAreaFour";
import SubscribeOne from "../components/SubscribeTwo";
import ShopArea from "../components/ShopArea";
import Preloader from "../helper/Preloader";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

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
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <motion.div className="hero-content">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="hero-title"
                >
                  Découvrez Notre <span className="highlight">Collection</span> de Voitures
                </motion.h1>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.3,
                    ease: "easeOut"
                  }}
                  className="hero-subtitle"
                >
                  Trouvez la voiture de vos rêves parmi notre sélection exclusive
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.6,
                    ease: "easeOut"
                  }}
                  className="hero-buttons"
                >
                  
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>

      {/* Shop Area with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ShopArea />
      </motion.div>

      {/* Subscribe Section with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <SubscribeOne />
      </motion.div>

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
          padding: 80px 0 0;
          margin-bottom: 0;
          overflow: hidden;
          background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8));
        }

        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("/assets/img/shop-hero-bg.jpg") center/cover;
          z-index: -1;
          animation: heroAnimation 8s ease-in-out infinite;
          opacity: 0.6;
        }

        .animated-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, 
            rgba(232, 9, 46, 0.3),
            rgba(0, 0, 0, 0.9)
          );
          animation: darkenEffect 8s ease-in-out infinite;
        }

        @keyframes darkenEffect {
          0% {
            opacity: 1;  /* Sombre */
          }
          50% {
            opacity: 0.3;  /* Clair */
          }
          100% {
            opacity: 1;  /* Retour sombre */
          }
        }

        @keyframes heroAnimation {
          0% {
            transform: scale(1);
            filter: brightness(0.3);  /* Très sombre */
          }
          50% {
            transform: scale(1.1);
            filter: brightness(1);  /* Clair */
          }
          100% {
            transform: scale(1);
            filter: brightness(0.3);  /* Retour très sombre */
          }
        }

        .animated-bg::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, transparent 2%),
            radial-gradient(circle at 80% 60%, rgba(255,255,255,0.2) 0%, transparent 2%),
            radial-gradient(circle at 40% 70%, rgba(255,255,255,0.2) 0%, transparent 2%),
            radial-gradient(circle at 60% 20%, rgba(255,255,255,0.2) 0%, transparent 2%);
          animation: particleFloat 8s linear infinite;
        }

        /* Effet de parallaxe au scroll */
        @media (min-width: 768px) {
          .shop-hero-section {
            background-attachment: fixed;
          }
        }

        /* Optimisation mobile */
        @media (max-width: 768px) {
          .shop-hero-section {
            padding: 40px 0 20px;
          }

          .animated-bg {
            opacity: 0.5;
          }
        }

        /* Support pour les navigateurs qui préfèrent moins de mouvement */
        @media (prefers-reduced-motion: reduce) {
          .animated-bg {
            animation: none;
          }
          .animated-bg::before,
          .animated-bg::after {
            animation: none;
          }
        }

        .scroll-to-top:hover {
          background: #c7082a;
        }
        
        @media (max-width: 768px) {
          .shop-hero-section h1 {
            font-size: 2rem;
          }
          
          .shop-hero-section p {
            font-size: 1rem;
          }
        }

        .hero-content {
          padding: 60px 0;
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 25px;
          line-height: 1.2;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.9);
        }

        .highlight {
          color: #E8092E;
          position: relative;
          display: inline-block;
        }

        .highlight::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #E8092E;
          border-radius: 2px;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 40px;
          line-height: 1.6;
          font-weight: 400;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.9);
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
        }

        .hero-btn {
          padding: 15px 35px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hero-btn.primary {
          background: #E8092E;
          color: white;
          box-shadow: 0 4px 15px rgba(232, 9, 46, 0.3);
        }

        .hero-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(232, 9, 46, 0.4);
        }

        .hero-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 30px;
          }

          .hero-buttons {
            flex-direction: column;
            gap: 15px;
          }

          .hero-btn {
            width: 100%;
            justify-content: center;
            padding: 12px 25px;
          }
        }

        /* Ajustement de l'espacement pour la section suivante */
        .shop-area {
          padding-top: 20px;
        }
      `}</style>

      {/* Global CSS */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        /* Pour les navigateurs qui supportent la personnalisation du scroll */
        * {
          scrollbar-width: thin;
          scrollbar-color: #E8092E rgba(0, 0, 0, 0.1);
        }

        /* Personnalisation de la scrollbar pour Chrome/Safari */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background-color: #E8092E;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: #c7082a;
        }
      `}</style>
    </motion.div>
  );
};

export default ShopPage;
