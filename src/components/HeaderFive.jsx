import React, { useEffect, useState, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

const HeaderFive = () => {
  const [active, setActive] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Optimisation du gestionnaire de défilement
  const handleScroll = useCallback(() => {
    setScroll(window.pageYOffset > 150);
  }, []);

  // Gestionnaire de menu mobile optimisé
  const mobileMenu = useCallback(() => {
    setActive(prev => !prev);
  }, []);

  // Initialisation des écouteurs d'événements
  useEffect(() => {
    // Gestion des favoris
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setWishlistCount(storedFavorites.length);

    // Gestion du défilement
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Composant du logo
  const Logo = () => (
    <Link to="/">
      <img 
        src="/assets/img/logo.png" 
        alt="MyCar" 
        width="180" 
        height="50" 
        style={{ borderRadius: '10px' }} 
      />
    </Link>
  );

  // Composant du menu utilisateur optimisé
  const UserMenu = () => {
    const { user } = useUser();
    
    const userMenuStyle = {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 15px',
      borderRadius: '5px',
      transition: 'all 0.3s ease',
      backgroundColor: user ? '#f8f9fa' : 'transparent',
      color: '#333',
      textDecoration: 'none',
    };

    const adminButtonStyle = {
      ...userMenuStyle,
      backgroundColor: '#E8092E',
      color: 'white',
      marginRight: '10px',
    };

    const userIconStyle = {
      marginRight: '8px',
      fontSize: '16px',
      color: user ? '#E8092E' : '#333',
    };

    const logoutButtonStyle = {
      padding: '8px 15px',
      borderRadius: '5px',
      border: '1px solid #E8092E',
      backgroundColor: 'transparent',
      color: '#E8092E',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginLeft: '10px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    };

    const countStyle = {
      backgroundColor: '#E8092E',
      color: 'white',
      padding: '2px 6px',
      borderRadius: '50%',
      fontSize: '12px',
      position: 'absolute',
      top: '-8px',
      right: '-8px',
    };

    const menuItemStyle = {
      position: 'relative',
      marginRight: '20px',
    };

    return (
      <div className="header-right-element">
        <ul style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none' }}>
          <li style={{ position: 'relative', marginRight: '20px' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {user.role === 'ADMIN' && (
                  <Link 
                    to="/admin" 
                    style={adminButtonStyle}
                    className="admin-button hover-effect"
                  >
                    <i className="fas fa-user-shield" style={{ marginRight: '5px' }}></i>
                    DASHBOARD
                  </Link>
                )}
                <Link 
                  to={`/profile/${user.username}`} 
                  style={userMenuStyle}
                  className="user-account hover-effect"
                >
                  <i className="far fa-user" style={{ marginRight: '8px' }}></i>
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
                style={userMenuStyle}
                className="hover-effect"
              >
                <i className="far fa-user" style={{ marginRight: '8px' }}></i>
                <span>Account</span>
              </Link>
            )}
          </li>
          {/* N'afficher les icônes favoris et panier que si l'utilisateur n'est pas admin */}
          {(!user || user.role !== 'ADMIN') && (
            <>
              <li style={menuItemStyle}>
                <Link to="/wishlist" style={userMenuStyle} className="hover-effect">
                  <i className="far fa-heart" style={userIconStyle}></i>
                  {wishlistCount > 0 && <span style={countStyle}>{wishlistCount}</span>}
                </Link>
              </li>
              <li style={menuItemStyle}>
                <Link to="/cart" style={userMenuStyle} className="hover-effect">
                  <i className="fas fa-shopping-cart" style={userIconStyle}></i>
                  <span style={countStyle}>0</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    );
  };

  // Composant de la barre de recherche
  const SearchBar = () => (
    <div className="header-search-wrap">
      <form className="search-form">
        <input
          className="form-control"
          type="text"
          placeholder="Find your product"
        />
        <button className="icon-btn" type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    </div>
  );

  // Menu principal
  const MainMenu = () => {
    const { user } = useUser();

    return (
      <nav className="main-menu d-none d-lg-inline-block">
        <ul>
          <li><NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
          <li><NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About Us</NavLink></li>
          <li><NavLink to="/service" className={({isActive}) => isActive ? "active" : ""}>Service</NavLink></li>
          <li><NavLink to="/shop" className={({isActive}) => isActive ? "active" : ""}>Shop Page</NavLink></li>
          <li><NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
        </ul>
      </nav>
    );
  };

  return (
    <header className="nav-header header-layout4">
      <div className="header-top">
        <div className="container">
          <div className="row justify-content-center justify-content-md-between align-items-center gy-2">
            <div className="col-auto d-none d-lg-block">
              <div className="header-logo">
                <Logo />
              </div>
            </div>
            <div className="col-auto d-none d-md-block">
              <SearchBar />
            </div>
            <div className="col-auto d-none d-xl-block">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      <div className={`sticky-wrapper ${scroll ? "sticky" : ""}`}>
        <div className="menu-area">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <MainMenu />
              </div>
              <div className="col-auto d-lg-none">
                <button className="menu-toggle" onClick={mobileMenu}>
                  <i className={`fa fa-${active ? 'times' : 'bars'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`mobile-menu-wrapper ${active ? 'active' : ''}`}>
        <div className="mobile-menu">
          <Logo />
          <MainMenu />
        </div>
      </div>
    </header>
  );
};

// Ajoutez ce CSS dans votre fichier de styles
const styles = `
  .hover-effect {
    transition: all 0.3s ease;
  }

  .hover-effect:hover {
    background-color: #e9ecef !important;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .user-account {
    border: 1px solid #dee2e6;
  }

  .user-account:hover {
    border-color: #E8092E;
  }

  .logout-button:hover {
    background-color: #E8092E !important;
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .logout-button:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .header-right-element {
      margin-top: 10px;
    }
    
    .header-right-element ul {
      justify-content: center;
    }

    .logout-button {
      margin-top: 10px;
      width: 100%;
      justify-content: center;
    }
  }

  .admin-link {
    color: #E8092E !important;
    font-weight: 600;
  }

  .admin-link:hover {
    background-color: #E8092E !important;
    color: white !important;
    border-radius: 5px;
    padding: 5px 10px;
  }

  .admin-link.active {
    background-color: #E8092E !important;
    color: white !important;
    border-radius: 5px;
    padding: 5px 10px;
  }

  .admin-button {
    background-color: #E8092E !important;
    color: white !important;
  }

  .admin-button:hover {
    background-color: #c7082a !important;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
`;

// Injectez les styles dans le document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default HeaderFive;
