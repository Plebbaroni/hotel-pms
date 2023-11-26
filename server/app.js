const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes')
const db = require('./db');
const app = express();
const port = 3001;


app.use(
  session({
    secret: 'j03m4m4t3mpk3y',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      expires: 60000,
    },
  })
);

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true,
}));

app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/inventory',inventoryRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});