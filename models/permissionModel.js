// models/permissionModel.js
const { permissionsDb } = require('../config/db');

exports.getUserPermissions = (userId) => {
    return new Promise((resolve, reject) => {
        permissionsDb.all('SELECT permission FROM permissions WHERE user_id = ?', [userId], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};