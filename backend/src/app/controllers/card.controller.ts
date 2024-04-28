import { Request, Response } from "express";
import { createCard, getCardsByUserId } from "../models/Card";



const index = async (req: Request, res: Response) => {
  const { user }: Record<string, any> = req;
  
  

  try {
    const cards = await getCardsByUserId(user._id);

    console.log(cards);
    

    return res.status(200).json({
      status: true,
      message: "Get cards successfully!",
      cards: cards
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: true,
      message: "Cards get fail!",
    });
  }
}

const store = async (req: Request, res: Response) => {
  const { user }: Record<string, any> = req;
  const lang = 'En';

  const parsedData = JSON.parse(req.body.data);
  const { word, translate, sentence } = parsedData;

  try {
    const savedCard = await createCard({
      word: word.toLowerCase(),
      translate: translate.toLowerCase(),
      sentence: replaceWordInSentence(translate.toLowerCase(), sentence.toLowerCase()),
      expires: Date.now() + (24 * 60 * 60 * 1000), // Az aktuális időpont + 1 nap
      user: user._id,
      //theme: theme,
      lang: lang,
    });
    /* await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { cards: savedCard._id } }
    );
  
    await Theme.findOneAndUpdate(
      { _id: theme }, // needs card id!
      { $push: { cards: savedCard._id } }
    );
  */
    return res.status(200).json({
      status: true,
      message: "Card created successfully!",
      card: savedCard
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong when the card is stored",
    });
  }

}



function replaceWordInSentence(translate: string, sentence: string) {
  var replacement = "_".repeat(translate.length);


  return sentence.replace(translate, replacement);
}

export { store, index }