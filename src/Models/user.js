const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  userName: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema, "user");
