const db = require('../db');

const userModel = {
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