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
  getUserThoughts,
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

// Get a user's thoughts
router.route('/:userId/thoughts').get(getUserThoughts);

module.exports = router;
