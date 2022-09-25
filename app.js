const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { validateUser, validateLogin } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const ErrorNotFound = require('./errors/error-not-found');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(bodyParser.json()); // подключение готового парсера для обработки запросов
app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.use(routerUsers);
app.use(routerCards);

app.use('*', (req, res, next) => next(new ErrorNotFound()));
app.use(errors());

app.listen(PORT, () => {
  console.log(`Сервер запущен. доступен по адрессу http://localhost:${PORT}`);
});
