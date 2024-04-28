import mongoose, { Error } from "mongoose";

export const connect = () => {
  mongoose.connect(`mongodb+srv://Barley:${process.env.MONGO_PW}@cluster0.qtfsg.mongodb.net/`)
    .then(() => console.log('Database is connected successfully!')
    )
    .catch((err: Error) => console.error(err))
}