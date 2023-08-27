var express = require("express");
var router = express.Router();
var Trips = require("../Schemas/Trips.Schema");
const multer = require("multer");

router.get("/", async function (req, res, next) {
  const getTrips = await Trips.find();
  res.send(getTrips);
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
      });
      res.send({ result: true });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" }); // الرد في حالة حدوث خطأ
    }
  } else {
    const {
      name,
      tripDestination,
      startDate,
      endDate,
      price,
      busNumber,
      flightSupervisor,
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
      });
      res.send({ result: true });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" }); // الرد في حالة حدوث خطأ
    }
  }
});

module.exports = router;
