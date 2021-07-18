const express = require("express");
const User = require("../models/user.model");
const auth = require("../middleware/auth");
const router = express.Router();

//User creation
router.post("/users", async (req, res) => {
  console.log("Route:: create user");
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// User Login/Logout
router.post("/users/login", async (req, res) => {
  console.log("Route:: login user");
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

router.post("/users/logout", auth, async (req, res) => {
  console.log("Route:: logout user");

  try {
    req.user.tokens = req.user.tokens.filter((tokenObject) => {
      return tokenObject.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  console.log("Route:: logout all");
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// User Management
router.get("/users/me", auth, async (req, res) => {
  console.log("Route:: get own user");
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  console.log("Route:: update own user");
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  console.log(isValidOperation);

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid fields updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  console.log("Route:: delete own user");
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Explore users
router.get("/users", async (req, res) => {
  console.log("Route:: get all users");
  try {
    const users = await User.find({}, "name _id", {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
    }).exec();

    res.send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  console.log("Route:: get user by ID");
  const userId = req.params.id;
  try {
    const user = await User.find({ _id: userId }, "name _id");
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
