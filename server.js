const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/user', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
