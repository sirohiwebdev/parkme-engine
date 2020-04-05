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
  email: String,
  mobile: String,
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

// const parkingItem = new Parking({
//   name: "Shive Parking",
//   location: {
//     coordinates: [0, 1],
//     address: {
//       street: "123 Street",
//       zipcode: 123456
//     }
//   },
//   hours: {
//     start: Date.now(),
//     end: Date.now()
//   },
//   open: true,
//   fare: {
//     whlr2: 20,
//     whlr4: 40
//   },
//   lots: [
//     {
//       A: [1, 0, 0, 1, 1, 1, 1, 0, 1, 1]
//     }
//   ]
// });

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

const getParking = async parkingID => {
  if (parkingID) {
    return await Parking.findOne({ _id: parkingID });
  }
  return await Parking.find();
};

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = {
  getParking,
  updateParking,
  deleteParking,
  addParking
};
