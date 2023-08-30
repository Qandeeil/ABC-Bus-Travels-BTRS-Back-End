const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema({
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
  flightSupervisor: {type: String},
  numberOfSeats: {type: Number, default: 24},
  description: {type: String},
  status: {type: Boolean, default: true}
});

const Trips = mongoose.model("Trips", tripsSchema, "Trips");
module.exports = Trips;
