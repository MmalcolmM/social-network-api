const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const userId = req.params.userId;

      // Validate ObjectId
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const user = await User.findOne({ _id: userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const userId = req.params.userId;

      // Validate ObjectId
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Delete a user by ID and remove associated thoughts
  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;

      // Validate ObjectId
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const user = await User.findOneAndDelete({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Remove associated thoughts
      await Thought.deleteMany({ username: user.username });

      return res.status(200).json({ message: 'User and their thoughts deleted' });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const { userId } = req.params;
      const { friendId } = req.body;

      // Validate ObjectIds
      if (!ObjectId.isValid(userId) || !ObjectId.isValid(friendId)) {
        return res.status(400).json({ message: 'Invalid user or friend ID' });
      }

      // Update the user's friends array
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } }, // Use $addToSet to avoid duplicates
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Get a user's friends
  async getUserFriends(req, res) {
    try {
      const userId = req.params.userId;

      // Validate ObjectId
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const user = await User.findOne({ _id: userId }).populate('friends').select('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      return res.status(200).json(user.friends);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
