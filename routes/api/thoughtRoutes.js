const express = require('express');
const router = express.Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtToUser,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// create thought route /api/thoughts/user/<userId>

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Add a thought to a user
router.route('/user/:userId').post(addThoughtToUser);

module.exports = router;


