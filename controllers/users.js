const User = require('../models/user');
const { httpStatusCode } = require('../errors/httpStatusCode');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
    }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(httpStatusCode.BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'Not found') {
        res.status(httpStatusCode.NOT_FOUND).send({
          message: 'Пользователь по указанному id не найден',
        });
      } else {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
        });
      }
    });
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(httpStatusCode.BAD_REQUEST).send({
          message: 'Вы ввели некоректные данные',
        });
      } else {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
        });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        res.status(httpStatusCode.BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      } else if (err.name === 'CastError') {
        res.status(httpStatusCode.BAD_REQUEST).send({
          message: 'Некорректный id пользователя',
        });
      } else if (err.message === 'Not found') {
        res.status(httpStatusCode.NOT_FOUND).send({
          message: 'Пользователь по указанному id не найден',
        });
      } else {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
        });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        res.status(httpStatusCode.BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      } else if (err.name === 'CastError') {
        res.status(httpStatusCode.BAD_REQUEST).send({
          message: 'Некорректный id пользователя',
        });
      } else if (err.message === 'Not found') {
        res.status(httpStatusCode.NOT_FOUND).send({
          message: 'Пользователь по указанному id не найден',
        });
      } else {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
