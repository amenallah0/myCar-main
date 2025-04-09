import React, { useEffect, useState } from "react";
import ApiCarService from "../services/apiCarServices"; // Adjust the import path as needed
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Import main Swiper styles
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper"; // Import the Autoplay and Navigation modules
import moment from "moment"; // Import moment.js to format the date
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// Register the Autoplay, Pagination, and Navigation modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

const HeroSix = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCars = async () => {
      try {
        const response = await ApiCarService.getLatestCars();
        setCars([...response]);
      } catch (error) {
        console.error("Error fetching latest cars:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPromotedCars = async () => {
      try {
        const response = await ApiCarService.getPromotedCars();
        setCars([...response]);
      } catch (error) {
        console.error("Error fetching promoted cars:", error);
      }
    };

    fetchLatestCars();
    fetchPromotedCars();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="hero-wrapper" id="hero">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-6 py-5" style={{ backgroundColor: "#EAE1D6" }}>
          <div className="row flex-row-reverse align-items-center">
            <div className="col-md-6">
              <div className="hero-thumb text-center">
                <img
                  src="assets/img/update-img/homepage.jpeg"
                  alt="MyCar"
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="hero-style6">
                <span className="sub-title">Welcome To MyCar</span>
                <h1 className="hero-title">Your Best Way To Buy A Car</h1>
                <div className="btn-group mt-3">
                  <Link to="/shop" className="btn btn-primary-custom btn-lg ">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Latest Cars Section */}
        <div className="latest-cars-section py-5">
          <h3 className="text-center mb-4">Latest Cars For Sale</h3>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            // pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="swiper-wrapper"
          >
            {cars.length > 0 ? (
              cars.map((car) => (
                <SwiperSlide key={car.id}>
                  <div className="hero-intro-card" style={{ backgroundColor: "#F2F2EF" }}>
                    <div className="intro-card-img">
                      <img
                        src={`http://localhost:8081/api/files/download/${car.images[0]?.filename}`}
                        alt={`${car.make} ${car.model}`}
                        className="img-fluid"
                        style={{ height: '300px', objectFit: 'fill' }}
                      />
                    </div>
                    <div className="intro-card-details">
                      <h6 className="intro-card-subtitle">
                        {moment(car.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </h6>
                      <h4 className="intro-card-title">
                        <Link to={`/shop-details/${car.id}`}>
                          {car.make} {car.model}
                        </Link>
                      </h4>
                      <Link to={`/shop-details/${car.id}`} className="btn style5 style-radius">
                        Shop Now
                        <i className="fas fa-arrow-right ms-2" />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="lead">No cars available at the moment. Please check back later!</p>
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HeroSix;
