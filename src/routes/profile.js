const router = require("express").Router()
const Profiles = require("../models/profile");

// create profile info
router.post("/", async(req,res)=>{
    const profileData = req.body;
    try{
        const newProfileData = new Profiles(profileData);
        const saveProfileData = await newProfileData.save()
        res.status(201).json("Profile data saved successfully")
    }catch(err){
        res.status(500).json(err)
    }
})
// get profile info
router.get("/:userEmail", async(req,res)=>{
    try{
        const profileData = await Profiles.findOne({userEmail: req.body.email})
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router