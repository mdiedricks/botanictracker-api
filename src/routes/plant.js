let express = require("express");
let router = express.Router();
let Plant = require("../models/plant.model");

// create /plants {}
router.post("/plants", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  let model = new PlantModel(req.body);
  model
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// get /plants
router.get("/plants", (req, res) => {
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
// get /plants/:id

// get /plants/:id?user=uid

// put /plants/:id {}
router.put("/plants", (req, res) => {
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
// delete /plants/:id
router.delete("/plants", (req, res) => {
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
