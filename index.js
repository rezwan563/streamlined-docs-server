const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./src/models/user");
const Profile = require("./src/models/profile");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

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

// app.post("/jwt", (req, res) => {
//   const user = req.body;
//   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "1h",
//   });
//   res.send({ token });
// });

app.get("/", (req, res) => {
  res.json("Hello from streamlined server");
});

app.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  res.status(200).json(user);
});

app.post("/userprofiles", async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: "Error creating profile", error });
  }
});

app.put("/userprofiles/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const profileData = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      profileData,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: "Error updating profile", error });
  }
});

app.listen(port, () => {
  console.log("Streamline server is running");
});
