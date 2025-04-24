import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { FreeMode, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

// Example data for car brands - replace with your actual data source
const carBrands = [
  { id: 1, name: "Toyota", logo: "/assets/img/cars/toyota.jpg" },
  { id: 2, name: "Mercedes", logo: "/assets/img/cars/mercedes.jpg" },
  { id: 3, name: "BMW", logo: "/assets/img/cars/bmw.png" },
  { id: 4, name: "Citroen", logo: "/assets/img/cars/citroen.jpg" },
  { id: 5, name: "Seat", logo: "/assets/img/cars/seat.jpg" },
  { id: 6, name: "Peugeot", logo: "/assets/img/cars/peugeot.jpg" },
  { id: 7, name: "Ford", logo: "/assets/img/cars/ford.jpg" },
];

// Duplicate the car brands array to ensure smooth scrolling
const extendedCarBrands = [...carBrands, ...carBrands, ...carBrands];

const CategoryAreaOne = () => {
  return (
    <div className="category-area-1 pt-5 pb-5">
      <div className="container">
        <h4 className="text-center fw-bold mb-4">Featured Car Brands</h4>
        <div className="row gx-0">
          <Swiper
            modules={[FreeMode, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            speed={2000}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 4,
              },
            }}
            className="category-slider-1"
          >
            {extendedCarBrands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="img-fluid mb-2"
                    style={{ maxHeight: '150px' }}
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  />
                  <h6 className="text-center">
                    <Link to={`/shop/brand/${brand.id}`} className="text-decoration-none">{brand.name}</Link>
                  </h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CategoryAreaOne;
