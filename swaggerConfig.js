const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gestionnaire de CV API",
      version: "1.0.0",
      description: "API pour gérer les CV et recommandations",
      contact: {
        name: "RayaneSsj",
        email: "rayane.rostane@hotmail.com",
      },
    },
    servers: [
      {
        url: "https://gestionnaire-de-cv-api.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
