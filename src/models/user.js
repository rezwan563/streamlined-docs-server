const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // fullName: {
  //   type: String,
  //   max: 50,
  //   // required:true,
  //   default: "",
  // },
  // nid: {
  //   type: Number,
  // },
  // dob: {
  //   type: String,
  //   // required:true,
  //   default: "",
  // },
  // gender: {
  //   type: String,
  //   // required:true,
  //   default: "",
  // },
  // address: {
  //   type: String,
  //   // required:true,
  //   default: "",
  // },
  // issueDate: {
  //   type: String,
  // },
  // expiryDate: {
  //   type: String,
  // },
  // auth: {
  //   type: String,
  //   // default: "streamlined-docs",
  // },
  // citizenship: {
  //   type: String,
  // },
  // height: {
  //   type: Number,
  // },
  // eye: {
  //   type: String,
  // },
  // blood_grp: {
  //   type: String,
  // },
});

module.exports = mongoose.model("Users", userSchema);
