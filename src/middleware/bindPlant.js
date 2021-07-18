const Plant = require("../models/plant.model");

/*
/* Assuming the user has already logged in
/* this middleware finds the plant being updated
/* and if it exists, adds it to the request object
*/

const bindPlant = async (req, res, next) => {
  const plantId = req.params.id;
  try {
    const plant = await Plant.findOne({ _id: plantId, owner: req.user._id });
    if (!plant) {
      throw new Error();
    }
    req.plant = plant;
    next();
  } catch (error) {
    res.status(404).send({ error: "Plant not found" });
  }
};

module.exports = bindPlant;
