const mongoose = require("./index");
const Schema = mongoose.Schema;

//Define parking schema
const parkingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number, Number]
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipcode: {
      type: mongoose.SchemaTypes.Number,
      required: true,
      minLength: 6,
      maxLength: 6
    }
  },
  hours: {
    start: mongoose.SchemaTypes.Date,
    end: mongoose.SchemaTypes.Date
  },
  open: mongoose.SchemaTypes.Boolean,
  fare: {
    whlr2: Number,
    whlr4: Number
  },
  lots: [{}]
});

parkingSchema.index({ location: "2dsphere" });
//Create parking Model
const Parking = mongoose.model("Parking", parkingSchema);
// Add Parking to DB
const addParking = async parkingData => {
  const newParking = new Parking(parkingData);
  return await newParking.save();
};
// Read Parking Data from DB
const getParking = async (parkingID, mobile) => {
  if (parkingID) {
    return await Parking.findOne({ _id: parkingID }).lean();
  }
  if (mobile) {
    return await Parking.findOne({ mobile: mobile }).lean();
  }
  return await Parking.find().lean();
};
// Update Parking Data
const updateParking = async (parkingID, data) => {
  return await Parking.findByIdAndUpdate({ _id: parkingID }, data);
};
// Delete Parking from DB
const deleteParking = async parkingID => {
  return await Parking.findByIdAndDelete(parkingID);
};
//Get Nearby parking
const getParkingByLocation = async (location, radius = 5000) => {
  console.log("Reached");
  const query = {
    ["location"]: {
      $near: {
        $maxDistance: radius,
        $geometry: {
          type: "Point",
          coordinates: location
        }
      }
    }
  };
  return await Parking.find(query).lean();
};

module.exports = {
  getParking,
  updateParking,
  deleteParking,
  addParking,
  getParkingByLocation
};
