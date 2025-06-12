import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactArea = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Choisir',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8081/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Votre message a été envoyé avec succès!');
        setShowModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Choisir',
          message: ''
        });
      } else {
        const error = await response.json();
        toast.error(error.message || 'Une erreur est survenue lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue lors de l\'envoi du message');
    }
  };

  return (
    <>
      <style jsx>{`
        .contact-area-modern {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }

        .contact-area-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="contact-pattern" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1.5" fill="rgba(255, 107, 107, 0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23contact-pattern)"/></svg>');
          opacity: 0.6;
        }

        .contact-content-wrapper {
          position: relative;
          z-index: 2;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-subtitle {
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

        .contact-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #333 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .contact-description {
          font-size: 1.1rem;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .contact-info-modern {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          border: 1px solid rgba(255, 107, 107, 0.1);
          position: relative;
          overflow: hidden;
        }

        .contact-info-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .contact-info-modern:hover::before {
          left: 100%;
        }

        .contact-info-modern:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(255, 107, 107, 0.2);
          border-color: rgba(255, 107, 107, 0.3);
        }

        .contact-info-icon-modern {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
          transition: all 0.3s ease;
        }

        .contact-info-modern:hover .contact-info-icon-modern {
          transform: scale(1.1) rotate(5deg);
        }

        .contact-info-title-modern {
          font-size: 1.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 1rem;
          transition: color 0.3s ease;
        }

        .contact-info-modern:hover .contact-info-title-modern {
          color: #ff6b6b;
        }

        .contact-info-text-modern {
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        .contact-info-text-modern a {
          color: #ff6b6b;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .contact-info-text-modern a:hover {
          color: #ee5a52;
          text-decoration: underline;
        }

        .contact-form-section {
          background: white;
          border-radius: 25px;
          padding: 3rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 107, 107, 0.1);
          position: relative;
          overflow: hidden;
        }

        .contact-form-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.05), transparent);
          transition: left 0.8s ease;
        }

        .contact-form-section:hover::before {
          left: 100%;
        }

        .form-title-modern {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #333 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .form-subtitle-modern {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .form-group-modern {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .form-control-modern {
          width: 100%;
          padding: 1rem 1.5rem;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
          color: #333;
          font-family: inherit;
          line-height: 1.5;
        }

        .form-control-modern:focus {
          outline: none;
          border-color: #ff6b6b;
          background: white;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
          color: #333;
        }

        .form-control-modern::placeholder {
          color: #6c757d;
          opacity: 1;
        }

        .form-select-modern {
          width: 100%;
          padding: 1rem 1.5rem;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
          cursor: pointer;
          color: #333;
          font-family: inherit;
          line-height: 1.5;
        }

        .form-select-modern:focus {
          outline: none;
          border-color: #ff6b6b;
          background: white;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
          color: #333;
        }

        .form-select-modern option {
          color: #333;
          background: white;
          padding: 0.5rem;
        }

        .form-textarea-modern {
          width: 100%;
          padding: 1rem 1.5rem;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
          min-height: 120px;
          resize: vertical;
          color: #333;
          font-family: inherit;
          line-height: 1.5;
        }

        .form-textarea-modern:focus {
          outline: none;
          border-color: #ff6b6b;
          background: white;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
          color: #333;
        }

        .form-textarea-modern::placeholder {
          color: #6c757d;
          opacity: 1;
        }

        .submit-btn-modern {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .submit-btn-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn-modern:hover::before {
          left: 100%;
        }

        .submit-btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
        }

        .modal-modern {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(5px);
        }

        .modal-content-modern {
          background: white;
          border-radius: 25px;
          padding: 3rem;
          box-shadow: 0 25px 80px rgba(0,0,0,0.3);
          text-align: center;
          min-width: 400px;
          max-width: 500px;
          position: relative;
          overflow: hidden;
        }

        .modal-content-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
        }

        .modal-title-modern {
          color: #ff6b6b;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .modal-text-modern {
          color: #6c757d;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .modal-btn-modern {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          color: white;
          border: none;
          border-radius: 15px;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
        }

        .map-container-modern {
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 107, 107, 0.1);
          margin: 4rem 0;
        }

        .map-container-modern iframe {
          width: 100%;
          height: 400px;
          border: none;
        }

        .floating-contact-shapes {
          position: absolute;
          top: 15%;
          right: 8%;
          width: 120px;
          height: 120px;
          background: rgba(255, 107, 107, 0.1);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: float 8s ease-in-out infinite;
        }

        .floating-contact-shapes:nth-child(2) {
          top: 70%;
          left: 3%;
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

        @media (max-width: 768px) {
          .contact-area-modern {
            padding: 4rem 0;
          }
          
          .contact-title {
            font-size: 2rem;
          }
          
          .contact-info-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .contact-form-section {
            padding: 2rem;
          }
          
          .modal-content-modern {
            min-width: 320px;
            margin: 1rem;
            padding: 2rem;
          }
        }

        @media (max-width: 576px) {
          .contact-title {
            font-size: 1.8rem;
          }
          
          .contact-form-section {
            padding: 1.5rem;
          }
        }
      `}</style>

      {showModal && (
        <div className="modal-modern">
          <div className="modal-content-modern">
            <h2 className="modal-title-modern">
              <i className="fas fa-check-circle"></i>
              Message envoyé !
            </h2>
            <p className="modal-text-modern">
              Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="modal-btn-modern"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      <div className="contact-area-modern">
        <div className="floating-contact-shapes"></div>
        <div className="floating-contact-shapes"></div>
        
        <div className="container contact-content-wrapper">
          <div className="contact-header">
            <div className="contact-subtitle">
              <i className="fas fa-phone me-2"></i>
              Contactez-nous
            </div>
            <h2 className="contact-title">
              Nous Sommes Là Pour Vous Aider
            </h2>
            <p className="contact-description">
              Notre équipe est à votre disposition pour répondre à toutes vos questions 
              et vous accompagner dans vos projets automobiles.
            </p>
          </div>

          <div className="contact-info-grid">
            <div className="contact-info-modern">
              <div className="contact-info-icon-modern">
                <i className="fas fa-map-marker-alt" />
              </div>
              <h6 className="contact-info-title-modern">Adresse</h6>
              <p className="contact-info-text-modern">
                Monastir, Tunisie
              </p>
            </div>
            <div className="contact-info-modern">
              <div className="contact-info-icon-modern">
                <i className="fas fa-phone-alt" />
              </div>
              <h6 className="contact-info-title-modern">Téléphone</h6>
              <p className="contact-info-text-modern">
                <a href="tel:6295550129">(+216) 50 410 155</a>
              </p>
            </div>
            <div className="contact-info-modern">
              <div className="contact-info-icon-modern">
                <i className="fas fa-clock" />
              </div>
              <h6 className="contact-info-title-modern">Horaires d'ouverture</h6>
              <p className="contact-info-text-modern">Lun-Ven: 9h à 18h</p>
              <p className="contact-info-text-modern">Sam: 10h à 16h</p>
            </div>
            <div className="contact-info-modern">
              <div className="contact-info-icon-modern">
                <i className="fas fa-envelope" />
              </div>
              <h6 className="contact-info-title-modern">E-mail</h6>
              <p className="contact-info-text-modern">
                <a href="mailto:contact@mycar.tn">
                  contact@mycar.tn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="map-container-modern">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.7310056272386!2d89.2286059153658!3d24.00527418490799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b97badc6151%3A0x30b048c9fb2129bc!2s!5e0!3m2!1sen!2sbd!4v1651028958211!5m2!1sen!2sbd"
            allowFullScreen=""
            loading="lazy"
            title="address"
          />
        </div>
      </div>
      <div className="container">
        <div className="contact-form-section">
          <div className="form-title-modern">Contactez-nous pour plus d'informations</div>
          <div className="form-subtitle-modern">Formulaire de contact</div>
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group-modern">
                  <input
                    type="text"
                    className="form-control-modern"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-modern">
                  <input
                    type="email"
                    className="form-control-modern"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Adresse e-mail"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-modern">
                  <input
                    type="tel"
                    className="form-control-modern"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Numéro de téléphone"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group-modern">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-select-modern"
                    required
                  >
                    <option value="Choisir">Choisir une option</option>
                    <option value="Vente de véhicules">Vente de véhicules</option>
                    <option value="Rachat de véhicules">Rachat de véhicules</option>
                    <option value="Expertise automobile">Expertise automobile</option>
                    <option value="Financement">Financement</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group-modern">
              <textarea
                placeholder="Votre message ici..."
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea-modern"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="submit-btn-modern">
                Envoyer le message <i className="fas fa-arrow-right" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactArea;
