const routerCards = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardByID,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routerCards.get('/cards', getCards);
routerCards.post('/cards', createCard);
routerCards.delete('/cards/:cardId', deleteCardByID);
routerCards.put('/cards/:cardId/likes', likeCard);
routerCards.delete('/cards/:cardId/likes', dislikeCard);

module.exports = routerCards;