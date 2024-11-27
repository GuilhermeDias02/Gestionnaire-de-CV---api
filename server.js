const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const apiRouter = require('./routes')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

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

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Book API',
            version: '1.0.0'
        },
        servers: [
            {
                url: process.env.SERVER_URL || 'http://localhost:5000/'
            }
        ],
        components: {
            // securitySchemes: {
            //     BearerAuth: {
            //         type: 'http',
            //         scheme: 'bearer',
            //         bearerFormat: 'JWT'
            //     }
            // }
        },
        security: [
            {
                // BearerAuth: []
            }
        ]
    },

    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/api', apiRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});