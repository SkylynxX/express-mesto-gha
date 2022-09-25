const routerUsers = require('express').Router();
const {
  getUsers,
  getUserByID,
  createUser,
  updateUserInfoByID,
  updateUserAvatarByID,
} = require('../controllers/users');

const {
  validateUser,
  validateUserID,
  validateUserInfo,
  validateAvatar,
} = require('../middlewares/validation');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/:userId', validateUserID, getUserByID);
routerUsers.post('/users', validateUser, createUser);
routerUsers.patch('/users/me', validateUserInfo, updateUserInfoByID);
routerUsers.patch('/users/me/avatar', validateAvatar, updateUserAvatarByID);

module.exports = routerUsers;
