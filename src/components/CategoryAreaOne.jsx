import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FreeMode, Autoplay, Pagination, EffectCoverflow } from "swiper/modules";

// Enhanced car brands data with official websites and multiple fallback URLs
const carBrands = [
  { 
    id: 1, 
    name: "Toyota", 
    logo: "https://cdn.worldvectorlogo.com/logos/toyota-6.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Toyota_Motor_Logo.svg/200px-Toyota_Motor_Logo.svg.png",
      "https://www.carlogos.org/car-logos/toyota-logo.png"
    ],
    description: "Reliability & Innovation",
    color: "#E50000",
    founded: "1937",
    country: "Japan",
    officialWebsite: "https://www.toyota.com"
  },
  { 
    id: 2, 
    name: "Mercedes-Benz", 
    logo: "https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/200px-Mercedes-Logo.svg.png",
      "https://www.carlogos.org/car-logos/mercedes-benz-logo.png"
    ],
    description: "Luxury & Performance",
    color: "#00ADEF",
    founded: "1926",
    country: "Germany",
    officialWebsite: "https://www.mercedes-benz.com"
  },
  { 
    id: 3, 
    name: "BMW", 
    logo: "https://cdn.worldvectorlogo.com/logos/bmw.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png",
      "https://www.carlogos.org/car-logos/bmw-logo.png"
    ],
    description: "Ultimate Driving Machine",
    color: "#0066B2",
    founded: "1916",
    country: "Germany",
    officialWebsite: "https://www.bmw.com"
  },
  { 
    id: 4, 
    name: "Audi", 
    logo: "https://cdn.worldvectorlogo.com/logos/audi-11.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/200px-Audi-Logo_2016.svg.png",
      "https://www.carlogos.org/car-logos/audi-logo.png"
    ],
    description: "Vorsprung durch Technik",
    color: "#BB0A30",
    founded: "1909",
    country: "Germany",
    officialWebsite: "https://www.audi.com"
  },
  { 
    id: 5, 
    name: "Volkswagen", 
    logo: "https://cdn.worldvectorlogo.com/logos/volkswagen-vw.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png",
      "https://www.carlogos.org/car-logos/volkswagen-logo.png"
    ],
    description: "Das Auto",
    color: "#151F5D",
    founded: "1937",
    country: "Germany",
    officialWebsite: "https://www.volkswagen.com"
  },
  { 
    id: 6, 
    name: "Ford", 
    logo: "https://cdn.worldvectorlogo.com/logos/ford-6.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/200px-Ford_logo_flat.svg.png",
      "https://www.carlogos.org/car-logos/ford-logo.png"
    ],
    description: "Built Ford Tough",
    color: "#003478",
    founded: "1903",
    country: "USA",
    officialWebsite: "https://www.ford.com"
  },
  { 
    id: 7, 
    name: "Honda", 
    logo: "https://cdn.worldvectorlogo.com/logos/honda-2.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_Logo.svg/200px-Honda_Logo.svg.png",
      "https://www.carlogos.org/car-logos/honda-logo.png"
    ],
    description: "Power of Dreams",
    color: "#E40521",
    founded: "1948",
    country: "Japan",
    officialWebsite: "https://www.honda.com"
  },
  { 
    id: 8, 
    name: "Nissan", 
    logo: "https://cdn.worldvectorlogo.com/logos/nissan-6.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Nissan-logo.svg/200px-Nissan-logo.svg.png",
      "https://www.carlogos.org/car-logos/nissan-logo.png"
    ],
    description: "Innovation that Excites",
    color: "#C3002F",
    founded: "1933",
    country: "Japan",
    officialWebsite: "https://www.nissan-global.com"
  },
  { 
    id: 9, 
    name: "Hyundai", 
    logo: "https://cdn.worldvectorlogo.com/logos/hyundai-motor-company.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/200px-Hyundai_Motor_Company_logo.svg.png",
      "https://www.carlogos.org/car-logos/hyundai-logo.png"
    ],
    description: "New Thinking. New Possibilities",
    color: "#002C5F",
    founded: "1967",
    country: "South Korea",
    officialWebsite: "https://www.hyundai.com"
  },
  { 
    id: 10, 
    name: "Kia", 
    logo: "https://cdn.worldvectorlogo.com/logos/kia-motors-1.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Kia-logo.svg/200px-Kia-logo.svg.png",
      "https://www.carlogos.org/car-logos/kia-logo.png"
    ],
    description: "Movement that Inspires",
    color: "#05141F",
    founded: "1944",
    country: "South Korea",
    officialWebsite: "https://www.kia.com"
  },
  { 
    id: 11, 
    name: "Peugeot", 
    logo: "https://cdn.worldvectorlogo.com/logos/peugeot-2.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Peugeot_logo.svg/200px-Peugeot_logo.svg.png",
      "https://www.carlogos.org/car-logos/peugeot-logo.png"
    ],
    description: "Motion & Emotion",
    color: "#1C4B9C",
    founded: "1810",
    country: "France",
    officialWebsite: "https://www.peugeot.com"
  },
  { 
    id: 12, 
    name: "Renault", 
    logo: "https://cdn.worldvectorlogo.com/logos/renault-9.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Renault_2009_logo.svg/200px-Renault_2009_logo.svg.png",
      "https://www.carlogos.org/car-logos/renault-logo.png"
    ],
    description: "Passion for Life",
    color: "#FFCC00",
    founded: "1899",
    country: "France",
    officialWebsite: "https://www.renault.com"
  },
  { 
    id: 13, 
    name: "Citroën", 
    logo: "https://cdn.worldvectorlogo.com/logos/citroen-2.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Citroen-logo.svg/200px-Citroen-logo.svg.png",
      "https://www.carlogos.org/car-logos/citroen-logo.png"
    ],
    description: "Creative Technology",
    color: "#C5282F",
    founded: "1919",
    country: "France",
    officialWebsite: "https://www.citroen.com"
  },
  { 
    id: 14, 
    name: "Volvo", 
    logo: "https://cdn.worldvectorlogo.com/logos/volvo-6.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Volvo_Cars_logo.svg/200px-Volvo_Cars_logo.svg.png",
      "https://www.carlogos.org/car-logos/volvo-logo.png"
    ],
    description: "For Life",
    color: "#003057",
    founded: "1927",
    country: "Sweden",
    officialWebsite: "https://www.volvocars.com"
  },
  { 
    id: 15, 
    name: "Mazda", 
    logo: "https://cdn.worldvectorlogo.com/logos/mazda-2.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Mazda_logo_with_emblem.svg/200px-Mazda_logo_with_emblem.svg.png",
      "https://www.carlogos.org/car-logos/mazda-logo.png"
    ],
    description: "Zoom-Zoom",
    color: "#C8102E",
    founded: "1920",
    country: "Japan",
    officialWebsite: "https://www.mazda.com"
  },
  { 
    id: 16, 
    name: "Subaru", 
    logo: "https://cdn.worldvectorlogo.com/logos/subaru-6.svg",
    fallbackLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Subaru_logo.svg/200px-Subaru_logo.svg.png",
      "https://www.carlogos.org/car-logos/subaru-logo.png"
    ],
    description: "Confidence in Motion",
    color: "#0052CC",
    founded: "1953",
    country: "Japan",
    officialWebsite: "https://www.subaru.com"
  }
];

const CategoryAreaOne = () => {
  const [hoveredBrand, setHoveredBrand] = useState(null);

     const BrandCard = ({ brand }) => {
     const [imageError, setImageError] = useState(false);
     const [imageLoaded, setImageLoaded] = useState(false);
     const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

     const getCurrentLogo = () => {
       if (currentLogoIndex === 0) return brand.logo;
       if (brand.fallbackLogos && currentLogoIndex <= brand.fallbackLogos.length) {
         return brand.fallbackLogos[currentLogoIndex - 1];
       }
       return null;
     };

     const handleImageError = () => {
       const nextIndex = currentLogoIndex + 1;
       const maxIndex = 1 + (brand.fallbackLogos ? brand.fallbackLogos.length : 0);
       
       if (nextIndex < maxIndex) {
         setCurrentLogoIndex(nextIndex);
         setImageLoaded(false);
       } else {
         setImageError(true);
       }
     };

     const handleImageLoad = () => {
       setImageLoaded(true);
     };

     return (
       <div 
         className="modern-brand-card"
         onMouseEnter={() => setHoveredBrand(brand.id)}
         onMouseLeave={() => setHoveredBrand(null)}
       >
         <div className="brand-card-inner">
           <div className="brand-logo-container">
             {!imageLoaded && !imageError && (
               <div className="brand-logo-skeleton">
                 <div className="skeleton-animation"></div>
                 {currentLogoIndex > 0 && (
                   <div className="retry-indicator">
                     <i className="fas fa-sync-alt fa-spin"></i>
                     <span>Trying alternative source...</span>
                   </div>
                 )}
               </div>
             )}
             {!imageError && getCurrentLogo() ? (
               <img
                 src={getCurrentLogo()}
                 alt={`${brand.name} logo`}
                 className={`brand-logo ${imageLoaded ? 'loaded' : 'loading'}`}
                 onError={handleImageError}
                 onLoad={handleImageLoad}
                 loading="lazy"
                 decoding="async"
                 style={{ display: imageLoaded ? 'block' : 'none' }}
                 key={`${brand.id}-${currentLogoIndex}`}
               />
             ) : (
               <div className="brand-logo-placeholder">
                 <div className="placeholder-icon" style={{ color: brand.color }}>
                   <i className="fas fa-car fa-2x"></i>
                 </div>
                 <span className="placeholder-text">{brand.name}</span>
                 <small className="placeholder-subtitle">Logo unavailable</small>
               </div>
             )}
             <div className="brand-overlay">
               <div className="overlay-content">
                 <a 
                   href={brand.officialWebsite} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="btn btn-brand-explore"
                 >
                   <i className="fas fa-external-link-alt me-2"></i>
                   Visit {brand.name}
                 </a>
               </div>
             </div>
             <div className="brand-country-badge">
               <i className="fas fa-globe me-1"></i>
               {brand.country}
             </div>
             <div className="brand-website-badge">
               <i className="fas fa-link me-1"></i>
               Official Site
             </div>
           </div>
           <div className="brand-info">
             <h5 className="brand-name">
               <a 
                 href={brand.officialWebsite} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="brand-link"
               >
                 {brand.name}
                 <i className="fas fa-external-link-alt ms-2" style={{ fontSize: '0.7em' }}></i>
               </a>
             </h5>
             <p className="brand-description">{brand.description}</p>
             <div className="brand-details">
               <div className="brand-founded">
                 <i className="fas fa-calendar-alt me-1"></i>
                 Since {brand.founded}
               </div>
             </div>
             <div className="brand-stats">
               <span className="stat-item premium">
                 <i className="fas fa-star me-1"></i>
                 Premium
               </span>
               <span className="stat-item heritage">
                 <i className="fas fa-award me-1"></i>
                 Heritage
               </span>
             </div>
           </div>
         </div>
       </div>
     );
   };

  return (
    <>
      <style jsx>{`
        .category-area-modern {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 4rem 0;
          position: relative;
          overflow: hidden;
        }

        .category-area-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(102, 126, 234, 0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
          opacity: 0.5;
        }

        .category-content {
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title-brands {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #6c757d;
          font-weight: 400;
          max-width: 600px;
          margin: 0 auto;
        }

        .modern-brand-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          height: 100%;
          min-height: 320px;
          position: relative;
        }

        .modern-brand-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        }

        .brand-card-inner {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .brand-logo-container {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

                 .brand-logo {
           max-width: 100%;
           max-height: 100%;
           object-fit: contain;
           transition: all 0.3s ease;
           filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
           opacity: 0;
         }

         .brand-logo.loaded {
           opacity: 1;
         }

         .brand-logo.loading {
           opacity: 0;
         }

         .modern-brand-card:hover .brand-logo {
           transform: scale(1.1);
         }

         .brand-logo-skeleton {
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           width: 80%;
           height: 60%;
           background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
           border-radius: 10px;
           overflow: hidden;
         }

         .skeleton-animation {
           width: 100%;
           height: 100%;
           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
           animation: skeleton-loading 1.5s infinite;
         }

         @keyframes skeleton-loading {
           0% { transform: translateX(-100%); }
           100% { transform: translateX(100%); }
         }

         .retry-indicator {
           position: absolute;
           bottom: 10px;
           left: 50%;
           transform: translateX(-50%);
           background: rgba(255, 255, 255, 0.9);
           padding: 0.25rem 0.75rem;
           border-radius: 50px;
           font-size: 0.7rem;
           color: #6c757d;
           display: flex;
           align-items: center;
           gap: 0.5rem;
           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
         }

         .brand-logo-placeholder {
           width: 100%;
           height: 100%;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
           color: #6c757d;
           text-align: center;
           padding: 1rem;
         }

         .placeholder-icon {
           margin-bottom: 0.75rem;
           opacity: 0.7;
         }

         .placeholder-text {
           font-size: 1rem;
           font-weight: 600;
           color: #495057;
           margin-bottom: 0.25rem;
         }

         .placeholder-subtitle {
           font-size: 0.7rem;
           color: #6c757d;
           font-style: italic;
         }

         .brand-country-badge {
           position: absolute;
           top: 1rem;
           left: 1rem;
           background: rgba(255, 255, 255, 0.9);
           backdrop-filter: blur(10px);
           color: #6c757d;
           padding: 0.25rem 0.75rem;
           border-radius: 50px;
           font-size: 0.7rem;
           font-weight: 600;
           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
           border: 1px solid rgba(255, 255, 255, 0.2);
         }

         .brand-website-badge {
           position: absolute;
           top: 1rem;
           right: 1rem;
           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
           color: white;
           padding: 0.25rem 0.75rem;
           border-radius: 50px;
           font-size: 0.7rem;
           font-weight: 600;
           box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
           opacity: 0;
           transition: opacity 0.3s ease;
         }

         .modern-brand-card:hover .brand-website-badge {
           opacity: 1;
         }

        .brand-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .modern-brand-card:hover .brand-overlay {
          opacity: 1;
        }

                 .btn-brand-explore {
           background: white;
           color: #667eea;
           border: none;
           padding: 0.75rem 1.5rem;
           border-radius: 50px;
           font-weight: 600;
           text-decoration: none;
           transition: all 0.3s ease;
           box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3);
           display: inline-flex;
           align-items: center;
           position: relative;
           overflow: hidden;
         }

         .btn-brand-explore::before {
           content: '';
           position: absolute;
           top: 0;
           left: -100%;
           width: 100%;
           height: 100%;
           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
           transition: left 0.5s ease;
         }

         .btn-brand-explore:hover::before {
           left: 100%;
         }

         .btn-brand-explore:hover {
           background: #f8f9fa;
           color: #764ba2;
           transform: scale(1.05);
           box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
         }

        .brand-info {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
        }

        .brand-name {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

                 .brand-link {
           color: #333;
           text-decoration: none;
           transition: all 0.3s ease;
           display: inline-flex;
           align-items: center;
         }

         .brand-link:hover {
           color: #667eea;
           transform: translateY(-1px);
         }

         .brand-link:hover .fa-external-link-alt {
           transform: scale(1.2);
           color: #764ba2;
         }

                 .brand-description {
           font-size: 0.9rem;
           color: #6c757d;
           margin-bottom: 1rem;
           font-style: italic;
           line-height: 1.4;
         }

         .brand-details {
           margin-bottom: 1rem;
         }

         .brand-founded {
           font-size: 0.8rem;
           color: #6c757d;
           background: #f8f9fa;
           padding: 0.25rem 0.75rem;
           border-radius: 50px;
           display: inline-flex;
           align-items: center;
           font-weight: 500;
         }

         .brand-stats {
           display: flex;
           justify-content: center;
           gap: 0.5rem;
           flex-wrap: wrap;
         }

         .stat-item {
           color: white;
           padding: 0.25rem 0.75rem;
           border-radius: 50px;
           font-size: 0.7rem;
           font-weight: 600;
           display: inline-flex;
           align-items: center;
           transition: transform 0.2s ease;
         }

         .stat-item:hover {
           transform: scale(1.05);
         }

         .stat-item.premium {
           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
           box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
         }

         .stat-item.heritage {
           background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
           color: #333;
           box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
         }

        .category-slider-modern {
          padding: 1rem 0 2rem 0;
        }

        .swiper-pagination-bullet {
          background: #667eea;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: scale(1.2);
        }

        .brands-grid-fallback {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .section-title-brands {
            font-size: 2rem;
          }
          
          .modern-brand-card {
            min-height: 280px;
          }
          
          .brand-logo-container {
            height: 150px;
            padding: 1.5rem;
          }
          
          .brand-info {
            padding: 1rem;
          }
        }

        @media (max-width: 576px) {
          .category-area-modern {
            padding: 3rem 0;
          }
          
          .section-title-brands {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <div className="category-area-modern">
        <div className="container category-content">
          <div className="section-header">
            <h2 className="section-title-brands">
              <i className="fas fa-crown me-3"></i>
              Premium Car Brands
            </h2>
            <p className="section-subtitle">
              Discover our collection of world-renowned automotive brands, 
              each offering unique excellence and innovation in their vehicles.
            </p>
          </div>

          <div className="brands-showcase">
          <Swiper
              modules={[FreeMode, Autoplay, Pagination, EffectCoverflow]}
              spaceBetween={30}
            slidesPerView={1}
              speed={3000}
            loop={true}
            autoplay={{
                delay: 3500,
              disableOnInteraction: false,
                pauseOnMouseEnter: true,
                reverseDirection: false
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true
            }}
            breakpoints={{
                 480: {
                   slidesPerView: 1,
                   spaceBetween: 15
                 },
              640: {
                slidesPerView: 2,
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
                slidesPerView: 4,
                   spaceBetween: 30
              },
                 1400: {
                   slidesPerView: 5,
                   spaceBetween: 30
                 }
            }}
              className="category-slider-modern"
          >
              {carBrands.map((brand) => (
              <SwiperSlide key={brand.id}>
                  <BrandCard brand={brand} />
              </SwiperSlide>
            ))}
          </Swiper>
          </div>

          {/* Fallback grid for no-JS scenarios */}
          <noscript>
            <div className="brands-grid-fallback">
              {carBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </noscript>
        </div>
      </div>
    </>
  );
};

export default CategoryAreaOne;
