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
import { getAllCars } from '../services/apiCarServices';
import apiCarServices from '../services/apiCarServices';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRangeChange = (value) => {
    setRange(value);
  };

  const fetchCars = useCallback(async (query = "", category = "") => {
    try {
      setLoading(true);
      const data = await apiCarServices.getAllCars();
      const filtered = data.filter(car => 
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
      setError(error.message || 'Erreur lors du chargement des voitures');
    } finally {
      setLoading(false);
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

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!cars.length) return <div>Aucune voiture disponible</div>;

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
                      backgroundColor: '#ef4444',
                      height: '4px'
                    }]}
                    handleStyle={[
                      { 
                        backgroundColor: 'white',
                        borderColor: '#ef4444',
                        borderWidth: '2px',
                        width: '20px',
                        height: '20px',
                        marginTop: '-8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      },
                      {
                        backgroundColor: 'white',
                        borderColor: '#ef4444',
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
            <div className="row cars-grid">
              {displayedCars.map((car) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={car.id}>
                  <div className="car-card">
                    <div className="car-image-container">
                      <div className="car-image">
                        <CarImageCarousel images={car.images} />
                        <div className="image-overlay"></div>
                      </div>
                      
                      <div className="price-badge">
                        <span>{car.price.toLocaleString()} TND</span>
                      </div>

                      <button 
                        onClick={() => saveCarToFavorites(car)} 
                        className={`favorite-btn ${isCarFavorite(car.id) ? 'active' : ''}`}
                        aria-label="Ajouter aux favoris"
                      >
                        <i className="fas fa-heart"></i>
                      </button>

                      <div className={`status-badge ${car.available ? 'available' : 'unavailable'}`}>
                        <i className={`fas ${car.available ? 'fa-check' : 'fa-times'}`}></i>
                        <span>{car.available ? 'Disponible' : 'Indisponible'}</span>
                      </div>
                    </div>

                    <div className="car-info">
                      <div className="car-header">
                        <h3 className="car-title">{car.make} {car.model}</h3>
                        <span className="car-year">{car.year}</span>
                      </div>
                      
                      <div className="car-specs">
                        <div className="spec-item">
                          <i className="fas fa-road"></i>
                          <span>{car.mileage?.toLocaleString()} km</span>
                        </div>
                        <div className="spec-item">
                          <i className="fas fa-horse"></i>
                          <span>{car.powerRating} HP</span>
                        </div>
                      </div>

                      <div className="car-actions">
                        <Link to={`/shop-details/${car.id}`} className="view-details-btn">
                          <span>Voir détails</span>
                          <i className="fas fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-enhanced">
              <div className="pagination-header">
                <div className="pagination-summary">
                  <div className="summary-icon">
                    <i className="fas fa-list-ol"></i>
              </div>
                  <div className="summary-content">
                    <span className="summary-title">
                      Page <strong>{currentPage}</strong> sur <strong>{totalPages}</strong>
                    </span>
                    <span className="summary-subtitle">
                      {filteredCars.length} véhicule{filteredCars.length > 1 ? 's' : ''} • Affichage {startIdx + 1}-{endIdx}
                    </span>
                  </div>
                </div>
                
                <div className="pagination-stats">
                  <div className="stat-item">
                    <i className="fas fa-eye"></i>
                    <span>{filteredCars.filter(car => car.available).length}</span>
                    <label>Disponibles</label>
                  </div>
                  <div className="stat-item">
                    <i className="fas fa-car"></i>
                    <span>{totalPages}</span>
                    <label>Pages</label>
                  </div>
                </div>
              </div>

              <div className="pagination-controls">
                <nav aria-label="Navigation des pages" className="pagination-nav">
                  <ul className="pagination-list-enhanced">
                    {/* First and Previous */}
                    <li className="pagination-item">
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className={`pagination-btn-enhanced first-btn ${currentPage === 1 ? 'disabled' : ''}`}
                        aria-label="Première page"
                        title="Première page"
                      >
                        <i className="fas fa-angle-double-left"></i>
                      </button>
                    </li>
                    
                    <li className="pagination-item">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`pagination-btn-enhanced prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
                        aria-label="Page précédente"
                        title="Page précédente"
                      >
                        <i className="fas fa-chevron-left"></i>
                        <span className="btn-text">Précédent</span>
                      </button>
                    </li>

                    {/* Page Numbers */}
                    {(() => {
                      const getPageNumbers = () => {
                        const delta = 1;
                        const range = [];
                        const rangeWithDots = [];

                        for (let i = Math.max(2, currentPage - delta); 
                             i <= Math.min(totalPages - 1, currentPage + delta); 
                             i++) {
                          range.push(i);
                        }

                        if (currentPage - delta > 2) {
                          rangeWithDots.push(1, '...');
                        } else {
                          rangeWithDots.push(1);
                        }

                        rangeWithDots.push(...range);

                        if (currentPage + delta < totalPages - 1) {
                          rangeWithDots.push('...', totalPages);
                        } else if (totalPages > 1) {
                          rangeWithDots.push(totalPages);
                        }

                        return rangeWithDots;
                      };

                      return getPageNumbers().map((pageNumber, index) => {
                        if (pageNumber === '...') {
                          return (
                            <li key={`dots-${index}`} className="pagination-item dots">
                              <span className="pagination-dots-enhanced">
                                <i className="fas fa-ellipsis-h"></i>
                              </span>
                            </li>
                          );
                        }

                        return (
                          <li key={pageNumber} className="pagination-item">
                            <button
                              onClick={() => handlePageChange(pageNumber)}
                              className={`pagination-btn-enhanced number-btn ${pageNumber === currentPage ? 'active' : ''}`}
                              aria-label={`Page ${pageNumber}`}
                              aria-current={pageNumber === currentPage ? 'page' : undefined}
                            >
                              <span className="page-number">{pageNumber}</span>
                              {pageNumber === currentPage && (
                                <div className="active-indicator">
                                  <i className="fas fa-circle"></i>
                                </div>
                              )}
                            </button>
                          </li>
                        );
                      });
                    })()}

                    {/* Next and Last */}
                    <li className="pagination-item">
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`pagination-btn-enhanced next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                        aria-label="Page suivante"
                        title="Page suivante"
                      >
                        <span className="btn-text">Suivant</span>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </li>
                    
                    <li className="pagination-item">
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`pagination-btn-enhanced last-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                        aria-label="Dernière page"
                        title="Dernière page"
                      >
                        <i className="fas fa-angle-double-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>

                {/* Quick Jump */}
                {totalPages > 5 && (
                  <div className="quick-jump-enhanced">
                    <div className="jump-input-wrapper">
                      <label htmlFor="pageJump" className="jump-label">
                        <i className="fas fa-search"></i>
                        Aller à :
                      </label>
                      <input
                        id="pageJump"
                        type="number"
                        min="1"
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => {
                          const page = parseInt(e.target.value);
                          if (page >= 1 && page <= totalPages) {
                            handlePageChange(page);
                          }
                        }}
                        className="page-jump-input"
                        placeholder="Page"
                      />
                      <span className="jump-total">/ {totalPages}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cars-grid {
          margin: 0 -10px;
        }

        .cars-grid [class*="col-"] {
          padding: 0 10px;
        }

        .car-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid #f1f5f9;
        }

        .car-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          border-color: #e2e8f0;
        }

        .car-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .car-image {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .car-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .car-card:hover .car-image img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.2) 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .car-card:hover .image-overlay {
          opacity: 1;
        }

        .price-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
          z-index: 2;
        }

        .favorite-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
          backdrop-filter: blur(10px);
        }

        .favorite-btn i {
          color: #64748b;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .favorite-btn.active i {
          color: #ef4444;
          transform: scale(1.2);
        }

        .favorite-btn:hover {
          background: white;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .status-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
          z-index: 2;
        }

        .status-badge.available {
          background: rgba(34, 197, 94, 0.9);
          color: white;
        }

        .status-badge.unavailable {
          background: rgba(239, 68, 68, 0.9);
          color: white;
        }

        .car-info {
          padding: 16px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .car-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .car-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          line-height: 1.3;
          flex: 1;
        }

        .car-year {
          background: #ef4444;
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .car-specs {
          display: flex;
          gap: 16px;
          margin: 8px 0;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 0.85rem;
        }

        .spec-item i {
          width: 16px;
          text-align: center;
          color: #ef4444;
        }

        .car-actions {
          margin-top: auto;
        }

        .view-details-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px 16px;
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          border-radius: 12px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
        }

        .view-details-btn:hover {
          background: linear-gradient(135deg, #dc2626, #7f1d1d);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          color: white;
        }

        .view-details-btn i {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .view-details-btn:hover i {
          transform: translateX(3px);
        }

        /* Sidebar Styles */
        .sidebar-filter {
          background: white;
          border-radius: 16px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 20px;
          border: 1px solid #f1f5f9;
        }

        .filter-section {
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
        }

        .filter-section:last-child {
          border-bottom: none;
        }

        .filter-title {
          font-size: 1.1rem;
          color: #1e293b;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }

        .filter-title i {
          color: #ef4444;
          width: 20px;
          text-align: center;
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-input-wrapper input {
          width: 100%;
          padding: 10px 40px 10px 12px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .search-input-wrapper input:focus {
          border-color: #ef4444;
          outline: none;
          background: white;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .search-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #64748b;
          padding: 8px;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .search-btn:hover {
          color: #ef4444;
        }

        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #fafafa;
          border: 1px solid transparent;
        }

        .category-content {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-size: 0.9rem;
        }

        .category-item:hover {
          background: #f1f5f9;
          border-color: #e2e8f0;
        }

        .category-item.active {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          border-color: #ef4444;
        }

        .category-item.active .category-content {
          color: white;
        }

        .badge {
          background: rgba(100, 116, 139, 0.1);
          color: #64748b;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          min-width: 20px;
          text-align: center;
        }

        .category-item.active .badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .price-range-display {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 20px;
        }

        .price-box {
          background: #fafafa;
          padding: 10px;
          border-radius: 10px;
          text-align: center;
          border: 1px solid #f1f5f9;
        }

        .price-label {
          display: block;
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 4px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .price-value {
          font-weight: 600;
          color: #1e293b;
          font-size: 0.9rem;
        }

        /* Shop Header */
        .shop-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 16px 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          margin-bottom: 24px;
          border: 1px solid #f1f5f9;
        }

        .results-info {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #64748b;
          font-size: 0.9rem;
        }

        .results-info i {
          color: #ef4444;
          font-size: 1rem;
        }

        .results-info strong {
          color: #1e293b;
        }

        .shop-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-add-car {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          color: white;
          padding: 8px 16px;
          border-radius: 10px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-add-car:hover {
          background: linear-gradient(135deg, #dc2626, #7f1d1d);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          color: white;
        }

        .sort-select {
          appearance: none;
          width: 200px;
          height: 50px;
          padding: 12px 40px 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          color: #64748b;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-align-last: center;
          -moz-text-align-last: center;
          -webkit-text-align-last: center;
          line-height: 26px;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ef4444' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 15px center;
          background-size: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .sort-select:hover {
          border-color: #ef4444;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
          transform: translateY(-1px);
        }

        .sort-select:focus {
          outline: none;
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .sort-select option {
          text-align: center;
          padding: 12px;
          font-size: 1rem;
          font-weight: 500;
          background: white;
          color: #374151;
        }

        .sort-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Responsive pour mobile */
        @media (max-width: 768px) {
          .sort-select {
            width: 100%;
            height: 48px;
            font-size: 0.95rem;
            padding: 10px 35px 10px 14px;
          }
        }

        @media (max-width: 480px) {
          .sort-select {
            height: 44px;
            font-size: 0.9rem;
            padding: 8px 32px 8px 12px;
            background-size: 14px;
            background-position: right 12px center;
          }
        }

        /* Pagination Enhanced Styles */
        .pagination-enhanced {
          background: white;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          margin-top: 40px;
          border: 1px solid #f1f5f9;
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out;
        }

        .pagination-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 30px;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-bottom: 1px solid #e2e8f0;
        }

        .pagination-summary {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .summary-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #ef4444, #991b1b);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        .summary-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .summary-title {
          font-size: 1.1rem;
          color: #1e293b;
          font-weight: 600;
        }

        .summary-title strong {
          color: #ef4444;
          font-weight: 700;
        }

        .summary-subtitle {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
        }

        .pagination-stats {
          display: flex;
          gap: 20px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 12px;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .stat-item i {
          color: #ef4444;
          font-size: 1.1rem;
        }

        .stat-item span {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ef4444;
        }

        .stat-item label {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .pagination-controls {
          padding: 24px 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }

        .pagination-nav {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .pagination-list-enhanced {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        .pagination-item {
          margin: 0;
        }

        .pagination-btn-enhanced {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          height: 44px;
          padding: 0 12px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          color: #64748b;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          gap: 6px;
        }

        .pagination-btn-enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .pagination-btn-enhanced:hover::before {
          left: 100%;
        }

        .pagination-btn-enhanced:hover:not(.disabled) {
          border-color: #ef4444;
          color: #ef4444;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.2);
        }

        .pagination-btn-enhanced.active {
          background: linear-gradient(135deg, #ef4444, #991b1b);
          border-color: #ef4444;
          color: white;
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
          transform: translateY(-2px);
          position: relative;
        }

        .pagination-btn-enhanced.active:hover {
          background: linear-gradient(135deg, #dc2626, #7f1d1d);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
        }

        .pagination-btn-enhanced.disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        .pagination-btn-enhanced.disabled:hover {
          border-color: #e2e8f0;
          color: #64748b;
          transform: none;
          box-shadow: none;
        }

        .first-btn,
        .last-btn {
          min-width: 44px;
          width: 44px;
        }

        .prev-btn,
        .next-btn {
          padding: 0 16px;
          min-width: 120px;
        }

        .number-btn {
          min-width: 44px;
          width: 44px;
          position: relative;
        }

        .page-number {
          z-index: 2;
          position: relative;
        }

        .active-indicator {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.4rem;
        }

        .btn-text {
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .pagination-dots-enhanced {
          color: #a0aec0;
          font-size: 1.2rem;
          padding: 0 8px;
          display: flex;
          align-items: center;
          height: 44px;
        }

        .quick-jump-enhanced {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          gap: 12px;
        }

        .jump-input-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .jump-label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
          margin: 0;
        }

        .jump-label i {
          color: #ef4444;
          font-size: 0.8rem;
        }

        .page-jump-input {
          width: 60px;
          padding: 8px 10px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
          transition: all 0.3s ease;
          background: white;
        }

        .page-jump-input:focus {
          outline: none;
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .jump-total {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .pagination-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .pagination-stats {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .pagination-enhanced {
            margin: 30px 0;
          }

          .pagination-header {
            padding: 20px;
          }

          .pagination-controls {
            padding: 20px;
          }

          .pagination-list-enhanced {
            gap: 4px;
          }

          .pagination-btn-enhanced {
            min-width: 40px;
            height: 40px;
            font-size: 0.9rem;
          }

          .number-btn {
            width: 40px;
          }

          .prev-btn,
          .next-btn {
            min-width: 100px;
            padding: 0 12px;
          }

          .btn-text {
            display: none;
          }

          .prev-btn,
          .next-btn {
            min-width: 40px;
            width: 40px;
            padding: 0;
          }

          .quick-jump-enhanced {
            flex-direction: column;
            gap: 8px;
            padding: 12px 16px;
          }

          .summary-icon {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .stat-item {
            padding: 8px 12px;
          }
        }

        @media (max-width: 480px) {
          .pagination-header {
            padding: 16px;
          }

          .pagination-controls {
            padding: 16px;
          }

          .pagination-btn-enhanced {
            min-width: 36px;
            height: 36px;
            font-size: 0.85rem;
          }

          .number-btn {
            width: 36px;
          }

          .pagination-stats {
            gap: 12px;
          }

          .stat-item span {
            font-size: 1rem;
          }
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* États de focus pour l'accessibilité */
        .pagination-btn-enhanced:focus {
          outline: 2px solid #ef4444;
          outline-offset: 2px;
        }

        /* Mode sombre */
        @media (prefers-color-scheme: dark) {
          .pagination-enhanced {
            background: #2d3748;
            border-color: #4a5568;
          }

          .pagination-header {
            background: linear-gradient(135deg, #374151, #4a5568);
            border-color: #4a5568;
          }

          .pagination-btn-enhanced {
            background: #4a5568;
            border-color: #718096;
            color: #f7fafc;
          }

          .quick-jump-enhanced {
            background: linear-gradient(135deg, #374151, #4a5568);
            border-color: #4a5568;
          }

          .page-jump-input {
            background: #2d3748;
            border-color: #718096;
            color: #f7fafc;
          }
        }

        /* Préférences de mouvement réduit */
        @media (prefers-reduced-motion: reduce) {
          .pagination-btn-enhanced,
          .pagination-enhanced {
            transition: none;
            animation: none;
          }
          
          .pagination-btn-enhanced:hover {
            transform: none;
          }
        }
      `}</style>
      <ToastContainer />
    </section>
  );
};

export default ShopArea;

