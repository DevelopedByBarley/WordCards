const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true,
  },
  currentCapacity: {
    type: Number,
    default: 0,
  },
  password: String,
  themes: [{
    type: Schema.Types.ObjectId,
    ref: "Theme"
  }],
  cardsForRepeat: [],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export const getUsers = async () => { return await User.find() };
export const getUserById = async (id: string) => { return await User.findById(id) }
export const getUserByEmail = async (email: string) => { return await User.findOne({ email: email }) }
export const createUser = async (values: Record<string, any>) => {
  return await User.create(values);
}
export const deleteUserById = async (id: string) => { return await User.findOneAndDelete({ _id: id }) }


