const { model, Schema } = require("mongoose");

const userMsgSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isSurvey: Boolean,
  text: String,
  surveyAnswers: [String],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("UserMsg", userMsgSchema, "usermsgs");
