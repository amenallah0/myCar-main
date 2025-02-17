import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiCarService from "../services/apiCarServices";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

const ShopDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await ApiCarService.getCarById(id);
        setCar(response);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Error fetching car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!car) return <div>Error loading car details.</div>;

  const generateCarDescription = (car) => {
    return `This ${car.make} ${car.model} comes in a stunning ${car.color} color. 
      It was manufactured in the year ${car.year} and features a power rating of ${car.powerRating} HP. 
      With ${car.numberOfDoors} doors, it offers a fuel tank capacity of ${car.fuelTankCapacity} liters and can reach a maximum speed of ${car.maximumSpeed} km/h. 
      The car has ${car.mileage} km on the odometer and is equipped with the following options: ${car.options || "Standard options"}. 
      All of this is available at a price of ${car.price} TND.`;
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <section className="product-details space-top">
      <div className="container">
        <div className="row gx-4">
          <div className="col-lg-6">
            <Carousel showThumbs={false} infiniteLoop autoPlay selectedItem={selectedImageIndex}>
              {car.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={`http://localhost:8081/api/files/download/${image.filename}`}
                    alt={`${car.make} ${car.model}`}
                    style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </Carousel>
            <div className="row mt-4 justify-content-center">
              {car.images.map((image, index) => (
                <div key={index} className="col-3 text-center mb-3">
                  <img
                    src={`http://localhost:8081/api/files/download/${image.filename}`}
                    alt={`${car.make} ${car.model}`}
                    className={`img-thumbnail ${index === selectedImageIndex ? "active" : ""}`}
                    style={{ cursor: "pointer", maxHeight: "85px", width: "100%", objectFit: "cover" }}
                    onClick={() => handleThumbnailClick(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="product-about p-3 border rounded shadow-sm ml-3 ">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-primary-custom h3"style={{textDecoration:"underline"}}>
                  {car.make} {car.model}
                </h2>
                <p className="price h3 text-primary-custom mb-0 " style={{color:'#F20F0F',textDecoration:"underline"}}>
                  {car.price} TND <span className="text-muted text-secondary-custom text-decoration-line-through" >{car.previousPrice}</span>
                </p>
              </div>
              <table className="table table-striped table-custom mt-4">
                <tbody>
                  <tr>
                    <th scope="row">Color</th>
                    <td>{car.color}</td>
                  </tr>
                  <tr>
                    <th scope="row">Year</th>
                    <td>{car.year}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mileage</th>
                    <td>{car.mileage} km</td>
                  </tr>
                  <tr>
                    <th scope="row">Options</th>
                    <td>{car.options}</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="product-description mt-4">
                <p>{car.description}</p>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary-custom btn-lg mx-auto">Buy Now</button>
                <button className="btn btn-primary-custom btn-lg mx-auto">Demande An Expert</button>
              </div>

            </div>
          </div>

        </div>

        {/* Product Tabs */}
        <div className="product-tab-area mt-4">
          <ul className="nav product-tab-style1" id="productTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="description-tab"
                data-bs-toggle="tab"
                href="#description"
                role="tab"
                aria-controls="description"
                aria-selected="true"
              >
                Description
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="info-tab"
                data-bs-toggle="tab"
                href="#add_info"
                role="tab"
                aria-controls="add_info"
                aria-selected="false"
              >
                Additional Information
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="reviews-tab"
                data-bs-toggle="tab"
                href="#reviews"
                role="tab"
                aria-controls="reviews"
                aria-selected="false"
              >
                Reviews ({car.reviews})
              </a>
            </li>
          </ul>
          <div className="tab-content" id="productTabContent">
            <div
              className="tab-pane fade show active"
              id="description"
              role="tabpanel"
              aria-labelledby="description-tab"
            >
              <p>{generateCarDescription(car)}</p>
            </div>
            <div
              className="tab-pane fade"
              id="add_info"
              role="tabpanel"
              aria-labelledby="add_info"
            >
              <div className="product-about p-3 border rounded shadow-sm ml-3">
                <table className="table table-striped mt-4">
                  <tbody>
                    <tr>
                      <th scope="row">Brand</th>
                      <td>{car.make}</td>
                    </tr>
                    <tr>
                      <th scope="row">Model</th>
                      <td>{car.model}</td>
                    </tr>
                    <tr>
                      <th scope="row">Color</th>
                      <td>{car.color}</td>
                    </tr>
                    <tr>
                      <th scope="row">Year</th>
                      <td>{car.year}</td>
                    </tr>
                    <tr>
                      <th scope="row">Power Rating</th>
                      <td>{car.powerRating}</td>
                    </tr>
                    <tr>
                      <th scope="row">Number of Doors</th>
                      <td>{car.numberOfDoors}</td>
                    </tr>
                    <tr>
                      <th scope="row">Fuel Tank Capacity</th>
                      <td>{car.fuelTankCapacity}</td>
                    </tr>
                    <tr>
                      <th scope="row">Maximum Speed</th>
                      <td>{car.maximumSpeed}</td>
                    </tr>
                    <tr>
                      <th scope="row">Mileage</th>
                      <td>{car.mileage}</td>
                    </tr>
                    <tr>
                      <th scope="row">Options</th>
                      <td>{car.options}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="reviews"
              role="tabpanel"
              aria-labelledby="reviews-tab"
            >
              {/* Reviews content */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ShopDetails;
