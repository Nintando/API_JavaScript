const User = require("../Models/user");

const dtoPostUser = async (req, res, next) => {
  try {
    const user = req.body.userName;
    if (!user) {
      res.status(400).send("Username missing");
      return;
    }
    const userExist = await User.exists({ userName: user });
    if (userExist) {
      res.status(400).send("UserName exist already");
      return;
    }
    next();
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }
};

const isAuthen = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const user = await User.findOne({ userName: username });

    if (!username) {
      res.status(401).send("Vérifie l'orthographe");
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

const dtoGetUser = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const user = await User.findOne({ userName: username });

    if (!user) {
      res.status(401).send("not connected");
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

const dtoDeleteUser = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const user = await User.findOne({ userName: username });

    if (!user) {
      res.status(404).send("User doesn't exist");
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

module.exports = {
  dtoPostUser,
  isAuthen,
  dtoGetUser,
  dtoDeleteUser,
};
