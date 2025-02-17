import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import ApiCarService from "./../services/apiCarServices";
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
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4 fw-bold ">Add Car</h2>
              <Form onSubmit={handleSubmit}>
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
                    <Form.Group controlId="images" className="mb-3">
                      <Form.Label>Images</Form.Label>
                      <Form.Control
                        type="file"
                        name="images"
                        onChange={handleFileChange}
                        multiple
                        ref={fileInputRef}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mt-4">
                      Submit
                    </Button>
                  </Col>
                  <Col md={4} className="d-flex align-items-center">
                    <div>
                      <h3 className="text-center mb-3">Image Previews</h3>
                      <div
                        className="d-flex flex-wrap justify-content-center"
                        style={{
                          height: '750px',
                          overflowY: formData.imagePreviews.length > 3 ? 'auto' : 'hidden',
                        }}
                      >
                        {formData.imagePreviews.map((src, index) => (
                          <div key={index} className="position-relative m-2">
                            <img
                              src={src}
                              alt="Preview"
                              className="img-thumbnail"
                              style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              className="position-absolute top-0 end-0 p-1"
                              style={{ fontSize: '0.8rem' }}
                              onClick={() => handleDeleteImage(index)}
                            >
                              X
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default AddCar;
