import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import ApiCarService from "./../services/apiCarServices";
import { motion } from "framer-motion";

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
    userId: '',
    images: [],
    imagePreviews: [],
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleUserIdChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      userId: e.target.value
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

    try {
        await ApiCarService.addCarWithImagesToUser(formData.userId, formData.car, formData.images);
        toast.success('Car added successfully!');
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
            userId: '',
            images: [],
            imagePreviews: [],
        });
        fileInputRef.current.value = null;
    } catch (error) {
        toast.error('Error adding car');
        console.error('Error adding car:', error);
    }
};

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
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="form-header"
          >
            <div className="header-icon">🚘</div>
            <h2>
              <span className="gradient-text">Publier</span> une Annonce
            </h2>
            <p className="subtitle">Ajoutez votre véhicule en quelques étapes simples</p>
            <div className="progress-bar">
              <div className="progress-step active">
                <span className="step-number">1</span>
                <span className="step-text">Informations</span>
              </div>
              <div className="progress-line"></div>
              <div className="progress-step">
                <span className="step-number">2</span>
                <span className="step-text">Images</span>
              </div>
              <div className="progress-line"></div>
              <div className="progress-step">
                <span className="step-number">3</span>
                <span className="step-text">Publication</span>
              </div>
            </div>
          </motion.div>

          <Form onSubmit={handleSubmit} className="modern-form">
            <Row>
              <Col md={8}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="make" className="mb-3">
                      <Form.Label>Make</Form.Label>
                      <Form.Control
                        as="select"
                        name="make"
                        value={formData.car.make}
                        onChange={handleMakeChange}
                        required
                      >
                        <option value="">Select make</option>
                        {Object.keys(carData).map((make) => (
                          <option key={make} value={make}>
                            {make}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="model" className="mb-3">
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        as="select"
                        name="model"
                        value={formData.car.model}
                        onChange={handleChange}
                        required
                        disabled={!formData.car.make}
                      >
                        <option value="">Select model</option>
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
                    <Form.Group controlId="color" className="mb-3">
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        type="text"
                        name="color"
                        value={formData.car.color}
                        onChange={handleChange}
                        placeholder="Enter car color"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="year" className="mb-3">
                      <Form.Label>Year</Form.Label>
                      <Form.Control
                        type="number"
                        name="year"
                        value={formData.car.year}
                        onChange={handleChange}
                        placeholder="Enter car year"
                        min="1886"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="powerRating" className="mb-3">
                      <Form.Label>Power Rating</Form.Label>
                      <Form.Control
                        type="number"
                        name="powerRating"
                        value={formData.car.powerRating}
                        onChange={handleChange}
                        placeholder="Enter power rating"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="numberOfDoors" className="mb-3">
                      <Form.Label>Number of Doors</Form.Label>
                      <Form.Control
                        type="number"
                        name="numberOfDoors"
                        value={formData.car.numberOfDoors}
                        onChange={handleChange}
                        placeholder="Enter number of doors"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="fuelTankCapacity" className="mb-3">
                      <Form.Label>Fuel Tank Capacity</Form.Label>
                      <Form.Control
                        type="number"
                        name="fuelTankCapacity"
                        value={formData.car.fuelTankCapacity}
                        onChange={handleChange}
                        placeholder="Enter fuel tank capacity"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="maximumSpeed" className="mb-3">
                      <Form.Label>Maximum Speed</Form.Label>
                      <Form.Control
                        type="number"
                        name="maximumSpeed"
                        value={formData.car.maximumSpeed}
                        onChange={handleChange}
                        placeholder="Enter maximum speed"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="mileage" className="mb-3">
                      <Form.Label>Mileage</Form.Label>
                      <Form.Control
                        type="number"
                        name="mileage"
                        value={formData.car.mileage}
                        onChange={handleChange}
                        placeholder="Enter mileage"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="options" className="mb-3">
                      <Form.Label>Options</Form.Label>
                      <Form.Control
                        type="text"
                        name="options"
                        value={formData.car.options}
                        onChange={handleChange}
                        placeholder="Enter car options"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="price" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.car.price}
                    onChange={handleChange}
                    placeholder="Enter car price"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="userId" className="mb-3">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleUserIdChange}
                    placeholder="Enter user ID"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-4">
                  Submit
                </Button>
              </Col>
              <Col md={4}>
                <div className="image-upload-section">
                  <div className="upload-header">
                    <h3>Images du Véhicule</h3>
                  </div>
                  
                  <div className="upload-container">
                    <button 
                      type="button"
                      className="upload-button"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <span>+</span>
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
                              <span>×</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>

      <style jsx>{`
        .modern-add-car {
          min-height: 100vh;
          background: linear-gradient(135deg, #f6f8fd 0%, #f1f4f9 100%);
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
          background: linear-gradient(135deg, rgba(232, 9, 46, 0.15), rgba(255, 71, 87, 0.15));
          top: -100px;
          right: -50px;
          animation: float 20s infinite ease-in-out;
        }

        .sphere-2 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, rgba(66, 153, 225, 0.15), rgba(129, 230, 217, 0.15));
          bottom: -50px;
          left: -100px;
          animation: float 25s infinite ease-in-out reverse;
        }

        .sphere-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(232, 9, 46, 0.1), rgba(255, 71, 87, 0.1));
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
          background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.3;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, 10px) rotate(2deg); }
          50% { transform: translate(0, 20px) rotate(-2deg); }
          75% { transform: translate(-10px, 10px) rotate(2deg); }
        }

        .header-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .progress-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2rem;
          padding: 1rem;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .step-number {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #64748b;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-number {
          background: linear-gradient(135deg, #E8092E, #ff4757);
          color: white;
          border-color: transparent;
        }

        .step-text {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #64748b;
        }

        .progress-line {
          width: 100px;
          height: 2px;
          background: #e2e8f0;
          margin: 0 1rem;
        }

        .form-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.05),
            0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.5);
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .form-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .form-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .form-header h2 {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #1a202c;
        }

        .gradient-text {
          background: linear-gradient(135deg, #E8092E, #ff4757);
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
          height: 3px;
          background: linear-gradient(135deg, #E8092E, #ff4757);
          border-radius: 3px;
          opacity: 0.5;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .modern-form {
          display: grid;
          gap: 2rem;
        }

        .form-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .form-label {
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
          display: block;
        }

        .form-control {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(226, 232, 240, 0.8);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #E8092E;
          box-shadow: 0 0 0 3px rgba(232, 9, 46, 0.1);
          transform: translateY(-2px);
        }

        .btn-submit {
          background: linear-gradient(135deg, #E8092E, #ff4757);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: 0.5s;
        }

        .btn-submit:hover::before {
          left: 100%;
        }

        .btn-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(232, 9, 46, 0.2);
        }

        @media (max-width: 768px) {
          .form-wrapper {
            margin: 1rem;
            padding: 1.5rem;
          }

          .form-header h2 {
            font-size: 2rem;
          }

          .progress-bar {
            flex-direction: column;
            gap: 1rem;
          }

          .progress-line {
            width: 2px;
            height: 30px;
            margin: 0.5rem 0;
          }
        }

        .image-upload-section {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .upload-header {
          margin-bottom: 1.5rem;
        }

        .upload-header h3 {
          font-size: 1.5rem;
          color: #1a202c;
          margin: 0;
        }

        .upload-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .upload-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8092E, #ff4757);
          border: none;
          color: white;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(232, 9, 46, 0.2);
        }

        .upload-button:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 6px 20px rgba(232, 9, 46, 0.3);
        }

        .image-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
          max-height: 450px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .preview-card {
          position: relative;
          border-radius: 16px;
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
          border-radius: 16px;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
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
          background: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #E8092E;
          font-size: 1.4rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .delete-button:hover {
          background: #E8092E;
          color: white;
          transform: scale(1.1) rotate(90deg);
        }

        @media (max-width: 768px) {
          .image-preview-grid {
            grid-template-columns: repeat(2, 1fr);
            max-height: 300px;
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
      />
    </motion.div>
  );
}

export default AddCar;
