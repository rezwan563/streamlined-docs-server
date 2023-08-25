const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./src/models/user')
const dotenv = require("dotenv");
const EditUser = require('./src/models/editprofile')
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json())
app.use(cors())

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

app.get("/", (req, res) =>{
  res.json("Hello from streamlined server")
})

app.post("/users", async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (user) {
    return res.send({ message: "User already exist" });
  }
  const newUser = new User(req.body)
  const result = await newUser.save();
  res.send(result);
});

app.get("/user/:id", async(req, res)=>{
  const email = 'test@gmail.com'
  const user = await User.findOne({email: email })
  res.status(200).json(user)
})

app.put("/users/:email", async(req, res) =>{
  const email = req.params.id;
  const updateUser = await User.findone({email});

})


// app.post("/users", async (req, res) => {
//   const user = req.body;
//   const query = { email: user.email };
//   const existingUser = await userCollection.findOne(query);
//   if (existingUser) {
//     return res.send({ message: "User already exist" });
//   }
//   const result = await userCollection.insertOne(user);
//   res.send(result);
// });


app.listen(port, () => {
    console.log("Streamline server is running");
  });