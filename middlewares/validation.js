const { celebrate, Joi } = require('celebrate');

const regular = /^(http|https):\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/;

const validateUserRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regular),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regular),
  }),
});

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(regular)
      .required(),
  }),
});

module.exports = {
  validateUserRegister,
  validateAvatarUpdate,
  validateCardCreation,
};
