const bcrypt = require("bcrypt");
const { usersDb, permissionsDb } = require("./config/db");

async function seedDatabase() {
  for (let i = 1; i <= 50; i++) {
    const username = `user${i}`;
    const password = `password${i}`;
    const hash = await bcrypt.hash(password, 10);

    usersDb.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash],
      function (err) {
        if (err) return console.error(err.message);
        const userId = this.lastID;
        if (i % 2 == 0) {
          permissionsDb.run(
            "INSERT INTO permissions (user_id, file, permission) VALUES (?, ?, ?)",
            [userId, `images`, "read"]
          );
        } else {
          permissionsDb.run('INSERT INTO permissions (user_id, file, permission) VALUES (?, ?, ?)', [userId, `images`, 'read/write'])
        }
      }
    );
  }
  console.log("50 demo users and permissions added");
}
seedDatabase();
