const { model, Schema } = require("mongoose");

const userAnswerSchema = new Schema({
  answer: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  idSurvey: {
    type: Schema.Types.ObjectId,
    ref: "UserMsg",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("UserAnwser", userAnswerSchema, "useranwsers");
