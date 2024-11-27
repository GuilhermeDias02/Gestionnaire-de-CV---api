const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const apiRouter = require('./routes')

dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cors())

app.use(bodyParser.json());
// app.use('/api/user', require('./routes/userRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/recommendation', require('./routes/recommendationRoutes'));
// app.use('/api/cv', require('./routes/cvRoutes'));

app.use('/api', apiRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});