const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnimalSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: "User"},
    name: {
      type: String,
      required: [true, "Please enter an animal name..."],
    },
    type: {
      type: String,
      required: [true, "Please enter an animal type..."],
    },
    breed: {
      type: String,
      default: "Unspecified",
    },
    gender: {
      type: String,
      required: [true, "Please enter the animal's gender"]
    },
    colors: {
      type: String,
    },
    needs: [String], //! idk if theres a way to make arrays required or give them defaults but if someone does know pls update these
    details: [String],
    desc: {
      type: String,
    },
    vaccs: [String],
    neutered: { //! spade is only for female animals. i think neutered is more gender neutral
      type: Boolean,
      require: [true, "Must answer if the animal is neutered"],
    },
    picURLs: [String],
    vidURLs: [String],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: String,
			enum: ['northeast', 'northwest', 'southwest'],
			required: [true, "Must provide a location"]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Animal || mongoose.model("Animal", AnimalSchema);
