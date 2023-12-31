const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./src/routes/user")
const profileRoute = require("./src/routes/profile")
const pendingApplication = require("./src/routes/pendingApplication")
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");

dotenv.config();
app.use(express.json());
app.use(cors());

MONGO_URI = "mongodb+srv://streamlined_admin:dH6sGxCCEVp1WOh8@cluster0.awmzrvc.mongodb.net/streamlinedDB?retryWrites=true&w=majority"
const uri = process.env.MONGO_URI;
mongoose.connect(uri).then(() => console.log("connected to mongodb"));


app.use("/api/users", userRoute)
app.use("/api/profiles", profileRoute)
app.use("/api/pending_profiles", pendingApplication)

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});


app.get("/", (req, res) => {
  res.json("Hello from streamlined server");
});


app.listen(port, () => {
  console.log("Streamline server is running on port: " +port);
});
