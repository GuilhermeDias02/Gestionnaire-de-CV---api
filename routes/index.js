const express = require("express");
const userRouter = require("./userRoutes");
const authRouter = require("./authRoutes");
const cvRouter = require("./cvRoutes");
const recommRouter = require("./recommendationRoutes");

const app = express();

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/cv", cvRouter);
app.use("/recommendation", recommRouter);

module.exports = app;
