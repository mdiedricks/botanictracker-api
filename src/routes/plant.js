const express = require("express");
const router = express.Router();
const Plant = require("../models/plant.model");
const auth = require("../middleware/auth");
const bindPlant = require("../middleware/bindPlant.js");

router.post("/plants", auth, async (req, res) => {
  console.log("Route:: create new plant");
  const plant = new Plant(req.body);
  plant.owner = req.user._id;

  try {
    await plant.save();
    res.status(201).send(plant);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// GET /plants?owner=:id
router.get("/plants", async (req, res) => {
  if (!req.query.owner) {
    console.log("Route:: get plants ");
  } else {
    console.log(`Route:: get plants ${req.query.owner}`);
  }
  const match = {};
  if (req.query.owner) {
    match.owner = req.query.owner;
  }
  try {
    const plants = await Plant.find(match, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
    }).exec();
    res.send(plants);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

router.get("/plants/:id", async (req, res) => {
  console.log("Route:: get plant by ID");
  const plantId = req.params.id;
  try {
    const plant = await Plant.find({ _id: plantId }, "name _id");
    res.status(200).send(plant);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

router.patch("/plants/:id", auth, bindPlant, async (req, res) => {
  console.log("Route:: update plant by ID");
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "species", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid fields updates!" });
  }

  try {
    updates.forEach((update) => (req.plant[update] = req.body[update]));
    await req.plant.save();
    res.send(req.plant);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

router.delete("/plants/:id", auth, bindPlant, async (req, res) => {
  console.log("Route:: delete plant by ID");
  try {
    await req.plant.delete();
    res.send(req.plant);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = router;
