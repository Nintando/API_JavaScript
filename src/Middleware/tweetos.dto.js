const UserMsg = require("../Models/userMsg");
const User = require("../Models/user");
const UserAnwser = require("../Models/userAnswers");

const dtoPatchTweetosUser = async (req, res, next) => {
  try {
    const username = req.headers.username;

    const tweet = await UserMsg.find({ userName: username }).select({
      _id: 0,
      text: 1,
    });

    if (!tweet?.length) {
      res.status(404).send("User doesn't have post");
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const dtoPostAnswer = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const i = req.params.id;
    const user = await User.findOne({ userName: username });
    const userAnswer = await UserMsg.findOne({ _id: i });

    if (!user) {
      res.status(401).send("not connected");
      return;
    }
    console.log(userAnswer.surveyAnswers);

    if (userAnswer.surveyAnswers.length === 0) {
      res.status(401).send("Action impossible");
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

const dtoDeleteTweetosUser = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const id = req.params.id;
    const tweet = await UserMsg.find({ userName: username }).select({
      _id: 0,
      text: 1,
    });

    if (!tweet?.length) {
      res.status(404).send("User doesn't have a post");
      return;
    }
    if (!id || id <= -1) {
      res.status(400).send("Id must be higher than or equal to 0");
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

module.exports = {
  dtoDeleteTweetosUser,
  dtoPostAnswer,
  dtoPatchTweetosUser,
};
