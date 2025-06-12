import React from "react";
import { Link } from "react-router-dom";

const FooterAreaFour = () => {
  return (
    <footer
      className="footer-wrapper footer-layout4"
      style={{ backgroundImage: "url(assets/img/bg/footer-bg2-1.png)" }}
    >
      <div className="container">
        <div className="widget-area">
          <div className="row justify-content-between">
            <div className="col-md-6 col-xl-3">
              <div className="widget footer-widget widget-about">
                <h3 className="widget_title">À propos</h3>
                <p className="footer-text mb-30">
                  Bienvenue sur MonProjet, votre plateforme de gestion automobile ! Nous proposons des outils innovants pour le suivi, l'entretien et l'optimisation de votre flotte, adaptés à tous les besoins.
                </p>
                <div className="social-btn style3">
                  <Link to="https://www.instagram.com/" tabIndex={-1}>
                    <i className="fab fa-instagram" />
                  </Link>
                  <Link to="https://linkedin.com/" tabIndex={-1}>
                    <i className="fab fa-linkedin-in" />
                  </Link>
                  <Link to="https://twitter.com/" tabIndex={-1}>
                    <i className="fab fa-twitter" />
                  </Link>
                  <Link to="https://facebook.com/" tabIndex={-1}>
                    <i className="fab fa-facebook-f" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Entreprise</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    <li>
                      <Link to="/about">À propos</Link>
                    </li>
                    <li>
                      <Link to="/team">Équipe</Link>
                    </li>
                    <li>
                      <Link to="/contact">FAQ</Link>
                    </li>
                    <li>
                      <Link to="/contact">Politique de confidentialité</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Nos services</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    <li>
                      <Link to="/service">Gestion de flotte</Link>
                    </li>
                    <li>
                      <Link to="/service">Suivi d'entretien</Link>
                    </li>
                    <li>
                      <Link to="/service">Alertes & rappels</Link>
                    </li>
                    <li>
                      <Link to="/service">Analyse de performance</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-auto">
              <div className="widget footer-widget">
                <h3 className="widget_title">Contact</h3>
                <div className="widget-contact2">
                  <div className="widget-contact-grid">
                    <div className="icon">
                      <i className="fas fa-map-marker-alt" />
                    </div>
                    <div className="contact-grid-details">
                      <p>Adresse</p>
                      <h6>Monastir - Tunisie</h6>
                    </div>
                  </div>
                  <div className="widget-contact-grid">
                    <div className="icon">
                      <i className="fas fa-phone-alt" />
                    </div>
                    <div className="contact-grid-details">
                      <p>Téléphone</p>
                      <h6>
                        <Link to="tel:888123456765">(+216) 50 410 155</Link>
                      </h6>
                    </div>
                  </div>
                  <div className="widget-contact-grid">
                    <div className="icon">
                      <i className="fas fa-envelope" />
                    </div>
                    <div className="contact-grid-details">
                      <p>Email</p>
                      <h6>
                        <Link to="mailto:infoname@mail.com">
                          contact@mycar.tn
                        </Link>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <div className="container">
          <div className="row gy-3 justify-content-md-between justify-content-center">
            <div className="col-auto align-self-center">
              <p className="copyright-text text-center">
                © <Link to="/">MonProjet</Link> 2024 | Tous droits réservés
              </p>
            </div>
            <div className="col-auto">
              <div className="footer-links">
                <Link to="/contact">Conditions d'utilisation</Link>
                <Link to="/contact">Politique de confidentialité</Link>
                <Link to="/contact">Contactez-nous</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAreaFour;
