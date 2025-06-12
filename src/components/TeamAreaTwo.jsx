import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs, EffectFade, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const TeamAreaTwo = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Antoine Dubois",
      role: "Directeur Général",
      department: "Direction",
      experience: "15 ans d'expérience",
      speciality: "Stratégie automobile",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Expert en stratégie automobile avec une vision innovante pour l'avenir de MyCar.",
      social: {
        linkedin: "https://linkedin.com/in/antoine-dubois",
        twitter: "https://twitter.com/antoine_dubois",
        email: "antoine.dubois@mycar.fr"
      }
    },
    {
      id: 2,
      name: "Sophie Martin",
      role: "Experte Automobile",
      department: "Expertise Technique",
      experience: "12 ans d'expérience",
      speciality: "Évaluation véhicules",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Spécialiste en évaluation et certification de véhicules d'occasion.",
      social: {
        linkedin: "https://linkedin.com/in/sophie-martin",
        instagram: "https://instagram.com/sophie_auto",
        email: "sophie.martin@mycar.fr"
      }
    },
    {
      id: 3,
      name: "Pierre Rousseau",
      role: "Responsable Commercial",
      department: "Ventes",
      experience: "10 ans d'expérience",
      speciality: "Relation client",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Passionné par la satisfaction client et l'excellence du service.",
      social: {
        linkedin: "https://linkedin.com/in/pierre-rousseau",
        facebook: "https://facebook.com/pierre.rousseau",
        email: "pierre.rousseau@mycar.fr"
      }
    },
    {
      id: 4,
      name: "Marie Leroy",
      role: "Responsable Marketing",
      department: "Marketing Digital",
      experience: "8 ans d'expérience",
      speciality: "Stratégie digitale",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Créative et innovante, elle développe notre présence digitale.",
      social: {
        linkedin: "https://linkedin.com/in/marie-leroy",
        instagram: "https://instagram.com/marie_marketing",
        twitter: "https://twitter.com/marie_leroy"
      }
    },
    {
      id: 5,
      name: "Thomas Bernard",
      role: "Développeur Senior",
      department: "Technologie",
      experience: "9 ans d'expérience",
      speciality: "Développement web",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Architecte de notre plateforme technologique innovante.",
      social: {
        linkedin: "https://linkedin.com/in/thomas-bernard",
        github: "https://github.com/thomas-bernard",
        email: "thomas.bernard@mycar.fr"
      }
    },
    {
      id: 6,
      name: "Isabelle Moreau",
      role: "Service Client",
      department: "Support",
      experience: "7 ans d'expérience",
      speciality: "Assistance client",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Dévouée à offrir un support exceptionnel à nos clients.",
      social: {
        linkedin: "https://linkedin.com/in/isabelle-moreau",
        facebook: "https://facebook.com/isabelle.moreau",
        email: "isabelle.moreau@mycar.fr"
      }
    }
  ];

  return (
    <>
      <style jsx>{`
        .team-area-modern {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .team-area-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="team-pattern" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="1.5" fill="rgba(255, 107, 107, 0.1)"/></defs><rect width="100" height="100" fill="url(%23team-pattern)"/></svg>');
          opacity: 0.6;
        }

        .team-content-wrapper {
          position: relative;
          z-index: 2;
        }

        .team-header-section {
          margin-bottom: 3rem;
        }

        .team-subtitle {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
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

        .team-title {
          font-size: 2.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #333 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .team-description {
          font-size: 1.1rem;
          color: #6c757d;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 500px;
        }

        .team-navigation {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .team-nav-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
        }

        .team-nav-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
        }

        .team-slider-container {
          position: relative;
        }

        .team-card-modern {
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255, 107, 107, 0.1);
          position: relative;
          margin-bottom: 2rem;
        }

        .team-card-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.1), transparent);
          transition: left 0.6s ease;
          z-index: 1;
        }

        .team-card-modern:hover::before {
          left: 100%;
        }

        .team-card-modern:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 30px 70px rgba(255, 107, 107, 0.2);
          border-color: rgba(255, 107, 107, 0.3);
        }

        .team-image-container {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .team-member-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s ease;
        }

        .team-card-modern:hover .team-member-image {
          transform: scale(1.1);
        }

        .team-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 107, 107, 0.8), rgba(238, 90, 82, 0.8));
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .team-card-modern:hover .team-image-overlay {
          opacity: 1;
        }

        .team-social-preview {
          display: flex;
          gap: 1rem;
        }

        .team-social-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: white;
          color: #ff6b6b;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .team-social-icon:hover {
          transform: scale(1.1);
          color: white;
          background: #ff6b6b;
          box-shadow: 0 5px 20px rgba(255, 107, 107, 0.4);
        }

        .team-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 3;
        }

        .team-content {
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        .team-member-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
        }

        .team-card-modern:hover .team-member-name {
          color: #ff6b6b;
        }

        .team-member-role {
          color: #ff6b6b;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .team-member-department {
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .team-member-bio {
          color: #555;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .team-member-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #e9ecef;
        }

        .team-experience {
          font-size: 0.8rem;
          color: #6c757d;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .team-speciality {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .team-contact-btn {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          margin-top: 1rem;
          position: relative;
          overflow: hidden;
        }

        .team-contact-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .team-contact-btn:hover::before {
          left: 100%;
        }

        .team-contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
          color: white;
          text-decoration: none;
        }

        .floating-team-shapes {
          position: absolute;
          top: 20%;
          right: 10%;
          width: 100px;
          height: 100px;
          background: rgba(255, 107, 107, 0.1);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: float 8s ease-in-out infinite;
        }

        .floating-team-shapes:nth-child(2) {
          top: 60%;
          left: 5%;
          width: 80px;
          height: 80px;
          border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          animation-delay: -3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }

        .swiper-pagination-bullet {
          background: rgba(255, 107, 107, 0.5);
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .swiper-pagination-bullet-active {
          background: #ff6b6b;
          transform: scale(1.2);
        }

        @media (max-width: 1200px) {
          .team-header-section {
            text-align: center;
            margin-bottom: 4rem;
          }
          
          .team-navigation {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .team-area-modern {
            padding: 4rem 0;
          }
          
          .team-title {
            font-size: 2rem;
          }
          
          .team-card-modern {
            margin-bottom: 1.5rem;
          }
          
          .team-content {
            padding: 1.5rem;
          }
          
          .team-image-container {
            height: 250px;
          }
        }

        @media (max-width: 576px) {
          .team-title {
            font-size: 1.8rem;
          }
          
          .team-content {
            padding: 1.25rem;
          }
          
          .team-member-stats {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="team-area-modern">
        <div className="floating-team-shapes"></div>
        <div className="floating-team-shapes"></div>
        
        <div className="container team-content-wrapper">
        <div className="row gx-30 justify-content-between align-items-center">
          <div className="col-lg-4">
              <div className="team-header-section">
                <div className="team-subtitle">
                  <i className="fas fa-users me-2"></i>
                  Notre Équipe
                </div>
                <h2 className="team-title">
                  Des Experts Automobiles Passionnés
                </h2>
                <p className="team-description">
                  Découvrez l'équipe MyCar : des professionnels dévoués qui mettent leur expertise 
                  et leur passion automobile au service de votre satisfaction.
                </p>
                <div className="team-navigation">
                  <button className="team-nav-btn team-slider2-prev">
                  <i className="fas fa-arrow-left" />
                </button>
                  <button className="team-nav-btn team-slider2-next">
                  <i className="fas fa-arrow-right" />
                </button>
              </div>
            </div>
          </div>
            
          <div className="col-lg-8">
              <div className="team-slider-container">
              <Swiper
                  modules={[FreeMode, Navigation, Thumbs, EffectFade, Pagination, Autoplay]}
                loop={true}
                navigation={{
                  nextEl: ".team-slider2-next",
                  prevEl: ".team-slider2-prev",
                }}
                  spaceBetween={30}
                slidesPerView={2}
                slidesPerGroup={1}
                speed={1000}
                  pagination={{ 
                    clickable: true,
                    dynamicBullets: true
                  }}
                  autoplay={{ 
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  className="team-swiper"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                  },
                  768: {
                    slidesPerView: 1,
                  },
                  992: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 2,
                  },
                  1400: {
                    slidesPerView: 2,
                  },
                }}
              >
                  {teamMembers.map((member) => (
                    <SwiperSlide key={member.id}>
                      <div 
                        className="team-card-modern"
                        onMouseEnter={() => setHoveredMember(member.id)}
                        onMouseLeave={() => setHoveredMember(null)}
                      >
                        <div className="team-image-container">
                          <div className="team-badge">{member.department}</div>
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="team-member-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=' + member.name.split(' ').map(n => n[0]).join('');
                            }}
                          />
                          <div className="team-image-overlay">
                            <div className="team-social-preview">
                              {Object.entries(member.social).map(([platform, url]) => (
                                <a 
                                  key={platform} 
                                  href={url} 
                                  className="team-social-icon"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className={`fab fa-${platform === 'email' ? 'envelope' : platform}`}></i>
                                </a>
                              ))}
                    </div>
                  </div>
                        </div>
                        
                        <div className="team-content">
                          <h4 className="team-member-name">
                            <Link to="/team-details">{member.name}</Link>
                      </h4>
                          <div className="team-member-role">{member.role}</div>
                          <div className="team-member-department">
                            <i className="fas fa-building"></i>
                            {member.department}
                        </div>
                          <p className="team-member-bio">{member.bio}</p>
                          
                          <div className="team-member-stats">
                            <div className="team-experience">
                              <i className="fas fa-clock"></i>
                              {member.experience}
                      </div>
                            <div className="team-speciality">{member.speciality}</div>
                    </div>
                          
                          <Link to="/contact" className="team-contact-btn">
                            <i className="fas fa-envelope"></i>
                            Contacter
                          </Link>
                    </div>
                  </div>
                </SwiperSlide>
                  ))}
              </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamAreaTwo;
