const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  getUserFriends,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// Add a friend to a user
router.route('/:userId/friends').post(addFriend);

// Get a user's friends
router.route('/:userId/friends').get(getUserFriends);

module.exports = router;
