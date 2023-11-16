const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// IMPORT MODELES

// IMPORT ROUTES
const comicsRoute = require("./routes/comics");
const charactersRoute = require("./routes/characters");
app.use(comicsRoute);
app.use(charactersRoute);

app.get("/", (req, res) => {
  console.log("ma route marvel/");
  res.json("Mon site Marvel");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
