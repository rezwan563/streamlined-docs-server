const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  nationalIdNumber: String,
  dob: String,
  gender: String,
  address: String,
  issueDate: String,
  expiryDate: String,
  auth: String,
  citizenship: String,
  height: String,
  eyeColor: String,
  bloodType: String,
  photoUrl: String,
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
