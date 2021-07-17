const express = require("express");
require("./db/mongoose");
const usersRouter = require("./routes/user");
// const plantsRouter = require("./routes/plant");

const app = express();

app.use(express.json());
app.use(usersRouter);
// app.use(plantsRouter);

module.exports = app;
