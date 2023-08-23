const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Edit = require("./src/models/edit");
const User = require("./src/models/user");
const Details = require("./src/models/details");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");

dotenv.config();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;

mongoose.connect(uri).then(() => console.log("connected to mongodb"));

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

app.post("/users", async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = await User.findOne({ email: user.email });
  if (newUser) {
    return res.send({ message: "User already exists" });
  }
  const loggedUser = new User(user);
  console.log(loggedUser);
  const result = await loggedUser.save();
  res.send(result);
});

app.get("/", (req, res) => {
  res.json("Hello from streamlined server");
});

app.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  res.status(200).json(user);
});
app.get("/details/:email", async (req, res) => {
  const email = req.params.email;
  const details = await Details.findOne({ email: email });
  res.status(200).json(details);
});
app.get("/edits/:email", async (req, res) => {
  const email = req.params.email;
  const edit = await Edit.findOne({ email: email });
  res.status(200).json(edit);
});

app.post("/edits", async (req, res) => {
  try {
    const { email } = req.body;
    let edit = await Edit.findOne({ email });

    if (edit) {
      edit.set(req.body);
    } else {
      edit = new Edit(req.body);
    }

    const savedEdit = await edit.save();

    res.status(200).json(savedEdit);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/edits/:email", async (req, res) => {
  const { email } = req.params;
  const updatedProfileData = req.body;

  try {
    const updatedProfile = await EditModel.findOneAndUpdate(
      { email },
      updatedProfileData,
      { new: true }
    );

    if (updatedProfile) {
      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

app.listen(port, () => {
  console.log("Streamline server is running");
});
