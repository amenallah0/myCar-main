import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";

const BlogAreaTwo = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Guide Complet pour Acheter sa Première Voiture",
      excerpt: "Découvrez tous les conseils essentiels pour faire le bon choix lors de l'achat de votre première voiture. De l'évaluation du budget aux critères de sélection.",
      image: "assets/img/blog/blog.jpg",
      date: { day: "15", month: "Déc" },
      author: "Expert Auto",
      comments: 12,
      category: "Guide d'Achat",
      readTime: "5 min",
      slug: "guide-achat-premiere-voiture"
    },
    {
      id: 2,
      title: "Les Tendances Automobiles 2024",
      excerpt: "Explorez les dernières innovations et tendances qui façonnent l'industrie automobile en 2024. Véhicules électriques, conduite autonome et plus encore.",
      image: "assets/img/blog/blog.jpg",
      date: { day: "12", month: "Déc" },
      author: "Tech Auto",
      comments: 8,
      category: "Innovation",
      readTime: "7 min",
      slug: "tendances-automobiles-2024"
    },
    {
      id: 3,
      title: "Entretien Automobile : Les Bases Essentielles",
      excerpt: "Apprenez les gestes simples pour maintenir votre véhicule en parfait état. Conseils pratiques pour prolonger la durée de vie de votre voiture.",
      image: "assets/img/blog/blog.jpg",
      date: { day: "10", month: "Déc" },
      author: "Mécanicien Pro",
      comments: 15,
      category: "Entretien",
      readTime: "6 min",
      slug: "entretien-automobile-bases"
    },
    {
      id: 4,
      title: "Voitures Électriques vs Hybrides : Que Choisir ?",
      excerpt: "Comparaison détaillée entre véhicules électriques et hybrides. Avantages, inconvénients et conseils pour faire le meilleur choix selon vos besoins.",
      image: "assets/img/blog/blog.jpg",
      date: { day: "08", month: "Déc" },
      author: "Éco Auto",
      comments: 20,
      category: "Écologie",
      readTime: "8 min",
      slug: "electrique-vs-hybride"
    },
    {
      id: 5,
      title: "Négociation d'Achat : Techniques et Astuces",
      excerpt: "Maîtrisez l'art de la négociation pour obtenir le meilleur prix lors de l'achat de votre véhicule. Stratégies éprouvées par les professionnels.",
      image: "assets/img/blog/blog.jpg",
      date: { day: "05", month: "Déc" },
      author: "Négociateur Pro",
      comments: 9,
      category: "Conseils",
      readTime: "4 min",
      slug: "techniques-negociation-achat"
    },
    {
      id: 6,
      title: "Assurance Auto : Comment Bien Choisir ?",
      excerpt: "Guide complet pour sélectionner la meilleure assurance automobile. Comparaison des garanties, tarifs et conseils pour économiser.",
      image: "assets/img/blog/blog.jpg",
      date: { day: "03", month: "Déc" },
      author: "Assurance Expert",
      comments: 11,
      category: "Assurance",
      readTime: "6 min",
      slug: "choisir-assurance-auto"
    }
  ];

  return (
    <>
      <style jsx>{`
        .blog-area-modern {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 5rem 0;
          position: relative;
          overflow: hidden;
        }

        .blog-area-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="blog-pattern" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.5" fill="rgba(239, 68, 68, 0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23blog-pattern)"/></svg>');
          opacity: 0.6;
        }

        .blog-content-wrapper {
          position: relative;
          z-index: 2;
        }

        .blog-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .blog-subtitle {
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

        .blog-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #333 0%, #ef4444 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .blog-description {
          font-size: 1.1rem;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .blog-card-modern {
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          height: 100%;
          position: relative;
          border: 1px solid rgba(239, 68, 68, 0.1);
        }

        .blog-card-modern:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 30px 70px rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .blog-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .blog-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s ease;
          filter: brightness(0.9);
        }

        .blog-card-modern:hover .blog-image {
          transform: scale(1.1);
          filter: brightness(1);
        }

        .blog-category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
          z-index: 2;
        }

        .blog-date-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          color: #333;
          padding: 0.75rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          z-index: 2;
        }

        .blog-date-day {
          font-size: 1.2rem;
          font-weight: 800;
          color: #ef4444;
          display: block;
          line-height: 1;
        }

        .blog-date-month {
          font-size: 0.8rem;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
        }

        .blog-overlay {
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

        .blog-card-modern:hover .blog-overlay {
          opacity: 1;
        }

        .blog-read-btn {
          background: white;
          color: #ef4444;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .blog-read-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .blog-read-btn:hover::before {
          left: 100%;
        }

        .blog-read-btn:hover {
          background: #f8f9fa;
          color: #991b1b;
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
        }

        .blog-content-area {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          height: calc(100% - 250px);
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: #6c757d;
        }

        .blog-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: inherit;
          transition: color 0.3s ease;
        }

        .blog-meta-item:hover {
          color: #ef4444;
        }

        .blog-meta-item i {
          color: #ef4444;
        }

        .blog-post-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.4;
          flex: 1;
        }

        .blog-post-title a {
          color: #333;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .blog-post-title a:hover {
          color: #ef4444;
        }

        .blog-excerpt {
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .blog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #e9ecef;
          margin-top: auto;
        }

        .blog-read-time {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .blog-link-btn {
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

        .blog-link-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .blog-link-btn:hover::before {
          left: 100%;
        }

        .blog-link-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4);
          color: white;
          text-decoration: none;
        }

        .blog-slider-modern {
          padding: 1rem 0 3rem 0;
        }

        .swiper-pagination-bullet {
          background: #ef4444;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          transform: scale(1.2);
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #ef4444;
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #ef4444;
          color: white;
          transform: scale(1.1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 1rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .blog-title {
            font-size: 2rem;
          }
          
          .blog-card-modern {
            margin-bottom: 2rem;
          }
          
          .blog-content-area {
            padding: 1.5rem;
          }
          
          .blog-image-container {
            height: 200px;
          }
        }

        @media (max-width: 576px) {
          .blog-area-modern {
            padding: 3rem 0;
          }
          
          .blog-title {
            font-size: 1.8rem;
          }
          
          .blog-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>

      <section className="blog-area-modern">
        <div className="container blog-content-wrapper">
          <div className="blog-header">
            <div className="blog-subtitle">
              <i className="fas fa-newspaper me-2"></i>
              Blog Automobile
            </div>
            <h2 className="blog-title">
              Actualités & Conseils Auto
            </h2>
            <p className="blog-description">
              Découvrez nos derniers articles, guides d'achat et conseils d'experts 
              pour vous accompagner dans votre passion automobile.
            </p>
          </div>

          <div className="blog-slider-modern">
          <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            loop={true}
              navigation={true}
              spaceBetween={30}
            slidesPerGroup={1}
            speed={1000}
              pagination={{ 
                clickable: true,
                dynamicBullets: true
              }}
              autoplay={{ 
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                  spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                  spaceBetween: 25
              },
              992: {
                slidesPerView: 3,
                  spaceBetween: 30
              },
              1200: {
                slidesPerView: 3,
                  spaceBetween: 30
                }
              }}
              className="mySwiper"
            >
              {blogPosts.map((post, index) => (
                <SwiperSlide key={post.id}>
                  <div 
                    className="blog-card-modern"
                    onMouseEnter={() => setHoveredCard(post.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="blog-image-container">
                                             <img 
                         src={post.image} 
                         alt={post.title}
                         className="blog-image"
                         onError={(e) => {
                           e.target.onerror = null;
                           e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80';
                         }}
                       />
                      <div className="blog-category-badge">
                        {post.category}
                    </div>
                      <div className="blog-date-badge">
                        <span className="blog-date-day">{post.date.day}</span>
                        <span className="blog-date-month">{post.date.month}</span>
                  </div>
                                             <div className="blog-overlay">
                         <Link 
                           to="/blog-details" 
                           className="blog-read-btn"
                         >
                           <i className="fas fa-book-open"></i>
                           Lire l'article
                    </Link>
                  </div>
                    </div>
                    
                    <div className="blog-content-area">
                    <div className="blog-meta">
                        <span className="blog-meta-item">
                          <i className="fas fa-user"></i>
                          {post.author}
                        </span>
                        <span className="blog-meta-item">
                          <i className="fas fa-comments"></i>
                          {post.comments} commentaires
                        </span>
                    </div>
                      
                                             <h3 className="blog-post-title">
                      <Link to="/blog-details">
                           {post.title}
                      </Link>
                    </h3>
                      
                      <p className="blog-excerpt">
                        {post.excerpt}
                      </p>
                      
                      <div className="blog-footer">
                        <div className="blog-read-time">
                          <i className="fas fa-clock"></i>
                          {post.readTime}
                  </div>
                                                 <Link 
                           className="blog-link-btn" 
                           to="/blog-details"
                         >
                           Lire la suite
                           <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
    </>
  );
};

export default BlogAreaTwo;
