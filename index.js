require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

const host = "localhost";
const port = 5000;

const buildPath = path.join(__dirname, "build/contracts");

app.get("/upload", (req, res) => {});

app.listen(port, host, () => {
  console.log(`server started at port${port}`);
});

module.exports = app;