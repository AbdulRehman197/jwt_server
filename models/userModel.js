// models/userModel.js
const bcrypt = require('bcrypt');
const { usersDb } = require('../config/db');

exports.createUser = async (username, password) => {
    const hash = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
        usersDb.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
};

exports.findUser = (username) => {
    return new Promise((resolve, reject) => {
        usersDb.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};