const mongoose = require("./index");

const slotSchema = mongoose.Schema({
  timing: {
    start: mongoose.SchemaTypes.Date,
    end: mongoose.SchemaTypes.Date
  },
  lot: { type: String, required: true },
  car: { type: String, required: true },
  parking_id: mongoose.SchemaTypes.ObjectId,
  user_id: mongoose.SchemaTypes.ObjectId,
  status: String
});

const Slot = mongoose.model("Slot", slotSchema);

const createSlot = async slotData => {
  const newSlot = new Slot(slotData);
  return await newSlot.save();
};

const getSlot = async slotId => {
  if (slotId) return await Slot.findOne({ _id: id });
  return await Slot.find();
};

const updateSlot = async (slotId, data) => {
  return await Slot.findByIdAndUpdate({ _id: slotId }, data);
};

const deleteSlot = async (slotId, data) => {
  return await Slot.findByIdAndDelete({ _id: slotId });
};

module.exports = Slot;
