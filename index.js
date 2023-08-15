const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json())
app.use(cors())

const uri = process.env.MONGO_URI;

mongoose.connect(uri).then(() => console.log("connected to mongodb"));



app.listen(port, () => {
    console.log("Streamline server is running");
  });