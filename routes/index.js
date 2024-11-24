const express = require('express');
const userRouter = require('./userRoutes')

const app = express();

app.use('./auth', authRouter);
app.use('./user', userRouter);

module.exports = app;