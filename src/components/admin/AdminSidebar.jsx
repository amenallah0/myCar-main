// src/components/admin/AdminSidebar.jsx
import React from 'react';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUsers, FaCar, FaChartBar, FaCog } from 'react-icons/fa';

const StyledNav = styled(Nav)`
  .nav-link {
    color: #ecf0f1;
    padding: 12px 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      background: #34495e;
      color: #fff;
    }

    &.active {
      background: #3498db;
      color: #fff;
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <StyledNav className="flex-column">
      <Nav.Link 
        className={activeTab === 'overview' ? 'active' : ''} 
        onClick={() => setActiveTab('overview')}
      >
        <FaHome /> Overview
      </Nav.Link>
      <Nav.Link 
        className={activeTab === 'users' ? 'active' : ''} 
        onClick={() => setActiveTab('users')}
      >
        <FaUsers /> Users
      </Nav.Link>
      <Nav.Link 
        className={activeTab === 'cars' ? 'active' : ''} 
        onClick={() => setActiveTab('cars')}
      >
        <FaCar /> Cars
      </Nav.Link>
      <Nav.Link 
        className={activeTab === 'sales' ? 'active' : ''} 
        onClick={() => setActiveTab('sales')}
      >
        <FaChartBar /> Sales
      </Nav.Link>
      <Nav.Link 
        className={activeTab === 'settings' ? 'active' : ''} 
        onClick={() => setActiveTab('settings')}
      >
        <FaCog /> Settings
      </Nav.Link>
      <Nav.Link 
        className={activeTab === 'annonces' ? 'active' : ''} 
        onClick={() => setActiveTab('annonces')}
      >
        <i className="fas fa-bullhorn me-2"></i>
        Annonces
      </Nav.Link>
      <Nav.Link 
        active={activeTab === 'experts'}
        onClick={() => setActiveTab('experts')}
      >
        <i className="fas fa-user-tie me-2"></i>
        Experts
      </Nav.Link>
      <Nav.Link 
        active={activeTab === 'expert-requests'}
        onClick={() => setActiveTab('expert-requests')}
      >
        <i className="fas fa-user-clock me-2"></i>
        Demandes d'Expert
      </Nav.Link>
    </StyledNav>
  );
};

export default AdminSidebar;