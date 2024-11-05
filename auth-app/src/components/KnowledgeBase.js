// src/components/KnowledgeBase.js
import React, { useState } from 'react';
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

const Section = styled.div`
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Subsection = styled.div`
  margin-left: 20px;
  padding: 5px;
`;

const KnowledgeBase = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const knowledgeData = [
    {
      name: 'Головний корпус',
      subsections: [],
    },
    {
      name: 'Корпус авіаторів',
      subsections: [
        {
          name: 'Навчальна частина',
          rooms: ['Аудиторія №301', 'Аудиторія №302', 'Аудиторія №303', 'Аудиторія №305', 'Аудиторія №306'],
        },
      ],
    },
  ];

  return (
    <Container>
      <Sidebar>
        <h3>НАВІГАЦІЯ</h3>
        <SidebarItem onClick={() => navigate('/dashboard')}>Інформаційна панель</SidebarItem>
        <SidebarItem onClick={() => navigate('/tickets')}>Заявки</SidebarItem>
        <SidebarItem active>База знань</SidebarItem>
      </Sidebar>
      <MainContent>
        <Header>БАЗА ЗНАНЬ</Header>
        {knowledgeData.map((section, index) => (
          <div key={index}>
            <Section onClick={() => toggleSection(section.name)}>
              <span>{section.name}</span>
              <span>{expandedSections[section.name] ? '▼' : '▶'}</span>
            </Section>
            {expandedSections[section.name] && (
              <div>
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex}>
                    <Subsection onClick={() => toggleSection(subsection.name)}>
                      <span>{subsection.name}</span>
                      <span>{expandedSections[subsection.name] ? '▼' : '▶'}</span>
                    </Subsection>
                    {expandedSections[subsection.name] && (
                      <div>
                        {subsection.rooms.map((room, roomIndex) => (
                          <Subsection key={roomIndex}>{room}</Subsection>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </MainContent>
    </Container>
  );
};

export default KnowledgeBase;
