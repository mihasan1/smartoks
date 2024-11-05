// src/components/Tickets.js
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
  overflow-y: auto;
`;

const Header = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #f0f4ff;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  color: #4f46e5;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  color: #333;
`;

const StatusIndicator = styled.span`
  display: inline-flex;
  align-items: center;
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.status) {
      case 'Новий': return 'yellow';
      case 'Виконано': return 'green';
      case 'У роботі': return 'orange';
      case 'Закрито': return 'red';
      default: return 'gray';
    }
  }};
  margin-right: 5px;
`;

const Tickets = () => {
  const navigate = useNavigate();

  // Приклад даних для заявок
  const tickets = [
    { id: '007', description: 'Не вмикається ПК', date: '28.09.2024', status: 'Новий' },
    { id: '006', description: 'Не працює миша', date: '28.09.2024', status: 'Новий' },
    { id: '005', description: 'Поломка клавіатури', date: '27.09.2024', status: 'Виконано' },
    { id: '004', description: 'Перегрівається ПК', date: '27.09.2024', status: 'Виконано' },
    { id: '003', description: 'Принтер не друкує', date: '27.09.2024', status: 'У роботі' },
    { id: '002', description: 'Не працює монітор', date: '25.09.2024', status: 'Закрито' },
    { id: '001', description: 'Не вмикається ПК', date: '23.09.2024', status: 'Виконано' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleRowClick = (id) => {
    // Перехід до детальної інформації про заявку
    // navigate(`/tickets/${id}`);
    alert(`Деталі заявки №${id}`);
  };

  return (
    <Container>
      <Sidebar>
        <h3>НАВІГАЦІЯ</h3>
        <SidebarItem onClick={() => navigate('/dashboard')}>Інформаційна панель</SidebarItem>
        <SidebarItem active>Заявки</SidebarItem>
        <SidebarItem onClick={() => navigate('/knowledge')}>База знань</SidebarItem>
        <SidebarItem style={{ marginTop: 'auto' }} onClick={handleLogout}>Вийти</SidebarItem>
      </Sidebar>
      <MainContent>
        <Header>ЗАЯВКИ</Header>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>№</TableHeader>
                <TableHeader>Опис заявки</TableHeader>
                <TableHeader>Дата створення</TableHeader>
                <TableHeader>Статус</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {tickets.map(ticket => (
                <TableRow key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.description}</TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>
                    <StatusIndicator>
                      <StatusDot status={ticket.status} />
                      {ticket.status}
                    </StatusIndicator>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </MainContent>
    </Container>
  );
};

export default Tickets;
