const mongoose = require("mongoose");

const inValidDataSchma = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    maritalStatus: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    mobileNumber: {
      type: Number,
      required: false,
    },
    jobTitle: {
      type: String,
      required: false,
    },
    errorMessages : {
      type:String,
      required:false
    },
    fileBelong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "files",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const invalidData = mongoose.model("invalidData", inValidDataSchma);

module.exports = invalidData;
