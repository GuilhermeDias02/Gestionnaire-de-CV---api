const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const apiRouter = require('./routes')

dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/api/', apiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
