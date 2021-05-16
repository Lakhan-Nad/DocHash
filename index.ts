import express from "express";
import path from "path";

const app = express();

const host = "localhost";
const port = 3000;

const buildPath = path.join(__dirname, "build/contracts");

app.get("/upload", (req, res) => {
    
});

app.listen(port, host, () => {
  console.log(`server started at port${port}`);
});
