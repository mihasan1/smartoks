// app.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Додано для дозволу CORS-запитів

// Налаштування з'єднання з базою даних MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'smartoks'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Маршрут для авторизації
app.post('/api/login', (req, res) => {
  const { login, password } = req.body;

  const query = 'SELECT * FROM users WHERE login = ?';
  db.query(query, [login], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(401).json({ message: 'Неправильний логін або пароль' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch) {
        return res.status(401).json({ message: 'Неправильний логін або пароль' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role_id },
        'your_secret_key',
        { expiresIn: '1h' }
      );

      res.json({ message: 'Авторизація успішна', token });
    });
  });
});

// Маршрут для реєстрації
app.post('/api/register', (req, res) => {
    const { full_name, login, password, email, role_id = 1 } = req.body; // 1 - роль "Користувач" за замовчуванням
  
    const checkQuery = 'SELECT * FROM users WHERE login = ? OR email = ?';
    db.query(checkQuery, [login, email], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'Користувач з таким логіном або email вже існує' });
      }
  
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;
  
        const insertQuery = `
          INSERT INTO users (full_name, login, password, email, role_id) 
          VALUES (?, ?, ?, ?, ?)
        `;
        db.query(insertQuery, [full_name, login, hashedPassword, email, role_id], (err, result) => {
          if (err) throw err;
  
          res.json({ message: 'Реєстрація успішна' });
        });
      });
    });
  });
  

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
