import React, { useEffect, useState } from "react";
import Header from "../components/HeaderFive";
import FooterAreaOne from "../components/FooterAreaFour";
import Breadcrumb from "../components/Breadcrumb";
import SubscribeOne from "../components/SubscribeTwo";
import BlogDetails from "../components/BlogDetails";
import Preloader from "../helper/Preloader";

const BlogDetailsPage = () => {
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

      <Header />

      {/* Modern Hero Section */}
      <div className="blog-hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-newspaper me-2"></i>
              Blog & Actualités
            </div>
            <h1 className="hero-title">
              Découvrez nos derniers articles
            </h1>
            <p className="hero-subtitle">
              Restez informé des dernières tendances automobiles, conseils d'experts et actualités du secteur
            </p>
          </div>
        </div>
      </div>

      {/* Blog Details with Modern Container */}
      <div className="blog-content-wrapper">
        <div className="container">
          <div className="blog-content-card">
            <BlogDetails />
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      {/* <div className="subscribe-wrapper">
        <SubscribeOne />
      </div> */}

      {/* Footer */}
      <FooterAreaOne />

      <style jsx>{`
        .blog-hero-section {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          padding: 80px 0 60px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .blog-hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0;
          font-weight: 400;
          line-height: 1.6;
        }

        .blog-content-wrapper {
          background: #f8f9fa;
          padding: 60px 0;
          min-height: 60vh;
        }

        .blog-content-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          margin-bottom: 40px;
        }

        .subscribe-wrapper {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 60px 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .blog-hero-section {
            padding: 60px 0 40px;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .blog-content-card {
            padding: 25px;
            border-radius: 15px;
          }

          .blog-content-wrapper {
            padding: 40px 0;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 1.8rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .blog-content-card {
            padding: 20px;
            margin: 0 15px;
          }
        }

        /* Animation pour l'entrée */
        .hero-content {
          animation: fadeInUp 0.8s ease-out;
        }

        .blog-content-card {
          animation: fadeInUp 0.8s ease-out 0.2s both;
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

        /* Amélioration des styles globaux pour le contenu du blog */
        :global(.blog-content-card h1, .blog-content-card h2, .blog-content-card h3) {
          color: #1f2937;
          font-weight: 600;
        }

        :global(.blog-content-card p) {
          color: #4b5563;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        :global(.blog-content-card img) {
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin: 20px 0;
        }

        :global(.blog-content-card .btn) {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          border: none;
          padding: 12px 25px;
          border-radius: 25px;
          color: white;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        :global(.blog-content-card .btn:hover) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
          color: white;
        }
      `}</style>
    </>
  );
};

export default BlogDetailsPage;
