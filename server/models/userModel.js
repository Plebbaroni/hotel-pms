const db = require('../db');

const userModel = {

  getAllUsers: async (req, res) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * from user_account';
      db.query(query, (err, results) => {
        if(err){
          reject(err);
        }else{
          resolve(results);
        }
      })
    })
  },

  // deleteUser: async (id) -> {
  //   return new Promise((resolve, reject) => {
  //     const query = 'UPDATE user_account SET (username, password, first_name, last_name, phone_number, email, role) VALUES ("NULL")'
  //   })
  // },

  checkUsernameExists: async (username) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM User_Account WHERE username = ?', [username], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length > 0);
        }
      });
    });
  },

  registerUser: async (userData) => {
    const { username, hash, firstName, lastName, phoneNumber, email } = userData;
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO User_Account (username, password, first_name, last_name, phone_number, email) VALUES (?, ?, ?, ?, ?, ?)",
        [username, hash, firstName, lastName, phoneNumber, email],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  getUserByUsername: async (username) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM User_Account WHERE username = ?', [username], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = userModel;