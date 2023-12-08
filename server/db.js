const mysql = require('mysql2');

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
  });

  db.connect(function (err) {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });
  
  module.exports = db;