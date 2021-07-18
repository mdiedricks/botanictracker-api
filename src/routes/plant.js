const express = require("express");
const router = express.Router();
const Plant = require("../models/plant.model");
const auth = require("../middleware/auth");

router.post("/plants", auth, async (req, res) => {
  console.log("Route:: create new plant");
  const plant = new Plant(req.body);
  plant.owner = req.user._id;

  try {
    await plant.save();
    res.status(201).send(plant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET /plants?owner=:id
router.get("/plants", async (req, res) => {
  console.log("Route:: get plants [,by owner]");
  const match = {};
  if (req.query.user) {
    match.owner = req.query.owner;
  }

  try {
    const plants = await Plant.find(match, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
    }).exec();
    res.send(plants);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/plants/:id", async (req, res) => {
  console.log("Route:: get plant by ID");
  const plantId = req.params.id;
  try {
    const plant = await Plant.find({ _id: plantId }, "name _id");
    res.status(200).send(plant);
  } catch (error) {
    res.status(404).send(error);
  }
});

//* patch /plants/:id {}
router.patch("/plants", (req, res) => {
  console.log("Route:: update plant by ID");

  try {
  } catch (error) {
    res.status(404).send(error);
  }
});

//* delete /plants/:id
router.delete("/plants", (req, res) => {
  // ? check on the req
  if (!req.query.name) {
    return res.status(400).send(`Missing url parameter: name`);
  }
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
