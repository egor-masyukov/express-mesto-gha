const router = require('express').Router();
const {
  getUsers, getUserById, getUserInfo, updateUser, updateAvatar,
} = require('../controllers/users');
const { validateAvatarUpdate } = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:id', getUserById);

router.patch('/me', updateUser);

router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = router;
