var express = require("express");
var router = express.Router();

router.get("/users", (req, res) => {
  res.send(`You've received all users`);
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`You've received user ${userId}`);
});

router.post("/users", (req, res) => {
  const newUser = req.body;
  // try add new user to database
  res.send(`New user created: ${newUser.name}`);
});

router.put("/users/:id", (req, res) => {
  const updatedUser = req.body;
  // try update to database
  res.send(`User updated: ${updatedUser.name}`);
});

router.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  //try delete user with id
  res.send(`User ${userId} has been deleted`);
});

module.exports = router;
