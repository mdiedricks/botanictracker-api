const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/*
/* Assuming the user has already logged in
/* this middleware takes a currently active Auth token
/* and verifies that is is valid
*/

const auth = async (req, res, next) => {
  console.log("::Function:: auth");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: payload._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
