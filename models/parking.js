const mongoose = require("./index");
// interface IParking {
//   name: {
//     type: String;
//     required: true;
//   };
//   location: {
//     coordinates: [Number, Number];
//     address: {
//       street: String;
//       zipcode: {
//         type: Number;
//         required: true;
//         minLength: 6;
//         maxLength: 6;
//       };
//     };
//   };
//   hours: {
//     start: Date;
//     end: Date;
//   };
//   open: Boolean;
//   fare: {
//     whlr2: Number;
//     whlr4: Number;
//   };
//   lots: [
//     {
//       ":id": [[Number]];
//     }
//   ];
// }

const parkingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: String,
  location: {
    coordinates: [Number, Number],
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

const addParking = async parkingData => {
  const newParking = new Parking(parkingData);
  return await newParking.save();
};

const deleteParking = async parkingID => {
  return await Parking.findByIdAndDelete(parkingID);
};

const updateParking = async (parkingID, data) => {
  return await Parking.findByIdAndUpdate({ _id: parkingID }, data);
};

const getParking = async (parkingID, mobile) => {
  if (parkingID) {
    return await Parking.findOne({ _id: parkingID }).lean();
  }
  if (mobile) {
    return await Parking.findOne({ mobile: mobile }).lean();
  }

  return await Parking.find().lean();
};

const getParkingByLocation = async location => {
  return await Parking.find({
    $or: [
      { "location.address.city": location.address.city },
      { "location.address.zipcode": location.address.zipcode }
    ]
  }).lean();
};

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = {
  getParking,
  updateParking,
  deleteParking,
  addParking,
  getParkingByLocation
};
