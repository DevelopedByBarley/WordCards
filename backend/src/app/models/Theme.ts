const mongoose = require('mongoose');
const { Schema } = mongoose;

const themeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  color: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    required: true
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: "Card"
  }]
});


const Theme = mongoose.model('Theme', themeSchema);

export default Theme;

export const getThemesByUserId = async (userId: string) => {
  return await Theme.find({
    user: userId
  })
};

export const createOtherThemeByUser = async (userId: string) => {
  return await Theme.create({
    lang: 'En',
    name: 'Egyéb',
    description: 'Egyéb téma bármely kártyának',
    color: 'bg-gray-900',
    user: userId
  })

}

export const getThemesByUserIdWithPaginate = async (userId: string, page: number | null, limit: number) => {
  if (page) {
    const skip = (page - 1) * limit; // Az ugrás értéke az oldalszám és az oldalankénti elemek szorzata
    const themes = await Theme.find({ user: userId }).skip(skip).limit(limit); // Az adatbázisból csak az adott oldalhoz tartozó elemek kerülnek lekérdezésre
    return themes;
  }
};
export const createTheme = async (values: Record<string, any>) => {
  return await Theme.create(values);
}

