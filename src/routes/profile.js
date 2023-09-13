const router = require("express").Router();
const Profiles = require("../models/profile");

// create profile info
router.post("/", async (req, res) => {
  const profileData = req.body;
  try {
    const newProfileData = new Profiles(profileData);
    const saveProfileData = await newProfileData.save();
    res.status(201).json(saveProfileData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// get profile info
router.get("/:email", async (req, res) => {
  try {
    const profileData = await Profiles.findOne({ userEmail: req.params.email });
    res.status(200).send(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
