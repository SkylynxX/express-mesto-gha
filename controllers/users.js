const User = require('../models/user');

const STATUS_OK = 200;
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

module.exports.getUsers = (req, res) => User.find({})
  .then((users) => res.status(STATUS_OK).send({ 'users' : users }))
  .catch(() => res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' }));

module.exports.getUserByID = (req, res) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      return res.status(ERROR_NOT_FOUND).send({ 'message' : 'Пользователь по указанному _id не найден.' });
    } else {
      return res.status(STATUS_OK).send({ 'user' : user });
    }
  })
  .catch(() => res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' }));

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_OK).send({ 'user' : user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ 'message' : 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.updateUserInfoByID = (req, res) => User.findByIdAndUpdate(
    req.user._id,
    {
      'name': req.body.name,
      'about': req.body.about
    }
  )
  .then((user) => {
    if (!user) {
      return res.status(ERROR_NOT_FOUND).send({ 'message': 'Пользователь с указанным _id не найден.' });
    } else {
      return res.send({ 'user' : user });
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_BAD_REQUEST).send({ 'message' : 'Переданы некорректные данные при обновлении профиля.' });
    } else {
      res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' });
    }
  });

module.exports.updateUserAvatarByID = (req, res) => User.findByIdAndUpdate(
    req.user._id,
    { 'avatar' : req.body.avatar }
  )
  .then((user) => {
    if (!user) {
      return res.status(ERROR_NOT_FOUND).send({ 'message' : 'Пользователь с указанным _id не найден.' });
    }
    return res.send({ 'user' : user });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_BAD_REQUEST).send({ 'message' : 'Переданы некорректные данные при обновлении аватара.' });
    } else {
      res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' });
    }
  });