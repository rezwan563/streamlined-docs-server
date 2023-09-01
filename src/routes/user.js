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
  const user = await Users.findById(req.params.email);
  res.send(user);
});

// update user
router.put("/:email", async (req, res) => {
  try{
    const updatedDoc = req.body;
    const updatedUser = await Users.findByIdAndUpdate(req.params.email, updatedDoc)
    res.send(updatedUser)
  }catch(err){
    res.status(500).json(err)
  }
});
// delete user
router.delete("/:email", async(req,res)=>{
  try{
    await Users.findByIdAndDelete(req.params.email)
    res.status(200).json("Successfully deleted the user")
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router;
