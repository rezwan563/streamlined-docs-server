const mongoose = require("mongoose");
// const User = require("./user");

const DetailsSchema = new mongoose.Schema({
  // userRef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

const Details = mongoose.model("Details", DetailsSchema);

module.exports = Details;
