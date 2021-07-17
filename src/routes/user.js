const express = require("express");
const User = require("../models/user.model");
const auth = require("../middleware/auth");
const router = express.Router();

// * ======================================
//TODO modify to only show public info
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
});

//TODO modify to only show public info
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.find({ _id: userId });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

// * ======================================

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//user login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});
//user logout
//user logout all
//user get "me"

//TODO user update "me"
//TODO update patch with property validation
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) => {
    allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.send(400).send({ error: "Invalid fields updates!" });
  }

  try {
    const user = await User.findOne(req.params.id);
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//TODO user delete "me"
router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(204).send(deletedUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
