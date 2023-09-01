const router = require("express").Router()
const Users = require("../models/user");

// create user
router.post("/", async (req, res) => {
    const user = req.body;
    console.log(user);
    const newUser = await Users.findOne({ email: user.email });
    if (newUser) {
      return res.send({ message: "User already exists" });
    }
    const loggedUser = new Users(user);
    console.log(loggedUser);
    const result = await loggedUser.save();
    res.send(result)
})
// get user
// update user
// delete user

module.exports = router