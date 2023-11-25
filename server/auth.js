const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "hoteldb"
});

db.connect(function(err){
  if(err){
      console.log(err)
  }
})

app.use(
  session({
    secret: 'j03m4m4t3mpk3y', 
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false,
      expires: 60000
    }, 
  })
);

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
          console.log(password)
          console.log(result[0].password)
          if (match) {
            req.session.user = {
              id: result[0].id,
              username: result[0].username,
              role: result[0].role,
            };
            res.status(200).send(req.session.user);
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

app.get('/roomdata', (req, res) => {
  const query = 'SELECT * FROM Room_Type';
  db.query(query, (err, results) => {
    if(err){
      console.log(err);
    }else{
      res.json(results);
    }
  })
})

app.get('/getRoomData/:roomType', (req, res) => {
  const roomType = req.params.roomType;
  const query = `SELECT * FROM Room_Type WHERE room_type = ?`;

  db.query(query, [roomType], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      console.log(results);
      res.json(results[0]);
    } else {
      console.log(error);
      res.status(404).json({ error: 'Room not found' });
    }
  });
});

app.get('/indivroomdata', (req, res) => {
  const query = 'SELECT * FROM Room_Type';
  db.query(query, (err, results) => {
    if(err){
      console.log(err);
    }else{
      res.json(results);
    }
  })
})

app.get('/check-auth', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ user: null });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

