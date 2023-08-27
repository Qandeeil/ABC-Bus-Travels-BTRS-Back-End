const mongoose = require("mongoose");
// const deepPopulate = requrie('mongoose-deep-populate')(mongoose)

const tripsSchema = new mongoose.Schema({
  name: { type: String },
  tripDestination: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  logoTrips: { type: String, default: 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg' },
  price: { type: Number },
  passengers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },
  ],
  busNumber: { type: Number },
  flightSupervisor: {type: String}
});

const Trips = mongoose.model("Trips", tripsSchema, "Trips");
module.exports = Trips;
