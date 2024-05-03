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

export const getCardById = async (cardId: string) => {
  return await Card.findOne({
    _id: cardId
  }).populate({
    path: 'theme',
    select: '-cards' // kiválasztja a témát, de kihagyja a 'cards' mezőt
  });
};
export const getCardsByUserId = async (userId: string) => {
  return await Card.find({
    user: userId
  })
};


export const getCardsByUserIdWithPaginate = async (userId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit; // Az ugrás értéke az oldalszám és az oldalankénti elemek szorzata
  const cards = await Card.find({ user: userId }).skip(skip).limit(limit); // Az adatbázisból csak az adott oldalhoz tartozó elemek kerülnek lekérdezésre
  return cards;
};
export const getCardsByThemeId = async (themeId: string) => {
  return await Card.find({
    themeId: themeId
  })
};


export const createCard = async (values: Record<string, any>) => {
  const newCard = await Card.create(values);
  return newCard;
};

export const deleteCardById = async (id: string) => { return await Card.findOneAndDelete({ _id: id }) }
export const updateCardById = async (id: string, values: Record<string, any>) => {
  return await Card.findOneAndUpdate({ _id: id }, values, {new: true});
};

