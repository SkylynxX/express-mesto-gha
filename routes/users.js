const routerUsers = require('express').Router();
const {
  getUsers,
  getUserByID,
  createUser,
  updateUserInfoByID,
  updateUserAvatarByID
} = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/:userId', getUserByID);
routerUsers.post('/users', createUser);
routerUsers.patch('/users/me', updateUserInfoByID);
routerUsers.patch('/users/me/avatar', updateUserAvatarByID);

module.exports = routerUsers;
