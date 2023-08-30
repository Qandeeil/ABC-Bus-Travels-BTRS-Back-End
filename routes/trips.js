var express = require("express");
var router = express.Router();
var Trips = require("../Schemas/Trips.Schema");
const multer = require("multer");

router.get("/", async function (req, res, next) {
  const getTrips = await Trips.find();
  res.send(getTrips);
});

router.get("/resetTripFlags", async (req, res, send) => {
  res.send(false);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./LogoTrips");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getSeconds() + file.originalname);
  },
});

const uploads = multer({
  storage,
}).single("LogoTrips");

router.post("/newTrip", uploads, async (req, res, send) => {
  const url = req.protocol + "://" + req.get("host");
  if (req.file) {
    const filename = req.file.filename;
    const logoTrips = url + "/LogoTrips/" + filename;
    const {
      name,
      tripDestination,
      startDate,
      endDate,
      price,
      busNumber,
      flightSupervisor,
      description,
      status
    } = req.body;
    try {
      const newTrip = await Trips.create({
        name,
        tripDestination,
        startDate,
        endDate,
        price,
        busNumber,
        flightSupervisor,
        logoTrips,
        description,
        status
      });
      res.send({ result: true });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    const {
      tripDestination,
      startDate,
      endDate,
      price,
      busNumber,
      flightSupervisor,
      description,
      status
    } = req.body;
    try {
      const newTrip = await Trips.create({
        tripDestination,
        startDate,
        endDate,
        price,
        busNumber,
        flightSupervisor,
        description,
        status
      });
      res.send({ result: true });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.delete("/deleteTrip", async (req, res, next) => {
  const { _id } = req.body;
  console.log(_id);
  const deleteTrip = await Trips.findByIdAndRemove(_id);
  res.send({ result: true });
});

router.put("/updateTrip", uploads, async (req, res, send) => {
  const url = req.protocol + "://" + req.get("host");
  if (req.file) {
    const filename = req.file.filename;
    const logoTrips = url + "/LogoTrips/" + filename;
    const {
      _id,
      tripDestination,
      startDate,
      endDate,
      price,
      busNumber,
      flightSupervisor,
      description,
      status
    } = req.body;
    try {
      const updateTrip = await Trips.findByIdAndUpdate(_id, {
        tripDestination,
        startDate,
        endDate,
        price,
        busNumber,
        flightSupervisor,
        logoTrips,
        description,
        status
      });
      res.send({ result: true });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    const {
      _id,
      tripDestination,
      startDate,
      endDate,
      price,
      busNumber,
      flightSupervisor,
      description,
      status
    } = req.body;
    try {
      const updateTrip = await Trips.findByIdAndUpdate(_id, {
        tripDestination,
        startDate,
        endDate,
        price,
        busNumber,
        flightSupervisor,
        description,
        status
      });
      res.send({ result: true });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.put("/addUserFromTrip", async (req, res, send) => {
  const { _id, user } = req.body;
  console.log(req.body);
  const AddUser = await Trips.findByIdAndUpdate(_id, {
    $push: {
      passengers: user._id,
    },
  });
  res.send({ result: true });
});

router.put("/removeUserFromTrip", async (req, res) => {
  const { _id, user } = req.body;
  const updatedTrip = await Trips.findByIdAndUpdate(_id, {
    $pull: {
      passengers: user._id,
    },
  });
  res.send({ result: true });
});

module.exports = router;
