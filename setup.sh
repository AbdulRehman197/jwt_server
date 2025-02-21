
#!/bin/bash
echo "Setting up the project..."
npm install express dotenv sqlite3 bcrypt jsonwebtoken
mkdir -p config models routes middleware
node -e "const fs = require('fs'); if (!fs.existsSync('users.db')) fs.writeFileSync('users.db', ''); if (!fs.existsSync('permissions.db')) fs.writeFileSync('permissions.db', '');"
echo "Databases created"
node -e "const { usersDb, permissionsDb } = require('./config/db'); usersDb.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)'); permissionsDb.run('CREATE TABLE IF NOT EXISTS permissions (id INTEGER PRIMARY KEY, user_id INTEGER, file TEXT, permission TEXT)'); console.log('Tables created'); process.exit();"
echo "Setup complete."