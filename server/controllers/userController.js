const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const userController = {

  getAllUsers: async (req, res) => {
    try{
      const users = await userModel.getAllUsers();
      res.status(200).json(users);
    }catch(error){
      console.error('Error: ', error);
      res.status(500).json({error: 'Internal server error'});
    }
  },

  registerUser: async (req, res) => {
    const { username, password, firstName, lastName, phoneNumber, email } = req.body;

    try {
      const usernameExists = await userModel.checkUsernameExists(username);

      if (usernameExists) {
        res.status(409).send('Username already exists');
      } else {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            res.status(500).send('Error hashing password');
          } else {
            await userModel.registerUser({
              username,
              hash,
              firstName,
              lastName,
              phoneNumber,
              email,
            });

            res.status(201).send('User registered successfully');
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id; 
    const updatedUserData = req.body;

    try {
      const result = await userModel.updateUser(userId, updatedUserData);

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id; 

    try {
      const result = await userModel.deleteUser(userId);

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  loginUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await userModel.getUserByUsername(username);

      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, match) => {
          if (match) {
            req.session.user = {
              id: user[0].id,
              username: user[0].username,
              role: user[0].role,
            };
            res.status(200).send(req.session.user);
          } else {
            res.status(401).send('Incorrect password');
          }
        });
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  logoutUser: (req, res) => {
    try {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.status(200).send('Logout successful');
          }
        });
      } else {
        res.status(200).send('User not logged in');
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  checkAuth: (req, res) => {
    if (req.session && req.session.user) {
      res.status(200).json({ user: req.session.user });
    } else {
      res.status(401).json({ user: null });
    }
  },
};

module.exports = userController;