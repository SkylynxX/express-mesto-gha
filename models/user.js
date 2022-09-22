const mongoose = require('mongoose');
// Поля схемы пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});
// Создание модели-таблицы users в базе данных mestodb
module.exports = mongoose.model('user', userSchema);
