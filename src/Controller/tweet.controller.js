const UserMsg = require("../Models/userMsg");
const UserAnwser = require("../Models/userAnswers");

const createUserTweet = async (req, res) => {
  try {
    const user = req.user;
    const txt = req.body.text;
    const survey = req.body.isSurvey;
    const answer = req.body.survey;
    const newUserMsg = new UserMsg();

    newUserMsg.isSurvey = survey;
    if (newUserMsg.isSurvey === true) {
      newUserMsg.user = user._id;
      newUserMsg.text = txt;
      newUserMsg.surveyAnswers = answer;
      await newUserMsg.save();
    } else {
      newUserMsg.user = user;
      newUserMsg.text = txt;
      await newUserMsg.save();
    }

    res.status(200).send("Vous avez créer un tweetos");
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

const answerSurveyTweet = async (req, res) => {
  try {
    const username = req.user;
    const i = req.params.id;
    const data = req.body.answer;
    const userAnswer = await UserMsg.findOne({ _id: i });

    const newAnwser = new UserAnwser();

    let temp = userAnswer.surveyAnswers;

    console.log(temp);

    if (temp.length !== 0) {
      newAnwser.user = username;
      newAnwser.idSurvey = i;
      newAnwser.answer = data.toLowerCase();
      let tmp = temp.includes(newAnwser.answer);
      if (tmp !== true) {
        res.status(400).send("la réponse n'est pas valide");
        return;
      }
      await newAnwser.save();
    }
    res.status(200).send("vous avez répondu au sondage");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const getterUserTweet = async (req, res) => {
  try {
    const userPost = await UserMsg.find().select({
      _id: 1,
      user: 1,
      text: 1,
      surveyAnswers: 1,
    });

    res.status(200).send({
      Tweetos: userPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const getterAnswers = async (req, res) => {
  try {
    const userAnswers = await UserAnwser.find().select({
      _id: 0,
      user: 1,
      answer: 1,
    });

    const tab = [];
    for (i = 0; i < userAnswers.length; i++) {
      tab.push(userAnswers[i].answer);
    }
    const counts = {};
    tab.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    console.log(counts);

    let new_tab = Object.values(counts);
    console.log(new_tab);
    const max = new_tab.reduce((a, b) => a + b, 0);
    let answers_p = 0;
    let tab_p = [];

    for (i = 0; i < new_tab.length; i++) {
      answers_p = (100 * new_tab[i]) / max + "%";
      console.log("pourcenatge ", answers_p);
      tab_p.push(answers_p);
    }

    res.status(200).send({
      answer: userAnswers,
      tableau_p: tab_p,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const patchUserTweet = async (req, res) => {
  try {
    const data = req.body.post;
    const i = req.params.id;

    const userPost = await UserMsg.find({ _id: i });

    userPost.text = data;
    await userPost.save();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const deleteUserTweet = async (req, res) => {
  try {
    const i = req.params.id;

    const userPost = await UserMsg.findOne({ _id: i });

    await userPost.deleteOne();
    res.status(200).send("Tweetos deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

module.exports = {
  createUserTweet,
  getterUserTweet,
  getterAnswers,
  answerSurveyTweet,
  patchUserTweet,
  deleteUserTweet,
};
