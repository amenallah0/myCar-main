import React from "react";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  return (
    <>
      <section className="blog-area-modern">
        <div className="container">
          <div className="row gx-40">
            <div className="col-xxl-8 col-lg-7">
              <div className="blog-details-card-modern">
                <div className="blog-thumb-modern">
                  <img src="assets/img/blog/blog.jpg" alt="MyCar" />
                  <div className="blog-meta-modern">
                    <Link to="/blog-details" className="meta-item">
                      <i className="far fa-comments" />
                      <span>5 Commentaires</span>
                    </Link>
                    <Link to="/blog" className="meta-item">
                      <i className="far fa-user" />
                      <span>Par Admin</span>
                    </Link>
                  </div>
                  <div className="blog-date-modern">
                    <span className="day">15</span>
                    <span className="month">DÉC</span>
                  </div>
                </div>
                
                <div className="blog-content-modern">
                  <h2 className="blog-title-modern">
                    Guide Complet pour l'Entretien de Votre Véhicule
                  </h2>
                  
                  <p className="blog-intro">
                    Découvrez les meilleures pratiques pour maintenir votre véhicule en parfait état. 
                    Un entretien régulier prolonge la durée de vie de votre voiture et garantit votre sécurité sur la route.
                  </p>
                  
                  <p>
                    L'entretien automobile est essentiel pour assurer la longévité et les performances optimales de votre véhicule. 
                    Des vérifications régulières permettent de détecter les problèmes avant qu'ils ne deviennent coûteux.
                  </p>
                  
                  <blockquote className="modern-quote">
                    <div className="quote-icon">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    <p>
                      "Un véhicule bien entretenu n'est pas seulement plus fiable, 
                      il est aussi plus sûr et plus économique à long terme."
                    </p>
                    <cite>Expert Automobile MyCar</cite>
                  </blockquote>
                  
                  <p>
                    Notre équipe d'experts recommande un entretien préventif régulier pour éviter les pannes 
                    inattendues et maintenir la valeur de revente de votre véhicule.
                  </p>
                  
                  <div className="row gy-4 content-gallery">
                    <div className="col-sm-6">
                      <div className="gallery-item">
                        <img src="assets/img/blog/blog.jpg" alt="Entretien Auto" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="info-card">
                        <div className="card-icon">
                          <i className="fas fa-tools"></i>
                        </div>
                        <h4>Services d'Entretien</h4>
                        <p>
                          Nos techniciens qualifiés utilisent des équipements de pointe 
                          pour diagnostiquer et réparer votre véhicule avec précision.
                        </p>
                        <p>
                          Nous offrons une garantie sur tous nos services pour votre tranquillité d'esprit.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="section-title-modern">
                    <i className="fas fa-cog me-3"></i>
                    Services Professionnels d'Entretien Automobile
                  </h3>
                  
                  <div className="row gy-3">
                    <div className="col-lg-6">
                      <div className="checklist-modern">
                        <ul>
                          <li>
                            <i className="fas fa-check-circle" />
                            <span>Services de Réparation Professionnels</span>
                          </li>
                          <li>
                            <i className="fas fa-check-circle" />
                            <span>Solutions de Réparation Fiables</span>
                          </li>
                          <li>
                            <i className="fas fa-check-circle" />
                            <span>Atelier de Réparation Complet</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checklist-modern">
                        <ul>
                          <li>
                            <i className="fas fa-check-circle" />
                            <span>Diagnostic Électronique Avancé</span>
                          </li>
                          <li>
                            <i className="fas fa-check-circle" />
                            <span>Entretien Préventif Personnalisé</span>
                          </li>
                          <li>
                            <i className="fas fa-check-circle" />
                            <span>Garantie sur Tous les Services</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <p className="conclusion-text">
                    La réparation automobile est un service essentiel qui permet de résoudre tous les problèmes 
                    ou dommages de votre véhicule. Elle implique un diagnostic précis, la réparation ou le 
                    remplacement des pièces nécessaires, et s'assurer que la voiture fonctionne parfaitement.
                  </p>
                </div>
                
                <div className="share-section-modern">
                  <div className="tags-section">
                    <span className="tags-title">
                      <i className="fas fa-tags me-2"></i>
                      Mots-clés:
                    </span>
                    <div className="tagcloud-modern">
                      <Link to="/blog" className="tag-item">Entretien Auto</Link>
                      <Link to="/blog" className="tag-item">Réparation</Link>
                      <Link to="/blog" className="tag-item">Services Auto</Link>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
            <div className="col-xxl-4 col-lg-5">
              <aside className="sidebar-modern">
                <div className="widget-modern search-widget">
                  <h3 className="widget-title-modern">
                    <i className="fas fa-search me-2"></i>
                    Rechercher
                  </h3>
                  <form className="search-form-modern">
                    <div className="search-input-wrapper">
                      <input type="text" placeholder="Rechercher des articles..." />
                      <button type="submit">
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="widget-modern categories-widget">
                  <h3 className="widget-title-modern">
                    <i className="fas fa-folder me-2"></i>
                    Catégories
                  </h3>
                  <ul className="categories-list">
                    <li>
                      <Link to="/blog">
                        <i className="fas fa-wrench me-2"></i>
                        Réparation de Précision
                        <span className="count">4</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog">
                        <i className="fas fa-mobile-alt me-2"></i>
                        Réparation Mobile
                        <span className="count">5</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog">
                        <i className="fas fa-star me-2"></i>
                        Service Automobile Elite
                        <span className="count">8</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog">
                        <i className="fas fa-tools me-2"></i>
                        Pro Auto Fix
                        <span className="count">4</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog">
                        <i className="fas fa-car me-2"></i>
                        Garage Drive-In
                        <span className="count">3</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="widget-modern popular-posts-widget">
                  <h3 className="widget-title-modern">
                    <i className="fas fa-fire me-2"></i>
                    Articles Populaires
                  </h3>
                  <div className="popular-posts">
                    <div className="post-item">
                      <div className="post-image">
                        <Link to="/blog-details">
                          <img src="assets/img/blog/blog.jpg" alt="Quick Fix Motors" />
                        </Link>
                      </div>
                      <div className="post-content">
                        <h4 className="post-title">
                          <Link to="/blog-details">
                            Quick Fix Motors
                          </Link>
                        </h4>
                        <div className="post-meta">
                          <i className="fas fa-calendar-alt me-1"></i>
                          <span>15 Sep, 2024</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="post-item">
                      <div className="post-image">
                        <Link to="/blog-details">
                          <img src="assets/img/blog/blog.jpg" alt="Service Professionnel" />
                        </Link>
                      </div>
                      <div className="post-content">
                        <h4 className="post-title">
                          <Link to="/blog-details">
                            Service Professionnel
                          </Link>
                        </h4>
                        <div className="post-meta">
                          <i className="fas fa-calendar-alt me-1"></i>
                          <span>25 Juin, 2024</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="post-item">
                      <div className="post-image">
                        <Link to="/blog-details">
                          <img src="assets/img/blog/blog.jpg" alt="Gear Wrench Auto" />
                        </Link>
                      </div>
                      <div className="post-content">
                        <h4 className="post-title">
                          <Link to="/blog-details">
                            Gear Wrench Auto
                          </Link>
                        </h4>
                        <div className="post-meta">
                          <i className="fas fa-calendar-alt me-1"></i>
                          <span>25 Juin, 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="widget-modern tags-widget">
                  <h3 className="widget-title-modern">
                    <i className="fas fa-hashtag me-2"></i>
                    Tags Populaires
                  </h3>
                  <div className="tagcloud-modern">
                    <Link to="/blog" className="tag-item">Mécanicien</Link>
                    <Link to="/blog" className="tag-item">Réparation</Link>
                    <Link to="/blog" className="tag-item">Auto Fixers</Link>
                    <Link to="/blog" className="tag-item">Pro Auto</Link>
                    <Link to="/blog" className="tag-item">Service</Link>
                    <Link to="/blog" className="tag-item">Entretien</Link>
                    <Link to="/blog" className="tag-item">Diagnostic</Link>
                    <Link to="/blog" className="tag-item">Expertise</Link>
                    <Link to="/blog" className="tag-item">Automobile</Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .blog-area-modern {
          padding: 0;
          background: transparent;
        }

        .blog-details-card-modern {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .blog-thumb-modern {
          position: relative;
          height: 400px;
          overflow: hidden;
        }

        .blog-thumb-modern img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .blog-details-card-modern:hover .blog-thumb-modern img {
          transform: scale(1.05);
        }

        .blog-meta-modern {
          position: absolute;
          bottom: 20px;
          left: 20px;
          display: flex;
          gap: 15px;
        }

        .meta-item {
          background: rgba(255, 255, 255, 0.95);
          color: #1f2937;
          padding: 8px 15px;
          border-radius: 25px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .meta-item:hover {
          background: #ef4444;
          color: white;
          transform: translateY(-2px);
        }

        .blog-date-modern {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          padding: 15px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
        }

        .blog-date-modern .day {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
        }

        .blog-date-modern .month {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          margin-top: 2px;
        }

        .blog-content-modern {
          padding: 40px;
        }

        .blog-title-modern {
          font-size: 2.2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .blog-intro {
          font-size: 1.1rem;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 25px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 12px;
          border-left: 4px solid #ef4444;
        }

        .blog-content-modern p {
          color: #4b5563;
          line-height: 1.7;
          font-size: 1.05rem;
          margin-bottom: 20px;
        }

        .modern-quote {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          padding: 30px;
          border-radius: 15px;
          margin: 30px 0;
          position: relative;
          box-shadow: 0 10px 30px rgba(239, 68, 68, 0.2);
        }

        .quote-icon {
          position: absolute;
          top: -15px;
          left: 30px;
          background: white;
          color: #ef4444;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .modern-quote p {
          color: white;
          font-size: 1.1rem;
          font-style: italic;
          margin-bottom: 15px;
          margin-top: 10px;
        }

        .modern-quote cite {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .content-gallery {
          margin: 40px 0;
        }

        .gallery-item img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .info-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 30px;
          border-radius: 15px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .card-icon {
          background: #ef4444;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .info-card h4 {
          color: #1f2937;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .info-card p {
          color: #6b7280;
          font-size: 0.95rem;
          margin-bottom: 10px;
        }

        .section-title-modern {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1f2937;
          margin: 40px 0 25px;
          display: flex;
          align-items: center;
        }

        .section-title-modern i {
          color: #ef4444;
        }

        .checklist-modern ul {
          list-style: none;
          padding: 0;
        }

        .checklist-modern li {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .checklist-modern li:hover {
          background: #ef4444;
          color: white;
          transform: translateX(5px);
        }

        .checklist-modern li i {
          color: #22c55e;
          margin-right: 12px;
          font-size: 1.1rem;
        }

        .checklist-modern li:hover i {
          color: white;
        }

        .conclusion-text {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 12px;
          border-left: 4px solid #ef4444;
          margin-top: 30px;
          font-weight: 500;
        }

        .share-section-modern {
          padding: 25px 40px;
          background: #f8f9fa;
          border-top: 1px solid #e5e7eb;
        }

        .tags-section {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .tags-title {
          font-weight: 600;
          color: #1f2937;
          display: flex;
          align-items: center;
        }

        .tagcloud-modern {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tag-item {
          background: white;
          color: #6b7280;
          padding: 6px 15px;
          border-radius: 20px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .tag-item:hover {
          background: #ef4444;
          color: white;
          border-color: #ef4444;
          transform: translateY(-2px);
        }

        .comments-section-modern {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-top: 30px;
        }

        .comment-form-modern {
          margin-top: 30px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-control-modern,
        .form-select-modern {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-control-modern:focus,
        .form-select-modern:focus {
          outline: none;
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .form-control-modern.textarea {
          resize: vertical;
          min-height: 120px;
        }

        .btn-modern-primary {
          background: linear-gradient(135deg, #ef4444 0%, #991b1b 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }

        .btn-modern-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
        }

        .sidebar-modern {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .widget-modern {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .widget-title-modern {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          padding-bottom: 15px;
          border-bottom: 2px solid #f3f4f6;
        }

        .widget-title-modern i {
          color: #ef4444;
        }

        .search-form-modern {
          position: relative;
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-form-modern input {
          width: 100%;
          padding: 12px 50px 12px 15px;
          border: 2px solid #e5e7eb;
          border-radius: 25px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-form-modern input:focus {
          outline: none;
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .search-form-modern button {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          background: #ef4444;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-form-modern button:hover {
          background: #dc2626;
          transform: translateY(-50%) scale(1.05);
        }

        .categories-list {
          list-style: none;
          padding: 0;
        }

        .categories-list li {
          margin-bottom: 12px;
        }

        .categories-list a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 15px;
          background: #f8f9fa;
          border-radius: 10px;
          text-decoration: none;
          color: #4b5563;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .categories-list a:hover {
          background: #ef4444;
          color: white;
          transform: translateX(5px);
        }

        .categories-list .count {
          background: white;
          color: #6b7280;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .categories-list a:hover .count {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .popular-posts {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .post-item {
          display: flex;
          gap: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .post-item:hover {
          background: #ef4444;
          color: white;
          transform: translateY(-2px);
        }

        .post-image {
          flex-shrink: 0;
        }

        .post-image img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
        }

        .post-content {
          flex: 1;
        }

        .post-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .post-title a {
          color: #1f2937;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .post-item:hover .post-title a {
          color: white;
        }

        .post-meta {
          font-size: 0.85rem;
          color: #6b7280;
          display: flex;
          align-items: center;
        }

        .post-item:hover .post-meta {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .blog-content-modern {
            padding: 25px;
          }

          .blog-title-modern {
            font-size: 1.8rem;
          }

          .section-title-modern {
            font-size: 1.5rem;
          }

          .comments-section-modern {
            padding: 25px;
          }

          .share-section-modern {
            padding: 20px 25px;
          }

          .tags-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .post-item {
            flex-direction: column;
            text-align: center;
          }

          .post-image {
            align-self: center;
          }
        }

        @media (max-width: 576px) {
          .blog-meta-modern {
            flex-direction: column;
            gap: 8px;
          }

          .meta-item {
            font-size: 0.8rem;
            padding: 6px 12px;
          }

          .blog-date-modern {
            padding: 10px;
          }

          .widget-modern {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default BlogDetails;
