// config/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const usersDb = new sqlite3.Database(path.join(__dirname, '../users.db'));
const permissionsDb = new sqlite3.Database(path.join(__dirname, '../permissions.db'));

function initializeDatabases() {
    usersDb.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    permissionsDb.run(`
        CREATE TABLE IF NOT EXISTS permissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            permission_for TEXT,
            permission TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);
    console.log('Databases and tables initialized');
}

module.exports = { usersDb, permissionsDb, initializeDatabases };