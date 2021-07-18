const mongoose = require("mongoose");
const validator = require("validator");

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    species: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age can't be negative");
        }
      },
    },
    actions: [
      {
        action: {
          name: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            required: true,
          },
          temperature: {
            type: Number,
            required: true,
          },
          wind: {
            type: Number,
            required: true,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
