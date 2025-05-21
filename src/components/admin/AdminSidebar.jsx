// src/components/admin/AdminSidebar.jsx
import React from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaCar, FaCog, FaBell, FaStar, FaUserTie, FaUserClock, FaArrowLeft } from 'react-icons/fa';

const StyledNav = styled(Nav)`
  .nav-link {
    color: #ecf0f1;
    padding: 12px 15px;
    margin-bottom: 8px;
    border-radius: 12px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: #3498db;
      transform: scaleY(0);
      transition: transform 0.2s;
    }

    &:hover {
      background: rgba(52, 152, 219, 0.1);
      color: #3498db;

      &::before {
        transform: scaleY(1);
      }
    }

    &.active {
      background: #3498db;
      color: white;
      transform: translateX(5px);

      &::before {
        transform: scaleY(1);
      }
    }

    svg {
      font-size: 1.2rem;
      transition: transform 0.2s;
    }

    &:hover svg {
      transform: scale(1.1);
    }
  }

  .home-link {
    text-decoration: none;
    margin-bottom: 20px;
    display: block;
    
    .nav-link {
      background: #2ecc71;
      color: white;
      
      &:hover {
        background: #27ae60;
        transform: translateX(5px);
      }
    }
  }
`;

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', icon: FaHome, label: 'Vue d\'ensemble' },
    { id: 'users', icon: FaUsers, label: 'Utilisateurs' },
    { id: 'cars', icon: FaCar, label: 'Voitures' },
    { id: 'promoted-cars', icon: FaStar, label: 'Voitures promues' },
    { id: 'annonces', icon: FaBell, label: 'Annonces' },
    { id: 'experts', icon: FaUserTie, label: 'Experts' },
    { id: 'expert-requests', icon: FaUserClock, label: 'Demandes d\'expert' },
    { id: 'notifications', icon: FaBell, label: 'Notifications' },
    { id: 'settings', icon: FaCog, label: 'Paramètres' },
  ];

  return (
    <StyledNav className="flex-column">
      <Link to="/" className="home-link">
        <Nav.Link as="div">
          <FaArrowLeft />
          Retour à l'accueil
        </Nav.Link>
      </Link>
      
      {menuItems.map(item => (
        <Nav.Link
          key={item.id}
          className={activeTab === item.id ? 'active' : ''}
          onClick={() => setActiveTab(item.id)}
        >
          <item.icon />
          {item.label}
        </Nav.Link>
      ))}
    </StyledNav>
  );
};

export default React.memo(AdminSidebar);