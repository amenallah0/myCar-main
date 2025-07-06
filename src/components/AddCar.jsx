import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import ApiCarService from "./../services/apiCarServices";
import { motion } from "framer-motion";
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const carData = {
  Acura: ['ILX', 'MDX', 'RDX', 'RLX', 'TLX', 'NSX'],
  Alfa_Romeo: ['Giulia', 'Stelvio', '4C Spider', '4C Coupe'],
  Audi: ['A3', 'A4', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8'],
  BMW: ['2 Series', '3 Series', '4 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'Z4', 'i3', 'i8'],
  Buick: ['Encore', 'Enclave', 'Regal', 'LaCrosse'],
  Cadillac: ['ATS', 'CTS', 'XT4', 'XT5', 'XT6', 'Escalade'],
  Chevrolet: ['Bolt', 'Camaro', 'Corvette', 'Cruze', 'Equinox', 'Impala', 'Malibu', 'Silverado', 'Tahoe', 'Traverse'],
  Chrysler: ['300', 'Pacifica'],
  Citroën: ['C1', 'C3', 'C4', 'C5', 'Berlingo', 'C-Elysée', 'Jumpy', 'SpaceTourer', 'C4 Picasso', 'C3 Aircross', 'C5 Aircross'],
  Dodge: ['Challenger', 'Charger', 'Durango', 'Journey', 'Grand Caravan', 'Ram 1500'],
  Fiat: ['500', 'Panda', 'Tipo', 'Doblo', '500X', 'Punto', 'Bravo', 'Fiorino', 'Ducato', '500L', 'Qubo', 'Punto Evo'],
  Ford: ['Bronco', 'EcoSport', 'Escape', 'Expedition', 'Explorer', 'F-150', 'Fusion', 'Mustang', 'Ranger', 'Transit'],
  Genesis: ['G70', 'G80', 'G90'],
  GMC: ['Acadia', 'Canyon', 'Sierra', 'Terrain', 'Yukon'],
  Honda: ['Accord', 'Civic', 'CR-V', 'Fit', 'HR-V', 'Insight', 'Odyssey', 'Passport', 'Pilot', 'Ridgeline'],
  Hyundai: ['Elantra', 'Ioniq', 'Kona', 'Palisade', 'Santa Fe', 'Sonata', 'Tucson', 'Veloster', 'Venue'],
  Infiniti: ['Q50', 'Q60', 'QX50', 'QX60', 'QX80'],
  Jaguar: ['E-PACE', 'F-PACE', 'F-TYPE', 'XE', 'XF', 'XJ'],
  Jeep: ['Cherokee', 'Compass', 'Grand Cherokee', 'Renegade', 'Wrangler', 'Gladiator'],
  Kia: ['Cadenza', 'Forte', 'K900', 'Niro', 'Optima', 'Rio', 'Sedona', 'Sorento', 'Soul', 'Sportage', 'Stinger'],
  Land_Rover: ['Defender', 'Discovery', 'Range Rover', 'Range Rover Sport', 'Range Rover Velar'],
  Lexus: ['ES', 'GS', 'GX', 'IS', 'LC', 'LS', 'LX', 'NX', 'RC', 'RX', 'UX'],
  Lincoln: ['Aviator', 'Corsair', 'MKC', 'MKZ', 'Nautilus', 'Navigator'],
  Mazda: ['CX-3', 'CX-30', 'CX-5', 'CX-9', 'Mazda3', 'Mazda6', 'MX-5 Miata'],
  Mercedes_Benz: ['A-Class', 'C-Class', 'E-Class', 'G-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'S-Class', 'SL', 'SLC'],
  Mini: ['Clubman', 'Convertible', 'Countryman', 'Hardtop'],
  Mitsubishi: ['Eclipse Cross', 'Mirage', 'Outlander', 'Outlander Sport'],
  Nissan: ['370Z', 'Altima', 'Armada', 'Frontier', 'Kicks', 'Leaf', 'Maxima', 'Murano', 'Pathfinder', 'Rogue', 'Sentra', 'Titan', 'Versa'],
  Peugeot: ['208', '308', '3008', '5008', 'Partner', '2008', 'Traveller', 'Expert', '508', '208 GT Line', 'Rifter', 'Boxer'],
  Porsche: ['718 Boxster', '718 Cayman', '911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
  Renault: ['Clio', 'Symbol', 'Megane', 'Kadjar', 'Duster', 'Kwid', 'Captur', 'Trafic', 'Talisman', 'Scénic', 'Fluence', 'Kangoo'],
  Seat: ['Ibiza', 'Leon', 'Ateca', 'Arona', 'Tarraco', 'Toledo', 'Alhambra', 'Mii', 'Cordoba', 'Altea', 'Exeo'],
  Subaru: ['Ascent', 'BRZ', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Outback', 'WRX'],
  Suzuki: ['Alto', 'Swift', 'Baleno', 'Vitara', 'Jimny', 'Celerio', 'Ignis', 'S-Cross', 'Ertiga', 'Dzire', 'Ciaz', 'XL6'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck', 'Roadster'],
  Toyota: ['4Runner', 'Avalon', 'Camry', 'Corolla', 'Highlander', 'Land Cruiser', 'Prius', 'RAV4', 'Sequoia', 'Sienna', 'Supra', 'Tacoma', 'Tundra', 'Yaris', 'C-HR', 'Hilux', 'Prado', 'Avanza', 'Fortuner', 'Camry', 'Highlander', 'Innova'],
  Volkswagen: ['Atlas', 'Beetle', 'Golf', 'Jetta', 'Passat', 'Tiguan', 'Arteon', 'Polo 5', 'Polo 6', 'Golf 5', 'Golf 6', 'Golf 7', 'Golf 7 R-line', 'Passat', 'Tiguan', 'Touareg', 'Jetta', 'Arteon', 'T-Roc', 'Up!', 'Beetle', 'Sharan', 'Touran', 'Amarok', 'Atlas', 'Beetle Cabriolet', 'Caddy', 'CC', 'Crafter', 'Cross Polo', 'e-Golf', 'e-Up!', 'Fox', 'Golf GTI', 'Golf R', 'Jetta GLI', 'Multivan', 'Phaeton', 'Scirocco', 'T-Cross', 'Tiguan Allspace', 'Transporter', 'Vento'],
  Volvo: ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90']
};


  

function AddCar() {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    car: {
      make: '',
      model: '',
      color: '',
      year: '',
      powerRating: '',
      numberOfDoors: '',
      fuelTankCapacity: '',
      maximumSpeed: '',
      mileage: '',
      options: '',
      price: '',
    },
    images: [],
    imagePreviews: [],
  });
  const fileInputRef = useRef(null);

  // Vérification de l'authentification au chargement du composant
  useEffect(() => {
    if (!isAuthenticated || !user) {
      toast.error('Vous devez être connecté pour ajouter une annonce');
      navigate('/signin');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation spéciale pour l'année
    if (name === 'year') {
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      
      if (value && (year < 1886 || year > currentYear + 1)) {
        // Afficher un message d'erreur si nécessaire
        console.warn(`Année invalide: ${year}. Doit être entre 1886 et ${currentYear + 1}`);
      }
    }
    
    setFormData(prevState => ({
      ...prevState,
      car: {
        ...prevState.car,
        [name]: value
      }
    }));
  };

  const handleMakeChange = (e) => {
    const make = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      car: {
        ...prevState.car,
        make,
        model: '', // Reset model when make changes
      }
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setFormData(prevState => ({
      ...prevState,
      images: files,
      imagePreviews: previews
    }));
  };

  const handleDeleteImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      images: newImages,
      imagePreviews: newPreviews
    }));
  
    const files = newImages.map(file => new File([file], file.name));
    const fileList = new DataTransfer();
    files.forEach(file => fileList.items.add(file));
    fileInputRef.current.files = fileList.files;
  
    if (newImages.length === 0) {
      fileInputRef.current.value = null;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification de l'authentification avant soumission
    if (!isAuthenticated || !user?.id) {
      toast.error('Vous devez être connecté pour ajouter une annonce');
      navigate('/signin');
      return;
    }

    try {
        await ApiCarService.addCarWithImagesToUser(user.id, formData.car, formData.images);
        toast.success('Voiture ajoutée avec succès!');
        
        // Réinitialiser le formulaire
        setFormData({
            car: {
                make: '',
                model: '',
                color: '',
                year: '',
                powerRating: '',
                numberOfDoors: '',
                fuelTankCapacity: '',
                maximumSpeed: '',
                mileage: '',
                options: '',
                price: '',
            },
            images: [],
            imagePreviews: [],
        });
        fileInputRef.current.value = null;
        
        // Rafraîchir les voitures du profil si la fonction est disponible
        if (window.refreshUserCars) {
          window.refreshUserCars();
        }
        
        // Rediriger vers le profil après un court délai
        setTimeout(() => {
          navigate(`/profile/${user.username}`);
        }, 1500);
        
    } catch (error) {
        toast.error('Erreur lors de l\'ajout de la voiture');
        console.error('Error adding car:', error);
    }
};

  // Affichage d'un loader si l'utilisateur n'est pas encore chargé
  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Chargement...</p>
        </div>
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          }
          .loading-spinner {
            text-align: center;
            color: #ef4444;
          }
          .loading-spinner i {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          .loading-spinner p {
            font-size: 1.2rem;
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="modern-add-car"
    >
      <div className="decorative-elements">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <Container fluid className="p-0">
        <div className="form-wrapper">
          <div className="form-header">
            <div className="header-icon">🚘</div>
            <h2>
              <span className="gradient-text">Publier</span> une Annonce
            </h2>
            <p className="subtitle">Ajoutez votre véhicule en quelques étapes simples</p>
            <div className="user-info">
              <div className="user-badge">
                <i className="fas fa-user me-2"></i>
                Connecté en tant que: <strong>{user.username}</strong>
              </div>
            </div>
          </div>

          <Form onSubmit={handleSubmit} className="modern-form">
            <Row>
              <Col md={8}>
                <div className="form-section">
                  <div className="section-header">
                    <h3>
                      <i className="fas fa-car me-2"></i>
                      Informations du Véhicule
                    </h3>
                    <p>Renseignez les détails de votre véhicule</p>
                  </div>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="make" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-industry me-2"></i>
                          Marque
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="make"
                          value={formData.car.make}
                          onChange={handleMakeChange}
                          required
                          className="modern-select"
                        >
                          <option value="">Sélectionnez une marque</option>
                          {Object.keys(carData).map((make) => (
                            <option key={make} value={make}>
                              {make.replace('_', ' ')}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="model" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-car-side me-2"></i>
                          Modèle
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="model"
                          value={formData.car.model}
                          onChange={handleChange}
                          required
                          disabled={!formData.car.make}
                          className="modern-select"
                        >
                          <option value="">Sélectionnez un modèle</option>
                          {formData.car.make &&
                            carData[formData.car.make].map((model) => (
                              <option key={model} value={model}>
                                {model}
                              </option>
                            ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="color" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-palette me-2"></i>
                          Couleur
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="color"
                          value={formData.car.color}
                          onChange={handleChange}
                          placeholder="Ex: Rouge, Bleu, Noir..."
                          required
                          className="modern-input"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="year" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-calendar-alt me-2"></i>
                          Année
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="year"
                          value={formData.car.year}
                          onChange={handleChange}
                          placeholder="Ex: 1995, 2010, 2023..."
                          min="1886"
                          max={new Date().getFullYear() + 1}
                          required
                          className="modern-input"
                        />
                        <Form.Text className="year-help-text">
                          <small>
                            <i className="fas fa-info-circle me-1"></i>
                            Accepte toutes les années depuis 1886 (voitures anciennes et récentes)
                          </small>
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="powerRating" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-tachometer-alt me-2"></i>
                          Puissance (CV)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="powerRating"
                          value={formData.car.powerRating}
                          onChange={handleChange}
                          placeholder="Ex: 150"
                          required
                          className="modern-input"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="numberOfDoors" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-door-open me-2"></i>
                          Nombre de Portes
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="numberOfDoors"
                          value={formData.car.numberOfDoors}
                          onChange={handleChange}
                          required
                          className="modern-select"
                        >
                          <option value="">Sélectionnez</option>
                          <option value="2">2 portes</option>
                          <option value="3">3 portes</option>
                          <option value="4">4 portes</option>
                          <option value="5">5 portes</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="fuelTankCapacity" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-gas-pump me-2"></i>
                          Capacité Réservoir (L)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="fuelTankCapacity"
                          value={formData.car.fuelTankCapacity}
                          onChange={handleChange}
                          placeholder="Ex: 60"
                          required
                          className="modern-input"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="maximumSpeed" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-speedometer me-2"></i>
                          Vitesse Max (km/h)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="maximumSpeed"
                          value={formData.car.maximumSpeed}
                          onChange={handleChange}
                          placeholder="Ex: 200"
                          required
                          className="modern-input"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="mileage" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-road me-2"></i>
                          Kilométrage
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="mileage"
                          value={formData.car.mileage}
                          onChange={handleChange}
                          placeholder="Ex: 50000"
                          required
                          className="modern-input"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="price" className="mb-4">
                        <Form.Label>
                          <i className="fas fa-euro-sign me-2"></i>
                          Prix (TND)
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          value={formData.car.price}
                          onChange={handleChange}
                          placeholder="Ex: 30000"
                          required
                          className="modern-input"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="options" className="mb-4">
                    <Form.Label>
                      <i className="fas fa-cogs me-2"></i>
                      Options et Équipements
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="options"
                      value={formData.car.options}
                      onChange={handleChange}
                      placeholder="Ex: Climatisation, GPS, Sièges chauffants, Toit ouvrant..."
                      required
                      className="modern-textarea"
                    />
                  </Form.Group>
                </div>
              </Col>

              <Col md={4}>
                <div className="image-upload-section">
                  <div className="upload-header">
                    <h3>
                      <i className="fas fa-images me-2"></i>
                      Images du Véhicule
                    </h3>
                    <p>Ajoutez des photos de qualité pour attirer les acheteurs</p>
                  </div>
                  
                  <div className="upload-container">
                    <button 
                      type="button"
                      className="upload-button"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <i className="fas fa-plus"></i>
                      <span>Ajouter des photos</span>
                    </button>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      ref={fileInputRef}
                      className="file-input"
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </div>

                  <div className="upload-tips">
                    <h4>
                      <i className="fas fa-lightbulb me-2"></i>
                      Conseils Photo
                    </h4>
                    <ul>
                      <li>Prenez des photos sous différents angles</li>
                      <li>Assurez-vous d'un bon éclairage</li>
                      <li>Montrez l'intérieur et l'extérieur</li>
                      <li>Mettez en valeur les points forts</li>
                    </ul>
                  </div>

                  <motion.div className="image-preview-grid">
                    {formData.imagePreviews.map((src, index) => (
                      <motion.div
                        key={index}
                        className="preview-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="preview-image-wrapper">
                          <img src={src} alt={`Preview ${index + 1}`} />
                          <div className="image-overlay">
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(index)}
                              className="delete-button"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                          <div className="image-number">{index + 1}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </Col>
            </Row>

            <div className="form-actions">
              <Button type="submit" className="submit-button">
                <i className="fas fa-paper-plane me-2"></i>
                Publier l'Annonce
                <div className="button-shine"></div>
              </Button>
            </div>
          </Form>
        </div>
      </Container>

      <style jsx>{`
        .modern-add-car {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 2rem 0;
          position: relative;
          overflow: hidden;
        }

        .decorative-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .gradient-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
        }

        .sphere-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(153, 27, 27, 0.15));
          top: -100px;
          right: -50px;
          animation: float 20s infinite ease-in-out;
        }

        .sphere-2 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(153, 27, 27, 0.1));
          bottom: -50px;
          left: -100px;
          animation: float 25s infinite ease-in-out reverse;
        }

        .sphere-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(153, 27, 27, 0.08));
          top: 40%;
          right: 15%;
          animation: float 18s infinite ease-in-out;
        }

        .grid-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(rgba(239, 68, 68, 0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(239, 68, 68, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.3;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, 10px) rotate(2deg); }
          50% { transform: translate(0, 20px) rotate(-2deg); }
          75% { transform: translate(-10px, 10px) rotate(2deg); }
        }

        .form-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 3rem;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.6);
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .form-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.12),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .form-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .header-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .form-header h2 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #1a202c;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .gradient-text::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(135deg, #ef4444, #991b1b);
          border-radius: 3px;
          opacity: 0.6;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto 1.5rem;
          font-weight: 500;
        }

        .user-info {
          margin-top: 1.5rem;
        }

        .user-badge {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(153, 27, 27, 0.1));
          color: #ef4444;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 500;
          border: 2px solid rgba(239, 68, 68, 0.2);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.1);
        }

        .user-badge strong {
          color: #991b1b;
          margin-left: 0.5rem;
        }

        .form-section {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.1);
        }

        .section-header {
          margin-bottom: 2rem;
          text-align: center;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #f1f5f9;
        }

        .section-header h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-header h3 i {
          color: #ef4444;
        }

        .section-header p {
          color: #6b7280;
          font-size: 1rem;
          margin: 0;
        }

        .form-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          font-size: 0.95rem;
        }

        .form-label i {
          color: #ef4444;
          width: 16px;
        }

        .modern-input, .modern-select, .modern-textarea {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          padding: 0.9rem 1.2rem;
          transition: all 0.3s ease;
          font-size: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .modern-input:focus, .modern-select:focus, .modern-textarea:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
          transform: translateY(-2px);
          background: white;
        }

        .modern-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .year-help-text {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
          border-left: 3px solid #10b981;
          padding: 8px 12px;
          border-radius: 6px;
          margin-top: 8px;
          font-size: 0.85rem;
          color: #059669;
        }

        .year-help-text i {
          color: #10b981;
        }

        .image-upload-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.1);
          position: sticky;
          top: 2rem;
        }

        .upload-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .upload-header h3 {
          font-size: 1.6rem;
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-header h3 i {
          color: #ef4444;
        }

        .upload-header p {
          color: #6b7280;
          font-size: 0.95rem;
          margin: 0;
        }

        .upload-container {
          margin-bottom: 2rem;
        }

        .upload-button {
          width: 100%;
          height: 120px;
          border: 3px dashed #ef4444;
          border-radius: 15px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(153, 27, 27, 0.05));
          color: #ef4444;
          font-size: 1.1rem;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-button:hover {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(153, 27, 27, 0.1));
          border-color: #991b1b;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.2);
        }

        .upload-button i {
          font-size: 2rem;
        }

        .upload-tips {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border-left: 4px solid #ef4444;
        }

        .upload-tips h4 {
          font-size: 1.1rem;
          color: #1f2937;
          margin-bottom: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .upload-tips h4 i {
          color: #ef4444;
        }

        .upload-tips ul {
          margin: 0;
          padding-left: 1.2rem;
        }

        .upload-tips li {
          color: #4b5563;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .image-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 1rem;
          max-height: 400px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .preview-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 1;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .preview-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .preview-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .preview-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .preview-card:hover .image-overlay {
          opacity: 1;
        }

        .delete-button {
          background: #ef4444;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .delete-button:hover {
          background: #991b1b;
          transform: scale(1.1);
        }

        .image-number {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .form-actions {
          text-align: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 2px solid #f1f5f9;
        }

        .submit-button {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          border: none;
          padding: 1.2rem 3rem;
          border-radius: 15px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
          display: inline-flex;
          align-items: center;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(239, 68, 68, 0.4);
          background: linear-gradient(135deg, #991b1b, #ef4444);
        }

        .button-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: 0.6s;
        }

        .submit-button:hover .button-shine {
          left: 100%;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .form-wrapper {
            margin: 1rem;
            padding: 2rem;
          }

          .form-header h2 {
            font-size: 2.2rem;
          }

          .form-section {
            padding: 1.5rem;
          }

          .image-upload-section {
            padding: 1.5rem;
            position: static;
          }

          .image-preview-grid {
            grid-template-columns: repeat(2, 1fr);
            max-height: 250px;
          }

          .user-badge {
            font-size: 0.9rem;
            padding: 0.6rem 1.2rem;
          }
        }

        @media (max-width: 576px) {
          .form-header h2 {
            font-size: 1.8rem;
          }

          .section-header h3 {
            font-size: 1.4rem;
          }

          .submit-button {
            width: 100%;
            padding: 1rem 2rem;
          }
        }
      `}</style>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          background: 'white',
          color: '#1f2937',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}
      />
    </motion.div>
  );
}

export default AddCar;
