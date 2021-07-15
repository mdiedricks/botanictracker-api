const express = require("express");
//import mongoose set up file here
const userRouter = require("./routes/user");
const plantRouter = require("./routes/plant");

const app = express();

app.use(express.json());
app.use(plantRouter);
app.use(userRouter);

module.exports = app;
