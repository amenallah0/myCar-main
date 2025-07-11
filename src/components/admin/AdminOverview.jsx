import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { FaUsers, FaCar, FaUserTie, FaMoneyBillWave, FaCalendarAlt, FaClock, FaShoppingCart, FaStar } from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/fr';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../config/apiConfig';

moment.locale('fr');

// Définition du thème
const theme = {
  colors: {
    primary: '#1a237e',
    success: '#2ed573',
    warning: '#ffab00',
    danger: '#ff4757',
    text: {
      primary: '#2c3e50',
      secondary: '#6c757d'
    },
    background: {
      light: '#f8f9fa',
      white: '#ffffff'
    }
  },
  shadows: {
    small: '0 4px 6px rgba(0, 0, 0, 0.05)',
    medium: '0 8px 15px rgba(0, 0, 0, 0.08)',
    large: '0 12px 24px rgba(0, 0, 0, 0.12)'
  },
  transitions: {
    default: 'all 0.2s ease',
    slow: 'all 0.3s ease-in-out'
  }
};

// Styled Components
const OverviewContainer = styled.div`
  padding: 1.5rem;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledCard = styled(motion.div)`
  background: ${theme.colors.background.white};
  border-radius: 15px;
  border: none;
  height: 100%;
  overflow: hidden;
  box-shadow: ${theme.shadows.small};
  transition: ${theme.transitions.default};

  &:hover {
    box-shadow: ${theme.shadows.medium};
    transform: translateY(-5px);
  }
`;

const StyledCardHeader = styled(Card.Header)`
  padding: 1.25rem;
  background: ${theme.colors.background.light};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: ${props => props.background};
  color: ${props => props.color};
`;

const StatInfo = styled.div`
  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: #2c3e50;
  }

  p {
    color: #6c757d;
    margin-bottom: 0.5rem;
  }
`;

const GrowthIndicator = styled.div`
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.isPositive ? '#2ed573' : '#ff4757'};

  i {
    transition: transform 0.2s ease;
  }

  &:hover i {
    transform: translateY(-2px);
  }
`;

const ActivityTimeline = styled.div`
  padding: 1rem 0;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a237e;
`;

const PromotedCarsList = styled.div`
  margin-top: 1rem;
`;

const PromotedCarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
  }

  .car-info {
    flex: 1;
    
    h6 {
      margin: 0;
      color: #2c3e50;
    }
    
    small {
      color: #6c757d;
    }
  }

  .promotion-badge {
    padding: 4px 8px;
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
    border-radius: 12px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

// Sous-composants
const StatCard = ({ icon: Icon, title, value, growth, color, background }) => (
  <StyledCard as={Card}>
    <Card.Body>
      <StatIcon background={background} color={color}>
        <Icon />
      </StatIcon>
      <StatInfo>
        <h3>{value}</h3>
        <p>{title}</p>
        {growth !== undefined && (
          <div style={{ color: growth >= 0 ? 'green' : 'red' }}>
            <i className={`fas fa-arrow-${growth >= 0 ? 'up' : 'down'}`} />
            <span>{Math.abs(growth)}% ce mois</span>
          </div>
        )}
      </StatInfo>
    </Card.Body>
  </StyledCard>
);

const ActivityList = ({ activities }) => (
  <ActivityTimeline>
    {activities?.map((activity, index) => (
      <ActivityItem key={index}>
        <ActivityIcon>
          {activity.type === 'user' && <FaUsers />}
          {activity.type === 'car' && <FaCar />}
          {activity.type === 'sale' && <FaShoppingCart />}
          {activity.type === 'expert' && <FaUserTie />}
        </ActivityIcon>
        <div>
          <p className="mb-1">{activity.message}</p>
          <small className="text-muted">
            <FaClock className="me-1" />
            {moment(activity.date).fromNow()}
          </small>
        </div>
      </ActivityItem>
    ))}
  </ActivityTimeline>
);

const QuickStats = ({ stats }) => (
  <ListGroup variant="flush">
    {[
      { label: 'Voitures Disponibles', value: stats.availableCars || 0 },
      { label: 'Demandes en Attente', value: stats.pendingRequests || 0 },
      { label: 'Experts Actifs', value: stats.activeExperts || 0 },
      { label: 'Ventes du Mois', value: `${(stats.monthlySales || 0).toLocaleString()} TND` }
    ].map((item, index) => (
      <ListGroup.Item key={index}>
        <div className="d-flex justify-content-between align-items-center">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

const PromotedCars = ({ cars }) => (
  <PromotedCarsList>
    {cars?.map((car, index) => (
      <PromotedCarItem key={car.id || index}>
        <img
          src={getImageUrl(car.images[0]?.filename)}
          alt={`${car.make} ${car.model}`}
        />
        <div className="car-info">
          <h6>{car.make} {car.model}</h6>
          <small>{car.year} • {car.mileage} km</small>
        </div>
        <div className="promotion-badge">
          <FaStar />
          Promue
        </div>
      </PromotedCarItem>
    ))}
  </PromotedCarsList>
);

const AdminOverview = ({ stats }) => {
  const statCards = useMemo(() => [
    {
      icon: FaUsers,
      title: 'Utilisateurs',
      value: stats.totalUsers || 0,
      growth: stats.userGrowth || 0,
      color: '#1976d2',
      background: 'rgba(25, 118, 210, 0.1)'
    },
    {
      icon: FaCar,
      title: 'Voitures',
      value: stats.totalCars || 2,
      growth: stats.carGrowth || 0,
      color: '#2ed573',
      background: 'rgba(46, 213, 115, 0.1)'
    },
    {
      icon: FaStar,
      title: 'Voitures Promues',
      value: stats.promotedCars?.length || 0,
      growth: 0,
      color: '#ffc107',
      background: 'rgba(255, 193, 7, 0.1)'
    },
    {
      icon: FaUserTie,
      title: 'Experts',
      value: stats.totalExperts || 0,
      growth: stats.expertGrowth || 0,
      color: '#ffab00',
      background: 'rgba(255, 171, 0, 0.1)'
    },
    {
      icon: FaMoneyBillWave,
      title: 'Ventes',
      value: stats.totalSales || 0,
      growth: stats.salesGrowth || 0,
      color: '#5e35b1',
      background: 'rgba(94, 53, 177, 0.1)'
    }
  ], [stats]);

  return (
    <OverviewContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Row className="g-4">
        {statCards.map((card, index) => (
          <Col key={index} lg={index === 4 ? 12 : 3} md={6}>
            <StyledCard as={Card}>
              <Card.Body>
                <StatCard {...card} />
              </Card.Body>
            </StyledCard>
          </Col>
        ))}

        <Col lg={8}>
          <StyledCard as={Card}>
            <StyledCardHeader>
              <h5 className="mb-0">Activité Récente</h5>
            </StyledCardHeader>
            <Card.Body>
              <ActivityList activities={stats.recentActivities} />
            </Card.Body>
          </StyledCard>
        </Col>

        <Col lg={4}>
          <StyledCard as={Card}>
            <StyledCardHeader>
              <h5 className="mb-0">Statistiques Rapides</h5>
            </StyledCardHeader>
            <Card.Body className="p-0">
              <QuickStats stats={{
                ...stats,
                availableCars: 2,
                pendingRequests: stats.pendingRequests || 0,
                activeExperts: stats.activeExperts || 0,
                monthlySales: stats.monthlySales || 0
              }} />
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </OverviewContainer>
  );
};

// PropTypes
StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  growth: PropTypes.number,
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired
};

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['user', 'car', 'sale', 'expert']).isRequired,
      message: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  )
};

QuickStats.propTypes = {
  stats: PropTypes.shape({
    availableCars: PropTypes.number,
    pendingRequests: PropTypes.number,
    activeExperts: PropTypes.number,
    monthlySales: PropTypes.number
  }).isRequired
};

PromotedCars.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      make: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      mileage: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          filename: PropTypes.string.isRequired
        })
      )
    })
  )
};

AdminOverview.propTypes = {
  stats: PropTypes.shape({
    totalUsers: PropTypes.number,
    userGrowth: PropTypes.number,
    totalCars: PropTypes.number,
    carGrowth: PropTypes.number,
    totalExperts: PropTypes.number,
    expertGrowth: PropTypes.number,
    totalSales: PropTypes.number,
    salesGrowth: PropTypes.number,
    availableCars: PropTypes.number,
    pendingRequests: PropTypes.number,
    activeExperts: PropTypes.number,
    monthlySales: PropTypes.number,
    recentActivities: PropTypes.array,
    promotedCars: PropTypes.array
  }).isRequired
};

export default React.memo(AdminOverview);