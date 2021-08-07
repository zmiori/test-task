const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  name: {
    type: String,
    default: "Anonymous",
  },

  accessToken: {
    type: String,
    default: null,
  },

  refreshToken: {
    type: String,
    default: null,
  },

  avatarURL: {
    type: String,
    default: "./tmp/default-avatar.png",
  },

  feed: {
    type: Array,
    default: [],
  },
});

const User = model("user", userSchema);

module.exports = User;
