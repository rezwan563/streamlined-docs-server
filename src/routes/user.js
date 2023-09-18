const router = require("express").Router();
const Users = require("../models/user");

// create user
router.post("/", async (req, res) => {
  const user = req.body;
  try {
    const newUser = await Users.findOne({ email: user.email });
    if (newUser) {
      return res.status(409).json("User already exists");
    }
    const loggedUser = new Users(user);
    const result = await loggedUser.save();
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user
router.get("/:email", async (req, res) => {
  const user = await Users.findOne({ email: req.params.email });
  res.send(user);
});

// update user
router.put("/:email", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.params.email });
    const id = user._id;
    const updatedDoc = req.body;
    const updatedUser = await Users.findByIdAndUpdate(id, updatedDoc, {
      new: true,
    });
    res.send(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// delete user
router.delete("/:email", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.params.email });
    const id = user._id;
    await Users.findByIdAndDelete(id);
    res.status(200).json("Successfully deleted the user");
  } catch (err) {
    res.status(500).json(err);
  }
});

// check if user is admin
router.get("/check_admin/:email", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.params.email });
    const id = user._id;
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    const isAdmin = user.isAdmin;
    console.log("isAdmin: ", isAdmin);
    res.status(200).json({ isAdmin });
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
