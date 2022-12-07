const express = require("express");
const dto = require("./Middleware/user.dto");
const dtoTweet = require("./Middleware/tweetos.dto");
const Tweetcontrol = require("./Controller/tweet.controller");
const Usercontrol = require("./Controller/user.controller");
const app = express();
require("./mongooseConnect");

app.use(express.json());

// Create User
app.post("/users/create", dto.dtoPostUser, Usercontrol.createUser);

// Update User
app.patch("/users/:user", dto.dtoGetUser, Usercontrol.patchUser);

// Delete User
app.delete("/:user/delete/user", dto.dtoDeleteUser, Usercontrol.deleteUser);

// Create Tweetos
app.post("/posts/:user", dto.dtoGetUser, Tweetcontrol.createUserTweet);

// Get Tweetos
app.get("/:user", dto.dtoGetUser, Tweetcontrol.getterUserTweet);

// Post Answer
app.post(
  "/:user/answer/:id",
  dtoTweet.dtoPostAnswer,
  Tweetcontrol.answerSurveyTweet
);

// Get All Answers
app.get("/:user/answers/:id", dto.dtoGetUser, Tweetcontrol.getterAnswers);

// Update Tweetos
app.patch(
  "/:user/update/tweetos/:id",
  dtoTweet.dtoPatchTweetosUser,
  Tweetcontrol.patchUserTweet
);

// Delete Tweetos
app.delete(
  "/:user/delete/tweetos/:id",
  dtoTweet.dtoDeleteTweetosUser,
  Tweetcontrol.deleteUserTweet
);

app.listen(3000, () => {
  console.log("Server running");
});
