const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  country: { type: String },
  profilePicture: {
    type: String,
    default: "https://freesvg.org/img/1389952697.png",
  },
  bio: { type: String },
  case: { type: String },
});

const Account = mongoose.model("Account", accountSchema, "Account");
module.exports = Account;
