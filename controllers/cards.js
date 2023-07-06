const Card = require('../models/card');
const { httpStatusCode } = require('../errors/httpStatusCode');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
      message: 'Internal Server Error',
    }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
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

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new Error('Not found'))
    .then(() => {
      Card.findByIdAndRemove(cardId)
        .then((deletedCard) => res.status(200).send(deletedCard));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(httpStatusCode.BAD_REQUEST).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.message === 'Not found') {
        res.status(httpStatusCode.NOT_FOUND).send({
          message: 'Передан несуществующий _id карточки',
        });
      } else {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
        });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(httpStatusCode.BAD_REQUEST).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      } else if (err.message === 'Not found') {
        res.status(httpStatusCode.NOT_FOUND).send({
          message: 'Передан несуществующий _id карточки',
        });
      } else {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
        });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(httpStatusCode.BAD_REQUEST).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      } else if (err.message === 'Not found') {
        res.status(httpStatusCode.NOT_FOUND).send({
          message: 'Передан несуществующий _id карточки',
        });
      } else {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
        });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
