const mongoose = require("mongoose");
const Users = require("../models/user");

const pendingProfileSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profiles",
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    personal_data: [
      {
        name_bn: String,
        name_en: String,
        gender: String,
        blood_group: String,
        birth_registration: String,
        // TODO: dob should be date type
        dob: String,
        birth_place: String,
        father_name_bn: String,
        mother_name_bn: String,
      },
    ],
    identification_data: [
      {
        education_bn: String,
        occupation: String,
        mobile_number: Number,
        religion: String,
        driving_license_number: Number,
        passport_number: Number,
        tin: Number,
        identification_mark_bn: String,
      },
    ],
    address_data: [
      {
        division: String,
        district: String,
        upozila: String,
        police_station: String,
        post_code: String,
        post_office_bn: String,
        house_holding_bn: String,
        voter_area: String,
        village_road_bn: String,
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
    isPending:{
      type:Boolean,
      default:false
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pendingProfiles", pendingProfileSchema);
