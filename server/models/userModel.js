const db = require('../db');

const userModel = {

  getAllUsers: async (req, res) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * from user_account WHERE is_deleted = 0';
      db.query(query, (err, results) => {
        if(err){
          reject(err);
        }else{
          resolve(results);
        }
      })
    })
  },

  updateUser: async (id, updatedUserData) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE user_account SET ? WHERE id = ?';
      db.query(query, [updatedUserData, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteUser: async (id) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE user_account SET is_deleted = 1 WHERE id = ?'
      db.query(query, id, (err, result) =>{
        if(err){
          reject(err)
        }else{
          resolve(result)
        }
      })
    })
  },

  confirmEmp: async (id) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE user_account SET role = "Employee" WHERE id = ?';
      db.query(query, id, (err, result) =>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      })
    })
  },

  checkUsernameExists: async (username) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM User_Account WHERE username = ? AND is_deleted = 0', [username], (err, result) => {
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