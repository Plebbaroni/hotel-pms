const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Joemamadb!", 
  database: "hoteldb"
});

db.connect(function(err){
  if(err){
      console.log(err)
  }
})

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { username, password, firstName, lastName, phoneNumber, email } = req.body;
  
  const usernameExists = await new Promise((resolve, reject) => {
    db.query('SELECT * FROM User_Account WHERE username = ?', [username], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length > 0);
      }
    });
  });
  if(usernameExists){
    res.status(409).send('Username already exists');
  }else{
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.status(500).send('Error hashing password');
      } else {
        db.query(
          "INSERT INTO User_Account (username, password, first_name, last_name, phone_number, email) VALUES (?, ?, ?, ?, ?, ?)",
          [username, hash, firstName, lastName, phoneNumber, email],
          (err, result) => {
            if (err) {
              console.log(err)
              res.status(500).send('Error registering user');
            } else {
              res.status(201).send('User registered successfully');
            }
          }
        );
      }
    });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM User_Account WHERE username = ?',
    [username],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error fetching user');
      } else if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, match) => {
          if (match) {
            res.status(200).send('Login successful');
          } else {
            res.status(401).send('Incorrect password');
          }
        });
      } else {
        res.status(404).send('User not found');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});