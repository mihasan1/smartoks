// src/components/Dashboard.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #e0e7ff;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #4f46e5;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
  background-color: ${props => props.active ? '#4338ca' : 'transparent'};
  border-radius: 5px;
  &:hover {
    background-color: #4338ca;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f4f7ff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #333;
`;

const LogoutButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #ff4b4b;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const StatBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #4f46e5;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #333;
  text-align: center;
`;

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Sidebar>
        <h3>НАВІГАЦІЯ</h3>
        <SidebarItem active onClick={() => navigate('/dashboard')}>Інформаційна панель</SidebarItem>
        <SidebarItem onClick={() => navigate('/tickets')}>Заявки</SidebarItem>
        <SidebarItem onClick={() => navigate('/knowledge')}>База знань</SidebarItem>
      </Sidebar>
      <MainContent>
        <Header>
          <Title>ІНФОРМАЦІЙНА ПАНЕЛЬ</Title>
          <LogoutButton onClick={onLogout}>Вийти</LogoutButton>
        </Header>
        <StatGrid>
          <StatBox>
            <StatNumber>2</StatNumber>
            <StatLabel>Кількість заявок зі статусом "Новий"</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>3</StatNumber>
            <StatLabel>Кількість заявок зі статусом "Виконано"</StatLabel>
          </StatBox>
          <StatBox>
            <StatLabel>Середній час виконання заявки:</StatLabel>
            <StatNumber>2 години 35 хвилин</StatNumber>
          </StatBox>
          <StatBox>
            <StatLabel>За минулий місяць оброблено заявок:</StatLabel>
            <StatNumber>24</StatNumber>
          </StatBox>
          <StatBox>
            <StatLabel>Загальний стан</StatLabel>
            <StatNumber style={{ backgroundColor: '#d1fadf', padding: '10px', borderRadius: '5px' }}>Добре</StatNumber>
          </StatBox>
          <StatBox>
            <StatLabel>Кількість робочих місць:</StatLabel>
            <StatNumber>98</StatNumber>
          </StatBox>
        </StatGrid>
      </MainContent>
    </Container>
  );
};

export default Dashboard;
