const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json()); //подключение готового парсера для обработки запросов

app.use((req, res, next) => {
  req.user = {
    _id: "6328f71ef8f61e5a37c61bf9", //  _id пользователя - заглушка
  };
  next();
});

app.use(routerUsers);
app.use(routerCards);

app.listen(PORT, () => {
  console.log(`Сервер запущен. доступен по адрессу http://localhost:${PORT}`);
});
