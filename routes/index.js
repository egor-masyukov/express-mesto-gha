const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { httpStatusCode } = require('../errors/httpStatusCode');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use((req, res) => {
  res.status(httpStatusCode.NOT_FOUND).send({
    message: 'Такая страница не существует',
  });
});

module.exports = router;
