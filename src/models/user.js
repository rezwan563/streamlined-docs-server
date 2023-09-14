const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  photoURL:{
    type:String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  
},{timestamps:true});

module.exports = mongoose.model("Users", userSchema);
