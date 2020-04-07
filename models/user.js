const mongoose = require("./index");

const userSchema = mongoose.Schema({
  name: String,
  mobile: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
    maxLength: 10
  },
  vehicle_no: String,
  password: { type: String, required: true }
});

const createUser = async user => {
  const newUser = new User(user);
  return await newUser.save();
};

const getUser = async mobile => {
  if (mobile) return await User.findOne({ mobile });

  return await User.find();
};

const updateUser = async (userId, data) => {
  return await User.findByIdAndUpdate({ _id: userId }, data);
};
const deleteUser = async userId => {
  return await User.findByIdAndDelete({ _id: userId });
};

const User = mongoose.model("User", userSchema);

module.exports = {
  updateUser,
  getUser,
  createUser,
  deleteUser
};
