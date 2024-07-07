const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.status(200).json(thoughts);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Get a single thought by ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      return res.status(200).json(thought);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      return res.status(201).json(thought);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Update a thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      return res.status(200).json(thought);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Delete a thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      return res.status(200).json({ message: 'Thought deleted' });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // Add a thought to a user
  async addThoughtToUser(req, res) {
    try {
      const { userId } = req.params;
      const { thoughtText, username } = req.body;

      // Create a new thought
      const newThought = await Thought.create({
        thoughtText,
        username,
      });

      // Update the user's thoughts array
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      return res.status(200).json(newThought);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  
    async addReactionToThought(req, res) {
      try {
        const { thoughtId } = req.params
        const { reactionId } = req.body;
        
        if(!thoughtId || !reactionId) {
          return res.status(404).json({ message: 'No thought with that ID'})
  
        }

        const thought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $addToSet: { thoughts: thoughtId } },
          { new: true }
        );

        if (!thought){
          return res.status(404).json({ message: 'No thought with that Id'})
        }

        return res.status(200).json(thought)
      } catch (error) {
        console.log(error);
      return res.status(500).json(error);
      }
    }
};
