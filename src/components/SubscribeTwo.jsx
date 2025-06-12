import React from "react";
import { Link } from "react-router-dom";

const SubscribeTwo = () => {
  return (
    <div className="container">
      <div className="footer-top-3">
        <div className="footer-logo">
          <Link to="/">
          <img src="/assets/img/logo.png" alt="MyCar" width="180px" height="50px" style={{ borderRadius: '10px' }} />
          </Link>
        </div>
        <h3 className="footer-top-title text-white">
          Abonnez-vous à notre newsletter pour recevoir nos actualités
        </h3>
        <form className="newsletter-form">
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Votre adresse e-mail"
              required=""
            />
          </div>
          <button type="submit" className="btn style5">
            <i className="fas fa-arrow-right" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeTwo;
