const mongoose = require("./index");

const slotSchema = mongoose.Schema({
  timing: {
    from: mongoose.SchemaTypes.Date,
    to: mongoose.SchemaTypes.Date
  },
  lot: { type: String, required: true },
  car: { type: String, required: true },
  parking_id: mongoose.SchemaTypes.ObjectId,
  user_id: mongoose.SchemaTypes.ObjectId,
  status: { type: String, default: "Booked" }
});

const Slot = mongoose.model("Slot", slotSchema);

const createSlot = async slotData => {
  const newSlot = new Slot(slotData);
  return await newSlot.save();
};

const getSlot = async slotId => {
  if (slotId) return await Slot.findOne({ _id: slotId }).lean();
  return await Slot.find().lean();
};

const updateSlot = async (slotId, data) => {
  return await Slot.findByIdAndUpdate({ _id: slotId }, data).lean();
};

const deleteSlot = async (slotId, data) => {
  return await Slot.findByIdAndDelete({ _id: slotId }).lean();
};

module.exports = {
  createSlot,
  getSlot,
  updateSlot,
  deleteSlot
};
