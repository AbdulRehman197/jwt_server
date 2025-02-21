// routes/fileRoutes.js
const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/files', authenticateToken, (req, res) => {
    res.json({ message: 'Protected file list', permissions: req.user.permissions });
});

module.exports = router;