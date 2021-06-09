const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// allow all
app.use(cors());

//Connect Database
connectDB(); //Init

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World"));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/file", require("./routes/file"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
