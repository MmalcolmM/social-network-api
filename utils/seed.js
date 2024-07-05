const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUniqueUsername, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users and thoughts
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create an array to hold the users
  const users = [];
  const existingUsernames = [];

  // Add randomly generated users to the users array
  for (let i = 0; i < 10; i++) {
    const username = getUniqueUsername(existingUsernames);
    existingUsernames.push(username);
    const email = `${username}@example.com`;

    users.push({
      username,
      email,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Create thoughts and associate them with random users
  const thoughts = existingUsernames.map((username) => {
    return {
      thoughtText: getRandomThought(1)[0].thoughtText,
      createdAt: new Date(),
      username,
    };
  });

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
