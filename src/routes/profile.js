const router = require("express").Router();
const profile = require("../models/profile");
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
    if(!profileData){
      const isProfileAvailable = false;
      return res.json(isProfileAvailable)
    }
    res.status(200).send(profileData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:email?", async (req, res) => {
  try {
    const email = req.params.email;
    if (email) {
      // If an email is provided, search for a profile with that email
      const profileData = await Profiles.findOne({ userEmail: email });

      if (!profileData) {
        return res.status(404).json({ message: "Profile not found" });
       
      }
      return res.status(200).send(profileData);

    }
    else {
      // If no email is provided, return a list of all profiles
      const allProfiles = await Profiles.find();

      if (!allProfiles || allProfiles.length === 0) {
        return res.status(404).json({ message: "No profiles found" });
      }
      return res.status(200).json(allProfiles);
     
    }
    
  }
  catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
