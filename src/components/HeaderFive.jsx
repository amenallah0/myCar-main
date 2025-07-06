import React, { useEffect, useState, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { useNotification } from '../contexts/NotificationContext';
import NotificationDropdown from './NotificationDropdown';

const HeaderFive = () => {
  const [active, setActive] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const { notifications } = useNotification();
  const notificationCount = notifications.length;

  const handleScroll = useCallback(() => {
    setScroll(window.pageYOffset > 150);
  }, []);

  const mobileMenu = useCallback(() => {
    setActive(prev => !prev);
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setWishlistCount(storedFavorites.length);

    // Event listener for wishlist updates
    const handleWishlistUpdate = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
      setWishlistCount(updatedFavorites.length);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [handleScroll]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const Logo = () => (
    <Link to="/">
      <img 
        src="/assets/img/logo.png" 
        alt="MyCar" 
        width="150" 
        height="45" 
        style={{ borderRadius: '8px' }} 
      />
    </Link>
  );

  const UserMenu = () => {
    const userMenuStyle = {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 15px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      backgroundColor: 'transparent',
      color: '#333',
      textDecoration: 'none',
      border: '1px solid transparent',
    };

    const logoutButtonStyle = {
      padding: '8px 15px',
      borderRadius: '8px',
      border: '1px solid #ef4444',
      backgroundColor: 'transparent',
      color: '#ef4444',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginLeft: '10px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: '500',
    };

    const wishlistButtonStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      borderRadius: '12px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e5e7eb',
      textDecoration: 'none',
      position: 'relative',
      transition: 'all 0.3s ease',
      width: '44px',
      height: '44px',
    };

    const countStyle = {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '2px 6px',
      borderRadius: '50%',
      fontSize: '10px',
      position: 'absolute',
      top: '-2px',
      right: '-2px',
      fontWeight: '600',
      minWidth: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      animation: wishlistCount > 0 ? 'pulse 2s infinite' : 'none',
    };

    const menuItemStyle = {
      position: 'relative',
      marginRight: '15px',
    };

    return (
      <div className="header-right-element">
        <ul style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none', gap: '15px' }}>
          {(!user || user.role !== 'ROLE_ADMIN' && user.role !== 'ADMIN') && (
            <>
              <li style={menuItemStyle}>
                <Link 
                  to="/wishlist" 
                  style={wishlistButtonStyle}
                  className="wishlist-button hover-effect"
                  title={`${wishlistCount} véhicule${wishlistCount > 1 ? 's' : ''} en favoris`}
                >
                  <i 
                    className="far fa-heart" 
                    style={{ 
                      color: wishlistCount > 0 ? '#ef4444' : '#6b7280', 
                      fontSize: '18px',
                      transition: 'all 0.3s ease'
                    }}
                  ></i>
                  {wishlistCount > 0 && <span style={countStyle}>{wishlistCount > 99 ? '99+' : wishlistCount}</span>}
                </Link>
              </li>
              <li style={menuItemStyle}>
                <NotificationDropdown />
              </li>
            </>
          )}
          <li style={{ position: 'relative' }}>
            {isAuthenticated && user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link 
                  to={`/profile/${user.username}`} 
                  style={{
                    ...userMenuStyle,
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e5e7eb',
                  }}
                  className="user-account hover-effect"
                >
                  <i className="far fa-user" style={{ marginRight: '8px', color: '#ef4444' }}></i>
                  <span style={{ fontWeight: '500' }}>{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  style={logoutButtonStyle}
                  className="logout-button hover-effect"
                >
                  <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i>
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/SignIn"
                style={{
                  ...userMenuStyle,
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e5e7eb',
                }}
                className="hover-effect"
              >
                <i className="far fa-user" style={{ marginRight: '8px', color: '#ef4444' }}></i>
                <span>Account</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    );
  };

  const MainMenu = () => {
    if (user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN') {
      return (
        <nav className="main-menu d-none d-lg-inline-block">
          <ul>
            <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
            <li><NavLink to="/admin" className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink></li>
            <li><NavLink to="/shop" className={({isActive}) => isActive ? "active" : ""}>Shop Page</NavLink></li>
            <li><NavLink to="/AddCar" className={({isActive}) => isActive ? "active" : ""}>Add Car</NavLink></li>
            <li><NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
          </ul>
        </nav>
      );
    }

    return (
      <nav className="main-menu d-none d-lg-inline-block">
        <ul>
          <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
          <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About Us</NavLink></li>
          <li><NavLink to="/service" className={({isActive}) => isActive ? "active" : ""}>Service</NavLink></li>
          <li><NavLink to="/AddCar" className={({isActive}) => isActive ? "active" : ""}>Add Car</NavLink></li>
          <li><NavLink to="/shop" className={({isActive}) => isActive ? "active" : ""}>Shop Page</NavLink></li>
          <li><NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
        </ul>
      </nav>
    );
  };

  return (
    <header className="nav-header header-layout4">
      <div className={`sticky-wrapper ${scroll ? "sticky" : ""}`}>
        <div className="header-top">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <div className="header-logo">
                  <Logo />
                </div>
              </div>
              <div className="col-auto d-none d-md-block">
                <MainMenu />
              </div>
              <div className="col-auto">
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mobile-menu-wrapper ${active ? 'active' : ''}`}>
        <div className="mobile-menu">
          <Logo />
          <nav className="main-menu">
            <ul>
              <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
              <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About Us</NavLink></li>
              <li><NavLink to="/service" className={({isActive}) => isActive ? "active" : ""}>Service</NavLink></li>
              <li><NavLink to="/AddCar" className={({isActive}) => isActive ? "active" : ""}>Add Car</NavLink></li>
              <li><NavLink to="/shop" className={({isActive}) => isActive ? "active" : ""}>Shop Page</NavLink></li>
              <li><NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>

      <style jsx>{`
        .nav-header {
          background: white;
        }

        .header-top {
          padding: 15px 0;
          background: white;
        }

        .main-menu ul {
          display: flex;
          gap: 25px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .main-menu a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: relative;
        }

        .main-menu a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #ef4444;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .main-menu a:hover::after,
        .main-menu a.active::after {
          width: 80%;
        }

        .main-menu a:hover,
        .main-menu a.active {
          color: #ef4444;
          background-color: transparent;
        }

        .sticky {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          z-index: 1000;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .mobile-menu-wrapper {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 1000;
          padding: 20px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .mobile-menu-wrapper.active {
          transform: translateX(0);
          display: block;
        }

        .mobile-menu ul {
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }

        .mobile-menu a {
          display: block;
          padding: 12px;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .main-menu {
            display: none;
          }

          .mobile-menu-wrapper {
            display: block;
          }

          .header-right-element {
            margin-top: 0;
          }
        }

        .hover-effect {
          transition: all 0.3s ease;
        }

        .hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-color: #ef4444 !important;
        }

        .logout-button:hover {
          background-color: #ef4444 !important;
          color: white !important;
        }

        .admin-button:hover {
          background-color: #dc2626 !important;
        }

        .wishlist-button:hover {
          background-color: rgba(239, 68, 68, 0.05) !important;
          border-color: #ef4444 !important;
          transform: translateY(-2px);
        }

        .wishlist-button:hover i {
          color: #ef4444 !important;
          transform: scale(1.1);
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </header>
  );
};

export default HeaderFive;
