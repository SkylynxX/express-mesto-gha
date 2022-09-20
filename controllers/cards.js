const Card = require('../models/card');

const STATUS_OK = 200;
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

module.exports.getCards = (req, res) => Card.find({})
  .then((cardList) => res.status(STATUS_OK).send(cardList))
  .catch(() => res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' }));

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cardID) => res.status(STATUS_OK).send({ 'cardId' : cardID }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ 'message' : 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.deleteCardByID = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ 'message' : 'Карточка с указанным _id не найдена.' });
    } else {
      res.status(STATUS_OK).send({ 'cardId' : card._id });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные при удалении карточки.' });
    } else {
      res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' })
    }
  });

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      return res.status(ERROR_NOT_FOUND).send({ 'message' : 'Передан несуществующий _id карточки.' });
    } else {
      return res.status(STATUS_OK).send({ 'card' : card });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(ERROR_BAD_REQUEST).send({ 'message' : 'Переданы некорректные данные для постановки/снятии лайка.' });
    } else {
      res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' });
    }
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      return res.status(ERROR_NOT_FOUND).send({ 'message' : 'Передан несуществующий _id карточки.' });
    } else {
      return res.status(STATUS_OK).send({ 'card' : card });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(ERROR_BAD_REQUEST).send({ 'message' : 'Переданы некорректные данные для постановки/снятии лайка.' });
    } else {
      res.status(ERROR_DEFAULT).send({ 'message' : 'Ошибка по умолчанию.' });
    }
  });