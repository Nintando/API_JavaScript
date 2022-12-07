const User = require("../Models/user");
const UserMsg = require("../Models/userMsg");
const UserAnwser = require("../Models/userAnswers");

const createUser = async (req, res) => {
  try {
    const user = req.body.userName;

    const newUser = new User();
    newUser.userName = user;

    await newUser.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
    console.log(error);
  }
};

const patchUser = async (req, res) => {
  try {
    const username = req.user;
    const data = req.body.userName;

    const newUsername = await User.findOne({ userName: username.userName });

    newUsername.userName = data;
    console.log(newUsername);
    await newUsername.save();
    res.status(200).send("Username updated");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const username = req.user;

    const user = await User.findOne({ userName: username.userName });
    const userTweet = await UserMsg.find({ user: user.id }).select({
      _id: 1,
      user: 1,
    });

    if (user.userName === username.userName) {
      console.log(
        "utilisateur : ",
        user.userName,
        " utilisateur : ",
        username.userName
      );

      if (!userTweet) {
        console.log("user deleted without tweetos and answers");
        await User.deleteOne({ userName: username.userName });
      } else {
        for (i = 0; i < userTweet.length; i++) {
          let tmp = userTweet[i].user;
          const t = tmp.toString();
          console.log(t);
          if (t === user.id) {
            console.log("user deleted with tweetos and answers");

            await User.deleteOne({ userName: username.userName });
            await UserMsg.deleteMany({ user: t });
            await UserAnwser.deleteMany({ user: t });
          }
        }
      }
    }

    res.status(200).send("User deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

module.exports = {
  createUser,
  patchUser,
  deleteUser,
};
