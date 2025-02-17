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
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
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
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/assets/img/shop-hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0',
          marginBottom: '50px'
        }}
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ color: '#fff', marginBottom: '20px' }}
              >
                Découvrez Notre Collection de Voitures
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ color: '#fff', fontSize: '1.2rem' }}
              >
                Trouvez la voiture de vos rêves parmi notre sélection exclusive
              </motion.p>
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
          overflow: hidden;
        }
        
        .shop-hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1;
        }
        
        .shop-hero-section .container {
          position: relative;
          z-index: 2;
        }
        
        .scroll-to-top:hover {
          background: #c7082a;
        }
        
        @media (max-width: 768px) {
          .shop-hero-section {
            padding: 60px 0;
          }
          
          .shop-hero-section h1 {
            font-size: 2rem;
          }
          
          .shop-hero-section p {
            font-size: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ShopPage;
