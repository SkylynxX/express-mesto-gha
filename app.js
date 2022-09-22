const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const ERROR_NOT_FOUND = 404;
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json()); // подключение готового парсера для обработки запросов

app.use((req, res, next) => {
  req.user = {
    _id: '6328c77cf7975bab7dce8ef8', //  _id пользователя - заглушка
  };
  next();
});

app.use(routerUsers);
app.use(routerCards);

app.use('*', (req, res) => res.status(ERROR_NOT_FOUND).send({ message: 'Был запрошен несуществующий роут.' }));

app.listen(PORT, () => {
  console.log(`Сервер запущен. доступен по адрессу http://localhost:${PORT}`);
});
