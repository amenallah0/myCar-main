import React, { useMemo } from 'react';
import { FaUsers, FaCar, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import styled from 'styled-components';

const OverviewContainer = styled.div`
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 12px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h2`
  color: #1a237e;
  margin-bottom: 24px;
  font-weight: 600;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor};
  color: white;
`;

const StatValue = styled.h3`
  color: #2c3e50;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

const StatLabel = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 8px 0 0 0;
`;

const GrowthIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
  background: ${props => props.growth >= 0 ? '#e3fcef' : '#fee2e2'};
  color: ${props => props.growth >= 0 ? '#059669' : '#dc2626'};

  &::before {
    content: '${props => props.growth >= 0 ? '↑' : '↓'}';
    margin-right: 4px;
  }
`;

const AdminOverview = ({ stats = {} }) => {
  const {
    totalUsers = 0,
    userGrowth = 0,
    totalCars = 0,
    carGrowth = 0,
    totalSales = 0,
    salesGrowth = 0,
    activeListings = 0,
    listingGrowth = 0
  } = stats;

  const statCards = useMemo(() => [
    {
      icon: FaUsers,
      title: 'Total Users',
      value: totalUsers,
      growth: userGrowth,
      bgColor: '#4C51BF'
    },
    {
      icon: FaCar,
      title: 'Total Cars',
      value: totalCars,
      growth: carGrowth,
      bgColor: '#2B6CB0'
    },
    {
      icon: FaMoneyBillWave,
      title: 'Total Sales',
      value: `$${totalSales.toLocaleString()}`,
      growth: salesGrowth,
      bgColor: '#2F855A'
    },
    {
      icon: FaChartLine,
      title: 'Active Listings',
      value: activeListings,
      growth: listingGrowth,
      bgColor: '#C05621'
    }
  ], [totalUsers, userGrowth, totalCars, carGrowth, totalSales, salesGrowth, activeListings, listingGrowth]);

  return (
    <OverviewContainer>
      <Title>Dashboard Overview</Title>
      <StatsGrid>
        {statCards.map((card, index) => (
          <StatCard key={index}>
            <StatHeader>
              <IconWrapper bgColor={card.bgColor}>
                <card.icon size={20} />
              </IconWrapper>
              <StatLabel>{card.title}</StatLabel>
            </StatHeader>
            <StatValue>{card.value}</StatValue>
            <GrowthIndicator growth={card.growth}>
              {Math.abs(card.growth)}% this month
            </GrowthIndicator>
          </StatCard>
        ))}
      </StatsGrid>
    </OverviewContainer>
  );
};

export default React.memo(AdminOverview);