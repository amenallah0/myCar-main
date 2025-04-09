import React, { useState, useEffect, useCallback } from "react";
import Slider from "rc-slider";
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ApiCarService from '../services/apiCarServices';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// Import required modules
const ShopArea = () => {
  const [range, setRange] = useState([0, 100]);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [carMakes, setCarMakes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(600);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const fetchCars = useCallback(async (query = "", category = "") => {
    try {
      const response = await ApiCarService.getAllCars();
      const filtered = response.filter(car => 
        (car.make.toLowerCase().includes(query.toLowerCase()) ||
        car.model.toLowerCase().includes(query.toLowerCase())) &&
        (category === "" || car.make === category)
      );
      setCars(filtered);

      const makes = [...new Set(filtered.map(car => car.make))];
      setCarMakes(makes);

      const highestPrice = Math.max(...filtered.map(car => car.price));
      setMaxPrice(Math.ceil(highestPrice / 1000) * 1000);
      setRange([0, Math.ceil(highestPrice / 1000) * 1000]);

      filterByPrice(filtered, [0, Math.ceil(highestPrice / 1000) * 1000]);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Error fetching cars');
    }
  }, []);

  useEffect(() => {
    fetchCars(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, fetchCars]);

  useEffect(() => {
    filterByPrice(cars, range);
  }, [range, cars]);

  useEffect(() => {
    sortCars(sortOrder, cars);
  }, [sortOrder, cars]);

  const filterByPrice = (cars, range) => {
    const [min, max] = range;
    const filtered = cars.filter(car => car.price >= min && car.price <= max);
    setFilteredCars(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    setSearchQuery(query);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
  };

  const sortCars = (order, carsToSort) => {
    const sortedCars = [...carsToSort];
    if (order === "date") {
      sortedCars.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (order === "price") {
      sortedCars.sort((a, b) => a.price - b.price);
    } else if (order === "price-desc") {
      sortedCars.sort((a, b) => b.price - a.price);
    }
    setFilteredCars(sortedCars);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIdx = (currentPage - 1) * carsPerPage;
  const endIdx = Math.min(startIdx + carsPerPage, filteredCars.length);
  const displayedCars = filteredCars.slice(startIdx, endIdx);

  const saveCarToFavorites = (car) => {
    const existingFavorites = [...favorites];
    const isAlreadyFavorite = existingFavorites.some(favCar => favCar.id === car.id);

    if (isAlreadyFavorite) {
      const updatedFavorites = existingFavorites.filter(favCar => favCar.id !== car.id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...existingFavorites, car];
      setFavorites(updatedFavorites);
      localStorage.setItem('favoriteCars', JSON.stringify(updatedFavorites));
    }
  };

  const isCarFavorite = (carId) => {
    return favorites.some(favCar => favCar.id === carId);
  };

  const CarImageCarousel = ({ images }) => {
    return (
      <div style={{ height: '300px', overflow: 'hidden' }}>
        <img
          src={`http://localhost:8081/api/files/download/${images[0]?.filename}`}
          alt="Car image"
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover'
          }}
          loading="lazy"
        />
      </div>
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchCars(searchQuery, category);
  };

  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-xl-3 col-lg-4">
            <aside className="sidebar-filter">
              {/* Search */}
              <div className="filter-section">
                <h3 className="filter-title">
                  <i className="fas fa-search"></i> Recherche
                </h3>
                <form className="search-form" onSubmit={handleSearch}>
                  <div className="search-input-wrapper">
                    <input 
                      type="text" 
                      name="search" 
                      placeholder="Rechercher une voiture..." 
                    />
                    <button type="submit" className="search-btn">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Categories with badges */}
              <div className="filter-section">
                <h3 className="filter-title">
                  <i className="fas fa-car"></i> Marques
                </h3>
                <div className="categories-list">
                  <div 
                    className={`category-item ${selectedCategory === "" ? 'active' : ''}`}
                    onClick={() => handleCategoryChange("")}
                  >
                    <div className="category-content">
                      <i className="fas fa-layer-group"></i>
                      <span>Toutes les marques</span>
                    </div>
                    <span className="badge">{filteredCars.length}</span>
                  </div>
                  {carMakes.map((make, index) => (
                    <div 
                      key={index}
                      className={`category-item ${selectedCategory === make ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(make)}
                    >
                      <div className="category-content">
                        <i className="fas fa-car"></i>
                        <span>{make}</span>
                      </div>
                      <span className="badge">
                        {filteredCars.filter(car => car.make === make).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range with improved slider */}
              <div className="filter-section">
                <h3 className="filter-title">
                  <i className="fas fa-tag"></i> Prix
                </h3>
                <div className="price-filter">
                  <Slider
                    range
                    min={0}
                    max={maxPrice}
                    value={range}
                    onChange={handleRangeChange}
                    railStyle={{ 
                      backgroundColor: '#e0e0e0',
                      height: '4px'
                    }}
                    trackStyle={[{ 
                      backgroundColor: '#E8092E',
                      height: '4px'
                    }]}
                    handleStyle={[
                      { 
                        backgroundColor: 'white',
                        borderColor: '#E8092E',
                        borderWidth: '2px',
                        width: '20px',
                        height: '20px',
                        marginTop: '-8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      },
                      {
                        backgroundColor: 'white',
                        borderColor: '#E8092E',
                        borderWidth: '2px',
                        width: '20px',
                        height: '20px',
                        marginTop: '-8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }
                    ]}
                  />
                  <div className="price-range-display">
                    <div className="price-box">
                      <span className="price-label">Prix minimum</span>
                      <span className="price-value">{range[0]} TND</span>
                    </div>
                    <div className="price-box">
                      <span className="price-label">Prix maximum</span>
                      <span className="price-value">{range[1]} TND</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="shop-header">
              <div className="results-info">
                <i className="fas fa-car-side"></i>
                <span>
                  Affichage de <strong>{startIdx + 1}-{endIdx}</strong> sur <strong>{filteredCars.length}</strong> résultats
                </span>
              </div>
              <div className="shop-actions">
                <Link to="/AddCar" className="btn-add-car">
                  <i className="fas fa-plus"></i>
                  <span>Ajouter une voiture</span>
                </Link>
                <div className="sort-wrapper">
                  <select
                    className="sort-select"
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option value="date">Plus récent</option>
                    <option value="price">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row" style={{ willChange: 'transform' }}>
              {displayedCars.map((car) => (
                <div className="col-md-4 mb-4" key={car.id}>
                  <div className="car-card">
                    <div className="car-image">
                      <CarImageCarousel images={car.images} />
                      <div className="car-overlay">
                        <span className="price-tag">{car.price} TND</span>
                        <button 
                          onClick={() => saveCarToFavorites(car)} 
                          className="favorite-btn"
                        >
                          <i className={`fas fa-heart ${isCarFavorite(car.id) ? 'active' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <div className={`availability-strip ${car.available ? 'available' : 'unavailable'}`}>
                      {car.available ? 'Disponible' : 'Non disponible'}
                    </div>
                    <div className="car-info">
                      <div className="car-header">
                        <h3 className="car-title">{car.make} {car.model}</h3>
                        <span className="car-year">{car.year}</span>
                      </div>
                      
                      <div className="car-specs">
                        <div className="spec-item">
                          <i className="fas fa-tachometer-alt"></i>
                          <span>{car.mileage} km</span>
                        </div>
                        <div className="spec-item">
                          <i className="fas fa-horse"></i>
                          <span>{car.powerRating} HP</span>
                        </div>
                      </div>

                      <div className="car-actions">
                        <Link to={`/shop-details/${car.id}`} className="details-btn">
                          Voir Détails <i className="fas fa-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination justify-content-center mt-70">
              <ul>
                {[...Array(totalPages).keys()].map(pageNumber => (
                  <li key={pageNumber + 1}>
                    <Link
                      to="#"
                      onClick={() => handlePageChange(pageNumber + 1)}
                      className={pageNumber + 1 === currentPage ? 'active' : ''}
                    >
                      {pageNumber + 1}
                    </Link>
                  </li>
                ))}
                {currentPage < totalPages && (
                  <li>
                    <Link to="#" onClick={() => handlePageChange(currentPage + 1)}>
                      <i className="fas fa-angle-right" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .car-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .car-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .car-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .car-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          z-index: 2;
        }

        .price-tag {
          background: rgba(232, 9, 46, 0.9);
          color: white;
          padding: 8px 15px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1.1rem;
          backdrop-filter: blur(5px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .car-card:hover .price-tag {
          transform: translateY(5px);
          background: rgba(232, 9, 46, 1);
        }

        .favorite-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(5px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .favorite-btn i {
          color: #666;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .favorite-btn i.active {
          color: #E8092E;
        }

        .favorite-btn:hover {
          transform: scale(1.1);
        }

        .car-info {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          margin-top: 0;
        }

        .car-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .car-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .car-year {
          background: #f8f9fa;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #666;
        }

        .car-specs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .spec-item i {
          color: #E8092E;
          font-size: 1.1rem;
          background: rgba(232, 9, 46, 0.1);
          padding: 8px;
          border-radius: 8px;
        }

        .spec-item span {
          font-size: 0.9rem;
          color: #666;
        }

        .car-actions {
          margin-top: auto;
        }

        .details-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 25px;
          background: #E8092E;
          color: white;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          width: 100%;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .details-btn:hover {
          background: #c7082a;
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .car-image {
            height: 180px;
          }

          .car-title {
            font-size: 1.1rem;
          }

          .price-tag {
            font-size: 1rem;
            padding: 6px 12px;
          }

          .car-specs {
            padding: 10px;
          }

          .spec-item i {
            padding: 6px;
          }
        }

        .sidebar-filter {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: sticky;
          top: 20px;
        }

        .filter-section {
          padding: 25px;
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.3s ease;
        }

        .filter-section:hover {
          background: #fafafa;
        }

        .filter-title {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-title i {
          color: #E8092E;
          background: rgba(232, 9, 46, 0.1);
          padding: 8px;
          border-radius: 8px;
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-input-wrapper input {
          width: 100%;
          padding: 12px 45px 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .search-input-wrapper input:focus {
          border-color: #E8092E;
          outline: none;
          box-shadow: 0 0 0 3px rgba(232, 9, 46, 0.1);
        }

        .search-btn {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #666;
          padding: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          color: #E8092E;
        }

        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .category-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .category-item:hover {
          background: #f0f0f0;
          transform: translateX(5px);
        }

        .category-item.active {
          background: #E8092E;
          color: white;
        }

        .badge {
          background: rgba(0, 0, 0, 0.1);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .category-item.active .badge {
          background: rgba(255, 255, 255, 0.2);
        }

        .price-range-display {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 25px;
        }

        .price-box {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .price-box:hover {
          background: white;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .price-label {
          display: block;
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 5px;
        }

        .price-value {
          font-weight: 600;
          color: #E8092E;
        }

        .shop-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 20px 25px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          margin-bottom: 30px;
          transition: all 0.3s ease;
        }

        .shop-header:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }

        .results-info {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #666;
          font-size: 0.95rem;
        }

        .results-info i {
          color: #E8092E;
          background: rgba(232, 9, 46, 0.1);
          padding: 10px;
          border-radius: 10px;
          font-size: 1.1rem;
        }

        .results-info strong {
          color: #2c3e50;
          font-weight: 600;
        }

        .shop-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .btn-add-car {
          background: #E8092E;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(232, 9, 46, 0.2);
        }

        .btn-add-car:hover {
          background: #c7082a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(232, 9, 46, 0.3);
        }

        .btn-add-car i {
          font-size: 1.1rem;
        }

        .sort-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .sort-select {
          appearance: none;
          width: 180px;
          height: 50px;
          padding: 0;
          border: 1px solid #e0e0e0;
          border-radius: 25px;
          background: #fff;
          color: #666;
          font-size: 19px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-align-last: center;
          -moz-text-align-last: center;
          -webkit-text-align-last: center;
          padding-right: 30px;
          padding-bottom: 4px;
          line-height: 36px;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 15px center;
          background-size: 12px;
        }

        .sort-select option {
          text-align: center;
          padding: 10px;
          font-size: 19px;
        }

        .sort-select:hover {
          border-color: #E8092E;
        }

        .sort-select:focus {
          outline: none;
          border-color: #E8092E;
        }

        /* Supprime la flèche par défaut */
        .sort-select:-moz-focusring {
          color: transparent;
          text-shadow: 0 0 0 #666;
        }

        .sort-select::-ms-expand {
          display: none;
        }

        @media (max-width: 768px) {
          .sidebar-filter {
            position: relative;
            top: 0;
            margin-bottom: 20px;
          }

          .shop-header {
            flex-direction: column;
            gap: 20px;
            padding: 20px;
          }

          .shop-actions {
            width: 100%;
            flex-direction: column;
            gap: 15px;
          }

          .btn-add-car {
            width: 100%;
            justify-content: center;
          }

          .sort-wrapper {
            width: 100%;
          }

          .sort-select {
            width: 100%;
          }
        }

        .availability-strip {
          width: 100%;
          padding: 8px;
          text-align: center;
          color: white;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .availability-strip.available {
          background-color: #28a745;
        }

        .availability-strip.unavailable {
          background-color: #dc3545;
        }
      `}</style>
      <ToastContainer />
    </section>
  );
};

export default ShopArea;
