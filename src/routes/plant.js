let express = require("express");
let router = express.Router();
let Plant = require("../models/plant.model");

// get /plants
// get /plants/:id
// get /plants/:id?user=uid

// post /plants {}
// put /plants/:id {}
// delete /plants/:id

router.post("/plant", (req, res) => {
  //req.body is made available by bodyParser in app.js
  if (!req.body) {
    //if there is no body in response
    return res.status(400).send("Request body is missing");
  }

  //pass body to a new model
  let model = new PlantModel(req.body);
  //tell mongoose to validate this and save it to the database
  model
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch((err) => {
      //instead of send, we reply with err object as json
      res.status(500).json(err);
    });
});

router.get("/plant", (req, res) => {
  if (!req.query.name) {
    return res.status(400).send(`Missing url parameter: name`);
  }

  PlantModel.findOne({
    name: req.query.name,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/plant", (req, res) => {
  // ? check if req exists
  if (!req.query.name) {
    return res.status(400).send(`Missing url parameter: name`);
  }
  // * mongoose method to update
  PlantModel.findOneAndUpdate(
    {
      name: req.query.name,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      res.text(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/plant", (req, res) => {
  // ? check on the req
  if (!req.query.name) {
    return res.status(400).send(`Missing url parameter: name`);
  }
  // * mongoose method for removing
  PlantModel.findOneAndRemove({
    name: req.query.name,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
