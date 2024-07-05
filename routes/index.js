const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');

// Use the API routes
router.use('/api', apiRoutes);

// Fallback for undefined routes
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
