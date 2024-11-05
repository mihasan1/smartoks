// src/components/Register.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0e7ff;
`;

const RegisterBox = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
`;

const Logo = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: #333;
  font-weight: 400;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #4f46e5;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #4338ca;
  }
`;

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        full_name: fullName,
        login: login,
        email: email,
        password: password,
        role_id: 1,
      });

      if (response.data.message === 'Реєстрація успішна') {
        alert('Реєстрація успішна!');
        navigate('/login'); // Перенаправлення на сторінку авторизації
      } else {
        alert('Помилка: ' + response.data.message);
      }
    } catch (error) {
      alert('Помилка реєстрації: ' + error.message);
    }
  };

  return (
    <RegisterContainer>
      <RegisterBox>
        <Logo>СМАРТОКС</Logo>
        <Title>Реєстрація</Title>
        <Input
          type="text"
          placeholder="Повне ім'я"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Логін"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Зареєструватися</Button>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Register;
