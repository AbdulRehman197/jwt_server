// server.js
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const cors = require('cors')
const { initializeDatabases } = require('./config/db');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
// Initialize databases and tables
initializeDatabases();

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

app.get('/', (req, res) => {
    res.send('server is starting at port 5000!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));