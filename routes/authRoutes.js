// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { createUser, findUser } = require('../models/userModel');
const { getUserPermissions } = require('../models/permissionModel');
const bcrypt = require('bcrypt');

dotenv.config();
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        await createUser(username, password);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await findUser(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const permissions = await getUserPermissions(user.id);
        console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
        const token = jwt.sign({ id: user.id, permissions }, process.env.JWT_SECRET, {algorithm: "ES384",expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error("err",err)
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;