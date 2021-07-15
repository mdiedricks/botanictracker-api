var express = require("express");
var router = express.Router();

// get /users
// get /users/:id

// post /users {}
// put /users/:id {}
// delete /users/:id

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
