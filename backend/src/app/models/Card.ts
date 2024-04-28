const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
  word: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  translate: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  sentence: {
    type: String,
    required: true,
    lowercase: true
  },
  repeat: {
    type: Boolean,
    default: false,
  },
  state: {
    type: Number,
    default: 1,
    required: true
  },
  expires: {
    type: Date,
    required: true
  },
  lang: {
    required: true,
    type: String,
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  theme: {
    //    required: true,
    type: Schema.Types.ObjectId,
    ref: "Theme"
  },
}, { timestamps: true });


const Card = mongoose.model('Card', cardSchema);

export default Card;
export const getCards = async () => { return await Card.find() };
export const getCardsByUserId = async (userId: string) => {
  console.log(userId);
  return await Card.find({
   user: userId
  })
};

export const createCard = async (values: Record<string, any>) => {
  const newCard = await Card.create(values);
  return newCard;
};
